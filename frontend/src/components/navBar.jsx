import MenuWelcome from "./menuWelcome.jsx";
import SearchInput from "./searchInput.jsx";
import UserBar from "./userBar.jsx";
import { FaMoon, FaSun } from "react-icons/fa";

export default function NavBar(props) {
  return (
    <header className="w-full px-6 py-4 border-b border-white/10 flex items-center justify-between bg-bg">
      <div className="flex items-center gap-8 w-full max-w-[75%]">
        <MenuWelcome nome={props.nome} email={props.email}/>
        <div className="flex-1">
          <SearchInput />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full bg-bg-card text-white">
          <FaMoon className="text-xl" />
        </button>
        <UserBar />
      </div>
    </header>
  );
}
