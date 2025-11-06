import MenuWelcome from "./menuWelcome.jsx";
import SearchInput from "../quotation/searchInput.jsx";
import UserBar from "./userBar.jsx";

export default function NavBar(props) {
  return (
    <header className="w-full px-6 py-4 border-b border-white/10 flex items-center justify-between bg-bg">
      <div className="flex items-center gap-8 w-full max-w-[75%]">
        <MenuWelcome nome={props.nome} email={props.email} />
      </div>
      <div className="flex items-center gap-4">
        <UserBar
          nome={props.nome}
          email={props.email}
          numCarteiras={props.numCarteiras}
          isLogged={props.isLogged}
          setIsLogged={props.setIsLogged}
          setNome={props.setNome}
        />
      </div>
    </header>
  );
}
