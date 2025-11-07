import "../App.css";
import NavBar from "../components/home/navBar.jsx";
import Sidebar from "../components/home/sideBar.jsx";
import ContentQuotation from "../components/quotation/contentQuotation.jsx";
import Footer from "../components/utils/footer.jsx";

export default function Quotation() 
{


  return (
    <>
      <div className="flex bg-bg min-h-screen text-text">
        <div className="border-r border-white/10">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1">
          <NavBar/>
          <ContentQuotation />
          <Footer />
        </div>
      </div>
    </>
  );
}
