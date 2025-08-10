
export default function MenuWelcome(props) {

  const nome = props.nome
  return (
    <>
      <h1 className="text-5xl font-black text-white tracking-tight">
        Bem-vindo,{' '}
        <span className="relative inline-block">
          {/* Sombra com gradiente e blur */}
          <span
            className="absolute inset-0 text-transparent bg-gradient-to-r from-lime-400 to-secondary 
                bg-clip-text blur-md opacity-60 pointer-events-none"
          >
            {nome}
          </span>

          <span className="bg-gradient-to-r from-lime-400 to-secondary text-transparent bg-clip-text">
            {nome}
          </span>
        </span>
      </h1>
    </>
  );
}
