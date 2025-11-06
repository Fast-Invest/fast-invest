import "../App.css";
import NavBar from "../components/home/navBar.jsx";
import Sidebar from "../components/home/sideBar.jsx";
import ContentHome from "../components/home/contentHome.jsx";
import Footer from "../components/utils/footer.jsx";
import { useState, useEffect } from "react";
import authService from "../services/authService.jsx";
import walletService from "../services/walletService.jsx";

function Home() {
  const [nome, setNome] = useState("Usuário!");
  const [email, setEmail] = useState("Usuário!");
  const [numCarteiras,setNumCarteiras ] = useState(0);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await authService.buscarUsuarioPorEmail();
        if (resp.status !== 200) {
          console.log("erro");
          setIsLogged(false);
          throw new Error();
        }

        setEmail(resp.usuarios.email);
        setNome(resp.usuarios.nome);
        
        const res = await walletService.buscarCarteiras(resp.usuarios.id)
        const numCarteiras = res?.carteiras?.length || 0

        setNumCarteiras(numCarteiras || 0)

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
          numCarteiras={numCarteiras}
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
