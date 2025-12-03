import NavBar from "../components/utils/navBar";
import Footer from "../components/utils/footer";
import Sidebar from "../components/utils/sideBar";
import ContentUpdateWallet from "../components/wallet/contentUpdateWallet";
import { useLocation } from "react-router-dom";

export default function UpdateWallet() {
  const location = useLocation();

  return (
    <>
      <div className="flex bg-bg min-h-screen text-text">
        <div className="border-r border-white/10">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 pl-18">
          <NavBar />
          <ContentUpdateWallet carteira={location.state.wallet} />
          <Footer />
        </div>
      </div>
    </>
  );
}
