package com.example.backend.services.financesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repositories.CashDividendsRepo;
import com.example.backend.repositories.DadosPrincipaisAcoesRepo;
import com.example.backend.repositories.IndicadoresRepo;
import com.example.backend.interfaces.CotacaoProjection;
import com.example.backend.exceptions.AcaoNaoEncontrada;
import com.example.backend.exceptions.DividendosNaoEncontrados;
import com.example.backend.exceptions.ErroBuscaCotacoes;

import java.util.List;
import java.util.stream.Collectors;

import com.example.backend.models.IndicadoresAnual;
import com.example.backend.models.CashDividends;
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

    @Autowired
    private CashDividendsRepo cashDividendsRepo;

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
            Indicadores indicador =  indicadoresRepo.findBySymbol(symbol).orElseThrow(()->new AcaoNaoEncontrada());
            // A razão para as multiplicações é pois estes valores geralmente são dados em porcentagem, logo há necessidade de multiplica-los por 100
            // Assim não terá que ocorrer as multiplicações no frontend e deixará mais leve 
            indicador.setDy(indicador.getDy()*100);  
            indicador.setEarningYield(indicador.getEarningYield()*100); 
            indicador.setMargemBruta(indicador.getMargemBruta()*100);  
            indicador.setMargemLiquida(indicador.getMargemLiquida()*100);
            indicador.setMargemEbit(indicador.getMargemEbit()*100);
            indicador.setRoa(indicador.getRoa()*100) ;
            indicador.setRoe(indicador.getRoe()*100);
            indicador.setRoic(indicador.getRoic()*100);

            return indicador;
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
            List<IndicadoresAnual> indicadoresPorAno =  indicadoresAnualRepo.findBySymbol(symbol);
            // A razão para as multiplicações é pois estes valores geralmente são dados em porcentagem, logo há necessidade de multiplica-los por 100
            // Assim não terá que ocorrer as multiplicações no frontend e deixará mais leve 
            return indicadoresPorAno.stream()
                                            .peek(indicador->indicador.setDy(indicador.getDy()*100))  
                                            .peek(indicador->indicador.setEarningYield(indicador.getEarningYield()*100))  
                                            .peek(indicador->indicador.setMargemBruta(indicador.getMargemBruta()*100))  
                                            .peek(indicador->indicador.setMargemLiquida(indicador.getMargemLiquida()*100))  
                                            .peek(indicador->indicador.setMargemEbit(indicador.getMargemEbit()*100))  
                                            .peek(indicador->indicador.setRoa(indicador.getRoa()*100))  
                                            .peek(indicador->indicador.setRoe(indicador.getRoe()*100))  
                                            .peek(indicador->indicador.setRoic(indicador.getRoic()*100))  
                                            .collect(Collectors.toList());
        }
        catch(Exception e)
        {
            throw new ErroBuscaCotacoes("Erro ao buscar cotações das ações"+e);        
        }
    }



    public List<CashDividends> buscarDividendos(String symbol)
    {   
        try 
        {
            return cashDividendsRepo.findByTicker(symbol);

        } catch (Exception e) {
            throw new DividendosNaoEncontrados();
        }

    }





}
