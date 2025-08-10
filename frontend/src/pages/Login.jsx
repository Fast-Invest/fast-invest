import { useState } from "react";
import { useNavigate,Link } from "react-router-dom"
import "../App.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { logar, cadastrarUsuario } from '../services/api.jsx'




export default function Login() {

	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate();
	const themeColors = {
		primary: "#00ff9c",
		bg: "#15151a",
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!validateEmail(email)) 
		{
			toast.error("Por favor, insira um email válido.");
			return;
		}

		if (!isLogin)  //CADASTRO
		{
			if (!username) 
			{
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



			const resp = await cadastrarUsuario({"nome":username,"email":email,"senha":password})
			//console.log("Errrrrroooooo")
			//console.log(resp)
			if (resp.status !== 201) { toast.error("Erro ao cadastrar usuario"); return;}
			toast.success("Conta criada com sucesso!");
		}


		else // ################# LOGIN
		{   
			const resp = await logar({"email":email,"senha":password})
			//console.log(resp)
			if (resp.status !== 200){toast.error("Erro no login."); return;}
      navigate("/")
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
            background: themeColors.bg,
            color: "#fff",
            border: `1px solid ${themeColors.primary}`,
          },
          // Estilos específicos para cada tipo de toast
          success: {
            style: {
              border: `1px solid ${themeColors.primary}`,
            },
            iconTheme: {
              primary: themeColors.primary,
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
      <div className="w-1/2 flex items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full filter blur-3xl"></div>

        <div className="max-w-md text-center z-10">
          <img
            src="/svg/logo.svg"
            alt="Fast Invest"
            className="mx-auto w-400 h-100 mb-6"
          />
          <h1 className="text-5xl font-bold text-primary mb-4">Fast Invest</h1>
          <p className="text-text-muted text-lg">
            Sua plataforma moderna de investimentos e análise de mercado.
          </p>
        </div>
      </div>

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
              className="cursor-pointer w-full bg-primary hover:bg-primary-dark text-black font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
              {isLogin ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          <div className="mt-8 text-center text-text-muted">
            {isLogin ? "Não tem uma conta? " : "Já possui uma conta? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-semibold cursor-pointer"
            >
              {isLogin ? "Cadastre-se agora" : "Faça o login"}
            </button>
          </div>

			{isLogin ? 
			<div className="mt-8 text-center text-text-muted">
				Esqueceu a senha?
				<Link className="text-primary hover:underline font-semibold" to="/EsqueciSenha">
					<span> Adquira uma nova</span>
				</Link> 
			</div>
			: ""}


        </div>
      </div>
    </div>
  );
}
