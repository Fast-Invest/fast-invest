import { useState } from "react";

export default function LogoBranding() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

      const resp = await cadastrarUsuario({
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
      const resp = await logar({ email: email, senha: password });
      //console.log(resp)
      if (resp.status !== 200) {
        toast.error("Erro no login.");
        return;
      }
      navigate("/");
    }
  };
  return (
    <>
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
    </>
  );
}
