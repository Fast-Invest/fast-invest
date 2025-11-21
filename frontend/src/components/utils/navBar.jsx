import MenuWelcome from "../home/menuWelcome.jsx";
import UserBar from "./userBar.jsx";
import { useUser } from "../../contexts/userContext.jsx";
import { useEffect } from "react";

export default function NavBar({ setUserId, setCarteiras }) {
  const { user, wallet, isLoggedIn, setIsLoggedIn } = useUser();

  useEffect(() => {
    if (setUserId && user) {
      setUserId(user.id);
    }
  }, [user, setUserId]);

  return (
    <header className="w-full px-6 py-4 border-b border-white/10 flex items-center justify-between bg-bg">
      <div className="flex items-center gap-8 w-full max-w-[75%]">
        <MenuWelcome nome={user?.nome} isLogged={isLoggedIn} />
      </div>
      <div className="flex items-center gap-4">
        <UserBar
          nome={user?.nome}
          email={user?.email}
          numCarteiras={wallet?.length}
          isLogged={isLoggedIn}
          setIsLogged={setIsLoggedIn}
          setCarteiras={setCarteiras}
        />
      </div>
    </header>
  );
}
