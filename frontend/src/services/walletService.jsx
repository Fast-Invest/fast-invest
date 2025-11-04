import api from "./api.jsx"


async function adicionarCarteira(data, id)
{
    try
    {
        console.log(data)
        const resp = await api.post(`/carteira/${id}`, data)
        console.log(resp)
        return {
                message: "Carteira cadastrada com sucesso",
                status: resp.status,
                carteira: resp.data || null,
            };    
    }
    catch(error)
    {
        console.log(error)
        return {
            message: "Erro ao cadastrar carteira",
            status: error.response.status,
        };        
    }
}

async function buscarCarteiras(userId)
{
    try
    {
        const resp = await api.get(`/carteira/${userId}`)
        console.log(resp)
        return {
                message: "Carteiras buscadas com sucesso",
                status: resp.status,
                carteiras: resp.data || null,
            };    
    }
    catch(error)
    {
        console.log(error)
        return {
            message: "Erro ao buscar carteira",
            status: error?.response?.status || 500,
        };        
    }
}


async function deletarCarteira(){}
async function editarCarteira(){}













async function adicionarFiltro(data)
{
   const resp = api.post(`/filtro/{carteiraId}`,data)
   return resp

}

const walletService = {
                        adicionarCarteira,
                        buscarCarteiras,
                        deletarCarteira,
                        editarCarteira,
                        adicionarFiltro,
                    }
export default walletService;