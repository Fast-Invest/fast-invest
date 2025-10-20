package com.example.backend.services.financesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repositories.DadosPrincipaisAcoesRepo;
import com.example.backend.interfaces.AcaoProjection;
import com.example.backend.interfaces.CotacaoProjection;
import com.example.backend.exceptions.AcaoNaoEncontrada;
import com.example.backend.exceptions.ErroBuscaCotacoes;

import java.util.List;

@Service
public class CotacoesService 
{
    @Autowired
    private DadosPrincipaisAcoesRepo dadosPrincipaisAcoesRepo;


    public List<CotacaoProjection> buscarCotacoes()
    {
        try
        {
            return dadosPrincipaisAcoesRepo.buscarCotacoes();
        }
        catch(Exception e)
        {
            throw new ErroBuscaCotacoes("Erro ao buscar cotações das ações"+e);
        }
    }

    public AcaoProjection buscarInformacaoCotacao(String ticker)
    {
        try
        {
            List<AcaoProjection> acoes= dadosPrincipaisAcoesRepo.buscarInfoCompletaAcao(ticker);
            if(acoes.isEmpty())
            {
                throw new AcaoNaoEncontrada("Erro:Nenhuma ação com ticker:"+ticker+" não foi encontrada");
            }
            AcaoProjection acao=acoes.get((acoes.size()/2)+1);
            return acao;
        }
        catch(Exception e)
        {
            throw new AcaoNaoEncontrada("Erro ao buscar cotações das ações"+e);
        }
    }













}
