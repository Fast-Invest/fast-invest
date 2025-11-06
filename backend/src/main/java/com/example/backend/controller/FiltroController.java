package com.example.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.forms.FiltroForm;
import com.example.backend.models.Filtro;
import com.example.backend.services.FiltroService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/filtros")
public class FiltroController 
{
    @Autowired
    FiltroService filtroService;

    @PostMapping("/{carteiraId}")
    public ResponseEntity<Object> criarfiltro(@RequestBody ArrayList<FiltroForm> filtros, @PathVariable Long carteiraId)
    {
        try
        {
            System.out.println("Tipo de filtros: " + filtros.getClass().getName());
            System.out.println("Conteúdo de filtros: " + filtros);
            List<Filtro> resp = filtroService.AdicionarFiltros(filtros, carteiraId);
            return ResponseEntity.status(HttpStatus.CREATED).body(resp);
        }    
        catch(Exception e)
        { 
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/{carteiraId}")
    public ResponseEntity<Object> buscarfiltro(@PathVariable Long carteiraId)
    {
        try
        {
            List<Filtro> resp = filtroService.buscarFiltros(carteiraId);
            return ResponseEntity.status(HttpStatus.OK).body(resp);
        }    
        catch(Exception e)
        { 
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
