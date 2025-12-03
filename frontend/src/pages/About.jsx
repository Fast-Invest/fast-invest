import NavBar from "../components/utils/navBar";
import Footer from "../components/utils/footer";
import Sidebar from "../components/utils/sideBar";

import ContentAbout from "../components/about/contentAbout";

export default function About() {
  return (
    <>
      <div className="flex bg-bg min-h-screen text-text">
        <div className="border-r border-white/10">
          <Sidebar />
        </div>

        <div className="flex flex-col flex-1 pl-18">
          <NavBar />
          <ContentAbout />
          <Footer />
        </div>
      </div>
    </>
  );
}
