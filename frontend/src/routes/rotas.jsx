import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";


export default function Rotas() 
{

  return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
        	  <Route path="/esqueceusenha" element={<ForgotPassword/>}/>
        </Routes>
        );

}
