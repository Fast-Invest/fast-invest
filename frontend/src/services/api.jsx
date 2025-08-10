import axios from "axios";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: {
    "X-XSRF-TOKEN": getCookie("X-XSRF-TOKEN") || "",
    "Content-Type": "application/json",
  },
});

/*###############################################################################################################################################
#                                     Autenticação:login,logout, refresh token                                                                  # 
###############################################################################################################################################*/
export async function logar(data) {
	try 
	{
		const response = await api.post("/auth/login", data);
		return { "message": "login realizado com sucesso", "status": response.status };
	} 
	catch (error) {

		console.log("Erro:", error);
		return { "message": "erro ao realizar login", "status": error.response.status };
	}
}

export async function deslogar(data) {
	try 
	{
		const response = await api.post("/auth/logout", data);
		return { "message": "login realizado com sucesso", "status": response.status };
	} 
	catch (error)
	{
		console.log("Erro:", error);
		return { "message": "erro ao deslogar usuario", "status": error.response.status };
	}
}

export async function refresh() {
	try 
	{
		const response = await api.post("/auth/refresh");
		return { "message": "token resetado com sucesso", "status": response.status };
	} 
	catch (error)
	{
		console.log("Erro:", error);
		return { "message": "erro ao resetar token", "status": error.response.status };
	}
}

/*###############################################################################################################################################
#                                            Usuario:cadastro, busca, exclusão                                                                  # 
###############################################################################################################################################*/

export async function cadastrarUsuario(data) {
	try 
	{
		const response = await api.post("/usuario", data);
		return {"message": "usuario cadastrado com sucesso","status": response.status,};
	} 
	catch (error) 
	{
		console.log("Erro:", error);
		return { "message": "erro ao cadastrar usuario", "status": error.response.status };
	}
}

export async function buscarUsuarioPorEmail() {
	try 
	{
		const response = await api.get("/usuario/email");
		return {"message": "usuario encontrado com sucesso","status": response.status,"usuarios": response.data,};
	} 
	catch (error) {
		console.log("Erro:", error);
		return { "message": "erro ao buscar usuario", "status": error.response.status };
	}
}

export async function buscarTodosUsuarios() {
	try
	{
		const response = await api.get("/usuario");
		return {"message": "usuarios encontrados com sucesso","status": response.status,"usuarios": response.data,
		};
	} 
	catch (error) 
	{
		console.log("Erro:", error);
		return { "message": "erro ao buscar usuarios", "status": error.response.status };
	}
}


export async function deletarPorEmail(data) {
	try 
	{
		const response = await api.delete("/usuario/email", data);
		return { "message": "usuario deletado com sucesso", "status": response.status };
	}
	catch (error)
	{
		console.log("Erro:", error);
		return { "message": "erro ao deletar usuario", "status": error.response.status };
	}
}
