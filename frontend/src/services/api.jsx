import axios from "axios";

export function getCookie(name) 
{
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

// ✅ Deixa o Axios cuidar do XSRF sozinho
api.defaults.xsrfCookieName = "XSRF-TOKEN";
api.defaults.xsrfHeaderName = "X-XSRF-TOKEN";




// ✅ Logs úteis
api.interceptors.request.use((config) => {
  const token = getCookie("XSRF-TOKEN");
  if (token && !config.headers["X-XSRF-TOKEN"]) 
  {
    config.headers["X-XSRF-TOKEN"] = token;
  }
  console.log("token and Header being sent:", token, "----",config.headers["X-XSRF-TOKEN"]);

  return config;
});



// ✅ Refresh automático com novo CSRF
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const req = err.config;

    if (!req) throw err;
    if (req._retry) throw err;
    if (req.url.includes("/auth/refresh")) throw err;

    if ([401, 403].includes(err.response?.status)) {
      req._retry = true;
      
      console.log("🔄 Refreshing token...");
      await api.post("/auth/refresh");

      console.log("🔑 Getting new CSRF token...");
      await api.get("/auth/csrf");

      return api(req);
    }

    throw err;
  }
);

// ✅ Force fetch CSRF at startup
api.get("/auth/csrf").catch(() => {});

export default api;











