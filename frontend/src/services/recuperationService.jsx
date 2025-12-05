import api from "./api.jsx";

async function requisitar_email(data) {
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

async function enviar_token(data) {
  try {
    const response = await api.post("/recuperacaosenha/validacao_token", data);
    return { message: "token validado com sucesso", status: response.status };
  } catch (error) {
    console.log("Erro:", error);
    return { message: "erro ao validar token", status: error.response.status };
  }
}

async function alterar_senha(data) {
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

const recuperationService = {
  enviar_token,
  alterar_senha,
  requisitar_email,
};
export default recuperationService;
