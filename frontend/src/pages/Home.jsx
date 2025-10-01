import "../App.css";
import NavBar from "../components/home/navBar.jsx";
import Sidebar from "../components/home/sideBar.jsx";
import ContentHome from "../components/home/contentHome.jsx";
import Footer from "../components/home/footer.jsx";
import { useState, useEffect } from "react";
import { buscarUsuarioPorEmail } from "../services/api.jsx";

function Home() {
  const [nome, setNome] = useState("Usuário!");
  const [email, setEmail] = useState("Usuário!");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await buscarUsuarioPorEmail();
        if (resp.status !== 200) {
          console.log("erro");
          setIsLogged(false);
          throw new Error();
        }

        setEmail(resp.usuarios.email);
        setNome(resp.usuarios.nome);
        setIsLogged(true);
      } catch (error) {
        setIsLogged(false);
        console.log("erro:", error);
      }
    })();
  }, []);

  return (
    <div className="flex bg-bg min-h-screen text-text">
      <div className="border-r border-white/10">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        <NavBar
          nome={nome}
          email={email}
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          setNome={setNome}
        />
        <ContentHome />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
