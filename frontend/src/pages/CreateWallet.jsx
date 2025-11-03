import { useEffect, useState } from "react";
import NavBar from "../components/home/navBar";
import Footer from "../components/utils/footer";
import Sidebar from "../components/home/sideBar";
import ContentCreateWallet from "../components/wallet/contentCreateWallet";

import authService from "../services/authService";
export default function CreateWallet() {
  const [nome, setNome] = useState("Usuário!");
  const [email, setEmail] = useState("Usuário!");
  const [id, setId] = useState(null);

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await authService.buscarUsuarioPorEmail();
        if (resp.status !== 200) 
        {
          setIsLogged(false);
          throw new Error(
            `Status:${resp.status}=>Usuário não logado. Informações não carregadas`
          );
        }
        setId(resp.usuarios.id)
        setEmail(resp.usuarios.email);
        setNome(resp.usuarios.nome);
        setIsLogged(true);
      } 
      catch (error) 
      {
        setIsLogged(false);
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
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
          <ContentCreateWallet idUser={id}/>
          <Footer />
        </div>
      </div>
    </>
  );
}
