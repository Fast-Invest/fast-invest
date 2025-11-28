import ContentGraph from "../components/graph/contentGraph";
import Sidebar from "../components/utils/sideBar";
import NavBar from "../components/utils/navBar";
import Footer from "../components/utils/footer";

export default function Graph() {
  
  
  return(
      <div className="flex bg-bg min-h-screen text-text">
        <div className="border-r border-white/10">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1">
          <NavBar />
          <ContentGraph/>
          <Footer />
        </div>
      </div>


  );
}
