import { useState, useEffect } from "react";
import { useUser } from "../contexts/userContext";
import NavBar from "../components/utils/navBar";
import Footer from "../components/utils/footer";
import Sidebar from "../components/utils/sideBar";
import ContentWallet from "../components/wallet/contentWallet";

export default function Wallet() {
  const { wallet, user, setWallet } = useUser();
  const [carteiras, setCarteiras] = useState([
    { id: 0, nome: "Carteira Tutorial", data: "12/05/2024", filtros: [] },
  ]);

  useEffect(() => {
    if (wallet) setCarteiras(wallet);
  }, [wallet]);

  return (
    <>
      <div className="flex bg-bg min-h-screen text-text">
        <div className="border-r border-white/10">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 pl-18">
          <NavBar setCarteiras={setCarteiras} />
          <ContentWallet
            carteiras={carteiras}
            setCarteiras={setWallet}
            userId={user?.id}
          />
          <Footer />
        </div>
      </div>
    </>
  );
}
