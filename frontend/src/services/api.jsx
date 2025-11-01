import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const api = axios.create({
  baseURL: "http://localhost:9090",
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
  try {
    const response = await api.post("/auth/login", data);
    return { message: "login realizado com sucesso", status: response.status };
  } catch (error) {
    console.log("Erro:", error);
    return { message: "erro ao realizar login", status: error.response.status };
  }
}

export async function deslogar(data = null) {
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

export async function refresh() {
  try {
    const response = await api.post("/auth/refresh");
    return { message: "token resetado com sucesso", status: response.status };
  } catch (error) {
    console.log("Erro:", error);
    return { message: "erro ao resetar token", status: error.response.status };
  }
}

/*###############################################################################################################################################
#                                            Usuario:cadastro, busca, exclusão                                                                  # 
###############################################################################################################################################*/

export async function cadastrarUsuario(data) {
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

export async function buscarUsuarioPorEmail() {
  try {
    const response = await api.get("/usuario/email");
    return {
      message: "usuario encontrado com sucesso",
      status: response.status,
      usuarios: response.data,
    };
  } catch (error) {
    console.log("Erro:", error);
    return { message: "erro ao buscar usuario", status: error.response.status };
  }
}

export async function buscarTodosUsuarios() {
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

export async function deletarPorEmail(data) {
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

/*###############################################################################################################################################
#                                            Esqueci a Senha:envio email, envio token, reset senha                                              # 
###############################################################################################################################################*/

export async function requisitar_email(data) {
  try {
    const response = await api.post(
      "/recuperacaosenha/envio_email_reset",
      data
    );
    return {
      message: "email enviado com sucesso",
      status: response.status,
      tokenSeguranca: response.data,
    };
  } catch (error) {
    console.log("Erro:", error);
    return { message: "erro ao enviar email", status: error.response.status };
  }
}

export async function enviar_token(data) {
  try {
    const response = await api.post("/recuperacaosenha/validacao_token", data);
    return { message: "token validado com sucesso", status: response.status };
  } catch (error) {
    console.log("Erro:", error);
    return { message: "erro ao validar token", status: error.response.status };
  }
}

export async function alterar_senha(data) {
  try {
    const response = await api.put("/recuperacaosenha/alteracao_senha", data);
    return { message: "senha recuperada com sucesso", status: response.status };
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao recuperar senha",
      status: error.response.status,
    };
  }
}

/*###############################################################################################################################################
#                                                      Busca e consulta de cotações                                                             # 
###############################################################################################################################################*/

export async function buscar_cotacoes() {
  try {
    const response = await api.get("/cotacoes");
    return {
      message: "Cotações encontradas com sucesso",
      status: response.status,
      cotacoes: response.data || [],
    };
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar cotacoes",
      status: error.response.status,
    };
  }
}
export async function procurar_acao(ticker) {
  try {
    const response = await api.get(`/cotacoes/${ticker}`);
    return {
      message: "Cotações encontradas com sucesso",
      status: response.status,
      dados_acao: response.data || null,
    };
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar cotacoes",
      status: error.response.status,
    };
  }
}

/*###############################################################################################################################################
#                                                      Busca e consulta de cotações                                                             # 
###############################################################################################################################################*/
export async function procurar_historico_balanco_anual_acao(periodo, ticker) {
  try {
    const response = await api.get(`/history/balance/${periodo}/${ticker}`);
    return {
      message: "Historico de balanço da ação encontrado com sucesso",
      status: response.status,
      historico: response.data || null,
    };
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar historico de balanço",
      status: error.response.status,
    };
  }
}

export async function procurar_historico_renda_anual_acao(periodo, ticker) {
  try {
    const response = await api.get(`/history/income/${periodo}/${ticker}`);
    return {
      message: "Historico de renda da ação encontrado com sucesso",
      status: response.status,
      historico: response.data || null,
    };
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar historico de renda",
      status: error.response.status,
    };
  }
}

export async function procurar_historico_fluxo_de_caixa_acao(periodo, ticker) {
  try {
    const response = await api.get(`/history/cashflow/${periodo}/${ticker}`);
    return {
      message: "Historico de fluxo de caixa encontrado com sucesso",
      status: response.status,
      historico: response.data || null,
    };
  } catch (error) {
    console.log("Erro:", error);
    return {
      message: "erro ao buscar historico de fluxo de caixa",
      status: error.response.status,
    };
  }
}
