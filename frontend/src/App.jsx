import "./App.css";
import Rotas from "./routes/rotas.jsx";
import { UserProvider } from "./contexts/userContext.jsx";
function App() 
{
  return (
          <UserProvider>
            <Rotas />
          </UserProvider>
        );
}

export default App;
