import "./App.css";
import MenuWelcome from "./components/menuWelcome";
import Sidebar from "./components/sideBar";

function App() {
  return (
    <>
      <div className="flex bg-primary min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 text-white">
          <MenuWelcome />
        </main>
      </div>
    </>
  );
}

export default App;
