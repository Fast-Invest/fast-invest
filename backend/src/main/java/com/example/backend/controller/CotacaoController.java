package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.interfaces.AcaoProjection;
import com.example.backend.interfaces.CotacaoProjection;
import com.example.backend.services.financesService.CotacoesService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@Tag(name = "Cotacoes", description = "endpoints para consulta de ações, cotações e valores")
@RestController
@RequestMapping("/cotacoes")
public class CotacaoController 
{

    @Autowired
    private CotacoesService cotacaoService;

    @Operation(summary = "Busca dados gerais sobre as cotacoes disponiveis")
    @ApiResponse(responseCode = "200", description = "cotações encontradas, devolve os dados")
    @ApiResponse(responseCode = "404", description = "Erro ao buscar cotações") 
    @GetMapping
    public ResponseEntity<List<CotacaoProjection>> retornarCotacoes() 
    {
        List<CotacaoProjection> cotacoes = cotacaoService.buscarCotacoes();
        return ResponseEntity.status(HttpStatus.OK).body(cotacoes);
    }
 




    @Operation(summary = "Busca informações completas sobre uma ação")
    @ApiResponse(responseCode = "200", description = "Ação encontrada, devolve os dados")
    @ApiResponse(responseCode = "404", description = "Ação com ticker especificado não encontrada") 
    @GetMapping("/{ticker}")
    public ResponseEntity<AcaoProjection> retornarCotacao(@PathVariable String ticker) 
    {
        AcaoProjection acao = cotacaoService.buscarInformacaoCotacao(ticker);
        return ResponseEntity.status(HttpStatus.OK).body(acao);
    }    
}
