import api from "./api.jsx";

async function adicionarCarteira(data, id) {
  try {
    const resp = await api.post(`/carteira/${id}`, data);
    return {
      message: "Carteira cadastrada com sucesso",
      status: resp.status,
      carteira: resp.data || null,
    };
  } catch (error) {
    console.error("Erro ao adicionar carteira:", error);
    return {
      message: "Erro ao cadastrar carteira",
      status: error.response?.status || 500,
      error: error.message,
    };
  }
}

async function buscarCarteiras(userId) {
  try {
    const resp = await api.get(`/carteira/${userId}`);
    return {
      message: "Carteiras buscadas com sucesso",
      status: resp.status,
      carteiras: resp.data || null,
    };
  } catch (error) {
    console.error("Erro ao buscar carteiras:", error);
    return {
      message: "Erro ao buscar carteira",
      status: error?.response?.status || 500,
      error: error.message,
    };
  }
}

async function deletarCarteira(idCarteira) {
  try {
    const res = await api.delete(`/carteira/${idCarteira}`);
    return {
      message: res.data,
      status: res.status,
    };
  } catch (error) {
    console.error("Erro ao deletar carteira:", error);
    return {
      message: "Erro ao deletar carteira",
      status: error.response?.status || 500,
      error: error.message,
    };
  }
}

async function editarCarteira(data, idCarteira) {
  try {
    console.log("Info carteira:", data);
    console.log("ID carteira:", idCarteira);

    const resp = await api.put(`/carteira/${idCarteira}`, data);
    return {
      message: "Carteira atualizada com sucesso",
      status: resp.status,
      carteira: resp.data || null,
    };
  } catch (error) {
    console.error("Erro ao editar carteira:", error);
    return {
      message: "Erro ao atualizar carteira",
      status: error.response?.status || 500,
      error: error.message,
    };
  }
}

async function procurarCarteira(carteiraId) {
  try {
    const response = await api.get(`/search/${carteiraId}`);
    return {
      message: "Carteira encontrada com sucesso",
      status: response.status,
      carteira: response.data,
    };
  } catch (error) {
    console.error("Erro ao procurar carteira:", error);
    return {
      message: "Erro ao procurar carteira",
      status: error.response?.status || 500,
      error: error.message,
    };
  }
}

async function adicionarFiltro(data, carteiraId) {
  try {
    const resp = await api.post(`/filtro/${carteiraId}`, data);
    return {
      message: "Filtros cadastrados com sucesso",
      status: resp.status,
      filtros: resp.data || null,
    };
  } catch (error) {
    console.error("Erro ao adicionar filtro:", error);
    throw error;
  }
}

async function aplicarFiltros(carteiraId) {
  try {
    const resp = await api.get(`/filtro/filtragem/${carteiraId}`);

    // Verificar a estrutura da resposta
    const filtros = Array.isArray(resp.data)
      ? resp.data
      : resp.data?.filtros || [];

    return {
      message: "Ações buscadas com base nos filtros passados",
      status: resp.status,
      filtros: filtros,
      totalAcoes: filtros.length,
    };
  } catch (error) {
    console.error("[walletService] Erro ao aplicar filtros:", error);
    console.error("[walletService] Detalhes do erro:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
}

const walletService = {
  adicionarCarteira,
  buscarCarteiras,
  procurarCarteira,
  deletarCarteira,
  editarCarteira,
  adicionarFiltro,
  aplicarFiltros,
};

export default walletService;
