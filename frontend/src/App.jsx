import "./App.css";
import NavBar from "./components/navBar.jsx";
import Sidebar from "./components/sideBar.jsx";
import Home from "./components/home.jsx";

function App() {
  return (
    <div className="flex bg-primary min-h-screen">
      <div className="border-r border-white/10">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <NavBar />
        <Home />
      </div>
    </div>
  );
}

export default App;
