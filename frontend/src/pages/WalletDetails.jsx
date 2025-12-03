import Sidebar from "../components/utils/sideBar";
import NavBar from "../components/utils/navBar";
import Footer from "../components/utils/footer";
import { useLocation } from "react-router-dom";
import ContentWalletDetails from "../components/wallet/contentWalletDetails";

export default function QuotationDetails() {
  const location = useLocation();
  const carteira = location.state.wallet;

  return (
    <>
      <div className="flex bg-bg min-h-screen text-text">
        <div className="border-r border-white/10">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 pl-18">
          <NavBar />
          <ContentWalletDetails wallet={carteira} />
          <Footer />
        </div>
      </div>
    </>
  );
}
