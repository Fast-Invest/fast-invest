package com.example.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.backend.dto.FiltrosCarteiraDTO;
import com.example.backend.exceptions.CarteiraNaoEncontrada;
import com.example.backend.forms.FiltroForm;
import com.example.backend.mappers.FiltroMapper;
import com.example.backend.models.Carteira;
import com.example.backend.models.Filtro;
import com.example.backend.models.Indicadores;
import com.example.backend.utils.IndicadorSpecification;
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



    public List<Indicadores> aplicarFiltros(Long carteiraId)
    {
        try {
            Carteira carteira=carteiraRepo.findById(carteiraId).orElseThrow(()->new CarteiraNaoEncontrada());
            List<Filtro> filtros= carteira.getFiltros();

            Specification<Indicadores> spec = IndicadorSpecification.withFilters(filtros);    
            return indicadoresRepo.findAll(spec);
        } 
        catch (Exception e) {
            System.out.println("Erro :"+e);
        }

        
        return null;
    }



}
