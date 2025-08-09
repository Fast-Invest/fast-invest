import "../App.css";
import NavBar from "../components/navBar.jsx";
import Sidebar from "../components/sideBar.jsx";
import ContentHome from "../components/contentHome.jsx";

function Home() {
  return (
    <div className="flex bg-bg min-h-screen text-text">
      <div className="border-r border-white/10">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <NavBar />
        <ContentHome />
      </div>
    </div>
  );
}

export default Home;
