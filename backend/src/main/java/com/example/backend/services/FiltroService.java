package com.example.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.Map.entry;

import java.lang.reflect.Field;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.FiltrosCarteiraDTO;
import com.example.backend.exceptions.CarteiraNaoEncontrada;
import com.example.backend.forms.FiltroForm;
import com.example.backend.mappers.FiltroMapper;
import com.example.backend.models.Carteira;
import com.example.backend.models.Filtro;
import com.example.backend.models.Indicadores;

import com.example.backend.repositories.CarteiraRepo;
import com.example.backend.repositories.FiltroRepo;
import com.example.backend.repositories.IndicadoresRepo;

@Service
public class FiltroService 
{
    @Autowired
    FiltroRepo filtroRepo;

    @Autowired
    FiltroMapper filtroMapper;

    @Autowired
    CarteiraRepo carteiraRepo;

    @Autowired
    IndicadoresRepo indicadoresRepo;

    public List<FiltrosCarteiraDTO> AdicionarFiltros(ArrayList<FiltroForm> forms,Long idCarteira)
    {
        try
        {
            Carteira carteira = carteiraRepo.findById(idCarteira).orElseThrow(()->new CarteiraNaoEncontrada());

            List<FiltrosCarteiraDTO> filtros = forms.stream()
                            .map(filtro ->filtroMapper.toEntity(filtro))  
                            .peek(filtro -> filtro.setCarteira(carteira))  
                            .map(filtro -> {return filtroRepo.save(filtro);})  // Salva o filtro
                            .map(filtro-> filtroMapper.toResponse(filtro))
                            .collect(Collectors.toList());  // Coleta os filtros em uma lista
            return filtros;
        }
        catch(Exception e)
        {
            System.out.println(e);
            return null;
        }
    }

    public List<FiltrosCarteiraDTO> buscarFiltros(Long idCarteira)
    {
        List<FiltrosCarteiraDTO> filtros = filtroMapper.toResponseList(filtroRepo.findByCarteiraId(idCarteira)
                                                                       .orElseThrow(()->new CarteiraNaoEncontrada()));

        return filtros;
    }


    //Mapper do nome/tipo presente no filtro, e nome do atribuyo referente na classe indicadores
    private static final Map<String, String> TIPO_CAMPO_MAP = Map.ofEntries(
            entry("DY", "dy"),
            entry("P/L", "pl"),
            entry("PEG Ratio", "pegRatio"),
            entry("P/VP", "pVp"),
            entry("P/Ativos", "pAtivos"),
            entry("Margem Bruta", "margemBruta"),
            entry("Margem Ebit", "margemEbit"),
            entry("Margem Líquida", "margemLiquida"),
            entry("P/EBIT", "pEbit"),
            entry("EV/EBIT", "evEbit"),
            entry("Dívida Líquida / EBIT", "dividaLiqEbit"),
            entry("Dívida Líquida / Patrimônio", "dividaLiqPatrimonio"),
            entry("ROE", "roe"),
            entry("ROIC", "roic"),
            entry("ROA", "roa"),
            entry("Liquidez Corrente", "liquidezCorrente"),
            entry("Patrimônio / Ativos", "patrimonioAtivos"),
            entry("Passivos / Ativos", "passivosAtivos"),
            entry("Giros Ativos", "giroAtivos"),
            entry("Liquidez média diária", "liquidezMediaDiaria"),
            entry("VPA", "vpa"),
            entry("LPA", "lpa"),
            entry("Valor de mercado", "marketCap"),
            entry("P/Capital de Giro", "pCapitalGiro"),
            entry("P/Ativo Circ. Líq.", "pAtivoCircLiq")
    );



//SELECT * FROM indicadores WHERE pl BETWEEN ? AND ? AND dy BETWEEN ? AND ?



}
