import "./App.css";
import NavBar from "./components/navBar.jsx";
import Sidebar from "./components/sideBar.jsx";

function App() {
  return (
    <>
      <div className="flex bg-primary min-h-screen">
        <Sidebar />
        <NavBar />
      </div>
    </>
  );
}

export default App;
