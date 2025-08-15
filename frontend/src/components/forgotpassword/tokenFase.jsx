import { useState,useRef} from "react";
import { FaLock } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { enviar_token } from "../../services/api";

export default function TokenFase({ mudarEtapa, tokenSeguranca  }) {

  	const themeColors = {
							primary: "#00ff9c",
							bg: "#15151a",
 						};

	const TOKEN_LENGTH = 4;

	const [token, setToken] = useState(Array(TOKEN_LENGTH).fill(''));					
	const inputRef = useRef([]);


	const inputChange=(input,index)=>{
		const newToken=[...token]
		newToken[index]=input
		setToken(newToken);


		if (input.length === 1 && index < TOKEN_LENGTH - 1) {
			inputRef.current[index + 1]?.focus();
		}

		if (input.length === 0 && index > 0) {
			inputRef.current[index - 1]?.focus();
		}

		if(newToken.every((digito)=>digito !== '')){
			setToken(newToken.join(''));
		}
	}
		
	const handleSubmit= async (e)=>{
		e.preventDefault();

		try
		{
		const resp = await enviar_token({ tokenUsuario :token, tokenSeguranca:tokenSeguranca})
		if (resp.status !== 200) 
		{
			toast.error("token invalido ou expirado");
			return;
		}
		toast.success("token validado enviado com sucesso! Redirecionando...");
		setTimeout(() => {mudarEtapa(2)}, 1500)
		}
		catch(error)
		{
			console.log('error:',error)
			toast.error("token invalido ou expirado")
		}
	}

  	return(
    <>
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

      {/* Lado Direito: Formulário */}

	  <div className="w-full max-w-md">
		<h2 className="text-4xl font-bold text-text mb-8 text-center border-2-primary">
		  Insira seu email para recuperar a senha
		</h2>

		<form className="space-y-6" onSubmit={handleSubmit}>
		  <div className="relative flex items-center justify-center gap-3">

			{Array.from({length:TOKEN_LENGTH}, (_, index) => (
				<input
					key={index}
					type='text'
					maxLength={1}
					value={token[index]}
					onChange={(e) => inputChange(e.target.value, index)}
					ref={(ref) => (inputRef.current[index] = ref)}
					className="w-1/8 text-center font-bold border border-border-slate-500 border-solid rounded-4xl  p-5 focus:bg-primary-dark focus:text-black"
				/>
			))}


		  </div>

		  <button
			type="submit"
			className="cursor-pointer w-full bg-primary hover:bg-primary-dark text-black font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:outline-none active:ring-4 active:ring-primary/50"
		  >
			Validar token
		  </button>
		</form>
	  </div>


    </>







  );
}
