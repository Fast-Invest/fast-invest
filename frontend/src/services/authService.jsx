import api from "./api.jsx";

async function logar(data) {
  try {
    const response = await api.post("/auth/login", data);
    return { message: "login realizado com sucesso", status: response.status };
  } catch (error) {
    console.log("Erro:", error);
    return { message: "erro ao realizar login", status: error.response.status };
  }
}

async function deslogar(data = null) {
  try {
    const response = await api.post("/auth/logout", data);
    return { message: "logout realizado com sucesso", status: response.status };
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao deslogar usuario",
      status: error.response.status,
    };
  }
}

async function cadastrarUsuario(data) {
  try {
    const response = await api.post("/usuario", data);
    return {
      message: "usuario cadastrado com sucesso",
      status: response.status,
    };
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao cadastrar usuario",
      status: error.response.status,
    };
  }
}

async function buscarUsuarioPorEmail() {
  try {
    const response = await api.get("/usuario/email");
    return {
      message: "usuario encontrado com sucesso",
      status: response.status,
      usuarios: response.data,
    };
  } catch (error) {
    return { message: "erro ao buscar usuario", status: error.response.status };
  }
}

async function buscarTodosUsuarios() {
  try {
    const response = await api.get("/usuario");
    return {
      message: "usuarios encontrados com sucesso",
      status: response.status,
      usuarios: response.data,
    };
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar usuarios",
      status: error.response.status,
    };
  }
}

async function deletarPorEmail(data) {
  try {
    const response = await api.delete("/usuario/email", data);
    return { message: "usuario deletado com sucesso", status: response.status };
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao deletar usuario",
      status: error.response.status,
    };
  }
}

const authService = {
  logar,
  deslogar,
  deletarPorEmail,
  cadastrarUsuario,
  buscarTodosUsuarios,
  buscarUsuarioPorEmail,
};
export default authService;
