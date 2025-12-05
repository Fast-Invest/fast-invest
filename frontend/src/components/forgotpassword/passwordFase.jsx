import { useState } from "react";
import { FaLock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import recuperationService from "../../services/recuperationService"
import { useNavigate } from "react-router-dom";

export default function PasswordFase({ email }) {
  const [senha, setSenha] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (senha !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const resp = await recuperationService.alterar_senha({ email: email, senha: senha });
      if (resp.status !== 200) {
        toast.error("Erro ao enviar email");
        return;
      }
      toast.success("Senha alterada com sucesso! Redirecionando ao login");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log("erro", error);
      toast.error("Erro ao recuperar senha");
    }
  };
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#15151a",
            color: "#fff",
            border: `1px solid #00ff9c`,
          },
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

      <div className="w-full max-w-md">
        <h2 className="text-4xl font-bold text-text mb-8 text-center border-2-primary">
          Insira seu email para recuperar a senha
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative flex items-center">
            <FaLock className="absolute left-4 text-text-muted" />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full bg-bg p-4 pl-12 rounded-lg border-2 border-gray text-text focus:border-primary focus:outline-none transition-colors duration-300"
            />
          </div>

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

          <button
            type="submit"
            className="cursor-pointer w-full bg-primary hover:bg-primary-dark text-black font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:outline-none active:ring-4 active:ring-primary/50"
          >
            Alterar senha
          </button>
        </form>
      </div>
    </>
  );
}
