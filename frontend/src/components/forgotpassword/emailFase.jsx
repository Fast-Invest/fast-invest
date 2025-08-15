import { FaEnvelope } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import { requisitar_email } from "../../services/api";

export default function EmailFase({ mudarEtapa, setEmail, setTokenSeguranca,email }) {

	const handleSubmit = async (e) => {
		e.preventDefault();
		try 
		{
			const resp = await requisitar_email({ email: email });
			console.log(resp)
			if (resp.status !== 200) 
			{
				toast.error("Erro ao enviar email");
				return;
			}
			toast.success("email enviado com sucesso! Redirecionando...");
			setTimeout(() => {
				setTokenSeguranca(resp.tokenSeguranca)
				mudarEtapa(1)
			}, 1500)
		} 
		catch (error) 
		{
			toast.error("Erro ao enviar email");
			return;
		}
	};
	return (
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
					<div className="relative flex items-center">
						<FaEnvelope className="absolute left-4 text-text-muted" />
						<input
							type="email"
							placeholder="Email"
							value={email}
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							className="w-full bg-bg p-4 pl-12 rounded-lg border-2 border-gray text-text focus:border-primary focus:outline-none transition-colors duration-300"
						/>
					</div>

					<button
						type="submit"
						className="cursor-pointer w-full bg-primary hover:bg-primary-dark text-black font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:outline-none active:ring-4 active:ring-primary/50"
					>
						Receber token
					</button>
				</form>
			</div>
		</>
	);
}
