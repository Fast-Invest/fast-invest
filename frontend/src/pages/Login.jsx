import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "../contexts/userContext.jsx";
import "../App.css";
import authService from "../services/authService.jsx";
import LinkVoltar from "../components/utils/linkVoltar.jsx";
import LogoBranding from "../components/login/logoBranding.jsx";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setIsLoggedIn, user } = useUser();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    if (!isLogin) {
      // Cadastro
      if (!username) {
        toast.error("O nome de usuário é obrigatório.");
        return;
      }
      if (password.length < 6) {
        toast.error("A senha deve ter pelo menos 6 caracteres.");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem.");
        return;
      }

      const resp = await authService.cadastrarUsuario({
        nome: username,
        email: email,
        senha: password,
      });
      //console.log("Errrrrroooooo")
      //console.log(resp)
      if (resp.status !== 201) {
        toast.error("Erro ao cadastrar usuario");
        return;
      }
      toast.success("Conta criada com sucesso!");
    } // Login
    else {
      const resp = await authService.logar({ email: email, senha: password });
      if (resp.status !== 200) {
        toast.error("Erro no login.");
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex bg-bg text-text font-sans antialiased">
      {/* Toaster com o estilo*/}
      <Toaster
        position="top-right"
        toastOptions={{
          // Estilos padrão para todos os toasts
          style: {
            background: "#15151a",
            color: "#fff",
            border: `1px solid #00ff9c`,
          },
          // Estilos específicos para cada tipo de toast
          success: {
            style: {
              border: `1px solid #00ff9c`,
            },
            iconTheme: {
              primary: "#00ff9c",
              secondary: "#fff",
            },
          },
          error: {
            style: {
              border: "1px solid #EF4444",
            },
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* Lado Esquerdo */}
      <LogoBranding />

      {/* Lado Direito: Formulário */}
      <div className="w-1/2 bg-bg-card flex items-center justify-center p-12 rounded-l-3xl shadow-2xl shadow-black">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-text mb-8 text-center">
            {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative flex items-center">
                <FaUser className="absolute left-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-bg p-4 pl-12 rounded-lg border-2 border-gray text-text focus:border-primary focus:outline-none transition-colors duration-300"
                />
              </div>
            )}

            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-4 text-text-muted" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg p-4 pl-12 rounded-lg border-2 border-gray text-text focus:border-primary focus:outline-none transition-colors duration-300"
              />
            </div>
            <div className="relative flex items-center">
              <FaLock className="absolute left-4 text-text-muted" />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg p-4 pl-12 rounded-lg border-2 border-gray text-text focus:border-primary focus:outline-none transition-colors duration-300"
              />
            </div>

            {!isLogin && (
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-text-muted" />
                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-bg p-4 pl-12 rounded-lg border-2 border-gray text-text focus:border-primary focus:outline-none transition-colors duration-300"
                />
              </div>
            )}

            <button
              type="submit"
              className="cursor-pointer w-full bg-primary hover:bg-primary-dark text-black font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:outline-none active:ring-4 active:ring-primary/50"
            >
              {isLogin ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          {/* Botão para trocar entre cadastro e login */}
          <div className="mt-8 text-center text-text-muted">
            {isLogin ? "Não tem uma conta? " : "Já possui uma conta? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-semibold cursor-pointer"
            >
              {isLogin ? "Cadastre-se agora" : "Faça o login"}
            </button>
          </div>

          {/* Link para recuperação de senha */}
          {isLogin ? (
            <div className="text-sm text-center text-text-muted">
              Esqueceu a senha?
              <Link
                className="hover:underline font-semibold"
                to="/esqueceusenha"
              >
                <span> Adquira uma nova</span>
              </Link>
            </div>
          ) : (
            ""
          )}

          {/* Link para voltar ao início */}
          <LinkVoltar to="/" />
        </div>
      </div>
    </div>
  );
}
