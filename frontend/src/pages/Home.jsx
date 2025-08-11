import "../App.css";
import NavBar from "../components/home/navBar.jsx";
import Sidebar from "../components/home/sideBar.jsx";
import ContentHome from "../components/home/contentHome.jsx";
import { useState, useEffect } from "react";
import { buscarUsuarioPorEmail } from "../services/api.jsx";

function Home() {
  const [nome, setNome] = useState("Usuário!");
  const [email, setEmail] = useState("Usuário!");

  useEffect(() => {
    (async () => {
      try {
        const resp = await buscarUsuarioPorEmail();
        if (resp.status !== 200) {
          console.log("erro");
          throw new Error();
        }

        setEmail(resp.usuarios.email);
        setNome(resp.usuarios.nome);
      } catch (error) {
        console.log("hyyyy", error);
      }
    })();
  }, []);

  return (
    <div className="flex bg-bg min-h-screen text-text">
      <div className="border-r border-white/10">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        <NavBar nome={nome} email={email} />
        <ContentHome />
      </div>
    </div>
  );
}

export default Home;
