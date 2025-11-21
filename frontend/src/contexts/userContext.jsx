import { createContext, useState, useEffect, useContext } from "react";
import authService from "../services/authService";
import walletService from "../services/walletService";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState([
    { id: 0, nome: "Carteira Tutorial", data: "12/05/2024", filtros: [] },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.buscarUsuarioPorEmail();
        if (response.status === 200) {
          console.log("usuario buscado");
          setUser(response.usuarios);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        if (response?.usuarios?.id) {
          const res = await walletService.buscarCarteiras(response.usuarios.id);
          if (res.status === 200) {
            setWallet(res.carteiras);
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Erro ao buscar usuário:", error);
      }
    };
    if (!isLoggedIn || !user) fetchUser();
  }, [user, isLoggedIn]);

  return (
    <UserContext.Provider
      value={{ user, wallet, setWallet, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};
