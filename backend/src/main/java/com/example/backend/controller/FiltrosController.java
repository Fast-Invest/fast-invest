package com.example.backend.controller;

import com.example.backend.dto.FiltrosCarteiraDTO;
import com.example.backend.forms.FiltroForm;
import com.example.backend.models.Indicadores;
import com.example.backend.services.FiltroService;

import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@Validated
@RequestMapping("/filtro")
public class FiltrosController 
{
    @Autowired
    FiltroService filtroService;


    @PostMapping("/{carteiraId}")
    public ResponseEntity<List<FiltrosCarteiraDTO>> adicionarFiltro(@PathVariable Long carteiraId, @Valid @RequestBody ArrayList<FiltroForm> forms)
    {
        try
        {
            List<FiltrosCarteiraDTO> resp = filtroService.AdicionarFiltros(forms, carteiraId); 
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


    @GetMapping("/{carteiraId}")
    public ResponseEntity<List<FiltrosCarteiraDTO>> buscarFiltro(@PathVariable Long carteiraId)
    {
        try
        {
            List<FiltrosCarteiraDTO> resp = filtroService.buscarFiltros(carteiraId); 
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }



    @GetMapping("/filtragem/{carteiraId}")
    public ResponseEntity<List<Indicadores>> filtrarCotacoes(@PathVariable Long carteiraId)
    {
        try
        {
            List<Indicadores> resp = filtroService.aplicarFiltros(carteiraId); 
            if(resp==null) return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(null);

            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }







}