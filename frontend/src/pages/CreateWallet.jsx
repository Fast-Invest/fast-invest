import NavBar from "../components/utils/navBar";
import Footer from "../components/utils/footer";
import Sidebar from "../components/utils/sideBar";
import ContentCreateWallet from "../components/wallet/contentCreateWallet";

export default function CreateWallet() {
  return (
    <>
      <div className="flex bg-bg min-h-screen text-text">
        <div className="border-r border-white/10">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1">
          <NavBar />
          <ContentCreateWallet />
          <Footer />
        </div>
      </div>
    </>
  );
}
