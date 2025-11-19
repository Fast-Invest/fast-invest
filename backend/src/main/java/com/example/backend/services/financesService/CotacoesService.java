package com.example.backend.services.financesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repositories.DadosPrincipaisAcoesRepo;
import com.example.backend.repositories.IndicadoresRepo;
import com.example.backend.interfaces.CotacaoProjection;
import com.example.backend.exceptions.AcaoNaoEncontrada;
import com.example.backend.exceptions.ErroBuscaCotacoes;

import java.util.List;
import com.example.backend.models.IndicadoresAnual;
import com.example.backend.models.Indicadores;
import com.example.backend.repositories.IndicadoresAnualRepo;

@Service
public class CotacoesService 
{
    @Autowired
    private DadosPrincipaisAcoesRepo dadosPrincipaisAcoesRepo;

    @Autowired
    private IndicadoresRepo indicadoresRepo;

    @Autowired
    private IndicadoresAnualRepo indicadoresAnualRepo;

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

    public List<Indicadores> buscarInformacoesCompletas()
    {
        try
        {
            return indicadoresRepo.findAll();
        }
        catch(Exception e)
        {
            throw new ErroBuscaCotacoes("Erro ao buscar cotações das ações"+e);
        }
    }

    public List<IndicadoresAnual> buscarInformacoesCompletasHistorico()
    {
        try
        {
            return indicadoresAnualRepo.findAll();
        }
        catch(Exception e)
        {
            throw new ErroBuscaCotacoes("Erro ao buscar cotações das ações"+e);        
        }
    }


    public Indicadores buscarInformacoesCompletasRecentesAcao(String symbol)
    {
        try
        {
            return indicadoresRepo.findBySymbol(symbol).orElseThrow(()->new AcaoNaoEncontrada());
        }
        catch(Exception e)
        {
            throw new ErroBuscaCotacoes("Erro ao buscar cotações das ações"+e);        
        }
    }

    public List<IndicadoresAnual> buscarInformacoesCompletasHistoricaAcao(String symbol)
    {
        try
        {
            return indicadoresAnualRepo.findBySymbol(symbol);
        }
        catch(Exception e)
        {
            throw new ErroBuscaCotacoes("Erro ao buscar cotações das ações"+e);        
        }
    }









}
