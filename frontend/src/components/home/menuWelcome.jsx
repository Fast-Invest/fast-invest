export default function MenuWelcome({ nome, isLogged }) {
  return (
    <>
      <h1 className="text-5xl font-black text-white tracking-tight">
        Bem-vindo,{" "}
        <span className="relative inline-block">
          {/* Sombra com gradiente e blur */}
          <span
            className="absolute inset-0 text-transparent bg-primary-dark 
                bg-clip-text blur-md opacity-60 pointer-events-none"
          >
            {isLogged ? nome : "Usuário!"}
          </span>

          <span className="bg-primary text-transparent bg-clip-text">
            {isLogged ? nome : "Usuário!"}
          </span>
        </span>
      </h1>
    </>
  );
}
