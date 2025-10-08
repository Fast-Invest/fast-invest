package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.interfaces.CotacaoProjection;
import com.example.backend.services.financesService.CotacoesService;

import java.util.List;


@RestController
@RequestMapping("/cotacoes")
public class CotacaoController 
{

    @Autowired
    private CotacoesService cotacaoService;


    @GetMapping
    public ResponseEntity<List<CotacaoProjection>> retornarCotacoes() 
    {
        List<CotacaoProjection> cotacoes = cotacaoService.buscarCotacoes();
        return ResponseEntity.status(HttpStatus.OK).body(cotacoes);
    }
   
}
