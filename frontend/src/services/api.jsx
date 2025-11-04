import axios from "axios";

function getCookie(name) 
{
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const api = axios.create(
  {
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }
);
api.interceptors.request.use((config) => {
  const csrfToken = getCookie("XSRF-TOKEN");
  if (csrfToken) {
    config.headers["X-XSRF-TOKEN"] = csrfToken;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) { throw error; }

    if (originalRequest.url && originalRequest.url.includes("/auth/refresh")) { throw error; }
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try 
      {

        console.log(getCookie("XSRF-TOKEN"));
        delete originalRequest.headers["X-XSRF-TOKEN"];

        const res = await api.post("/auth/refresh");
        console.log(res.data.message)

        await api.get("/auth/csrf");
        // força Axios a ler o novo XSRF token atualizado

        const newCsrfToken = getCookie("XSRF-TOKEN");
        if (newCsrfToken) { originalRequest.headers["X-XSRF-TOKEN"] = newCsrfToken;}
        console.log(newCsrfToken)


        return api(originalRequest);
      }
      catch (error) 
      {
        console.log(error)
        throw error;
      }
    }
    throw error;
  }
);



async function  getCSRF() 
{
   try
  {
    const res = await api.get("/auth/csrf")
    console.log(res)
  }
  catch(error)
  {
    console.log("Erro",error.response.status,":", error);
  } 
}


getCSRF()
export default api;

