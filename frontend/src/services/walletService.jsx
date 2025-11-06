import api from "./api.jsx";

async function adicionarCarteira(data, id) {
  try {
    console.log(data);
    const resp = await api.post(`/carteira/${id}`, data);
    return {
      message: "Carteira cadastrada com sucesso",
      status: resp.status,
      carteira: resp.data || null,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Erro ao cadastrar carteira",
      status: error.response.status,
    };
  }
}

// Isso tá errado ele teria que volta para o """"carteira/criarcarteira"""" pq ele vai pra tela de filtros de volta só que com tudo setado dele
async function buscarCarteiras(userId) {
  try {
    const resp = await api.get(`/carteira/${userId}`);
    return {
      message: "Carteiras buscadas com sucesso",
      status: resp.status,
      carteiras: resp.data || null,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Erro ao buscar carteira",
      status: error?.response?.status || 500,
    };
  }
}

async function deletarCarteira(idCarteira) {
  try {
    const res = await api.delete(`/carteira/${idCarteira}`);
    return { message: res.data, status: res.status };
  } catch (error) {
    console.log("erro: ", error);
  }
}

async function editarCarteira(data, idCarteira) {
  try {
    const resp = await api.put(`/carteira/${idCarteira}`, data);
    return {
      message: "Carteira cadastrada com sucesso",
      status: resp.status,
      carteira: resp.data || null,
    };
  } 
  catch (error) 
  {
    console.log(error);
    return {
      message: "Erro ao cadastrar carteira",
      status: error.response.status,
    };
  }
}





async function adicionarFiltro(data,carteiraId) 
{
  try {
    console.log("id",carteiraId)
    console.log("filtros:\n",data)
    console.log("Antes de enviar o POST", JSON.stringify(data, null, 2)); // Aqui você imprime o JSON de forma legível
  const resp = await api.post(`/auth/teste/${carteiraId}`, data);
    return {
      message: "Filtros cadastrada com sucesso",
      status: resp.status,
      filtros: resp.data || null,
    };
  }
  catch(error){throw error;}
}

const walletService = {
  adicionarCarteira,
  buscarCarteiras,
  deletarCarteira,
  editarCarteira,
  adicionarFiltro,
};

export default walletService;
