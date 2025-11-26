package com.example.backend.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.interfaces.BalanceTableProjection;
import com.example.backend.interfaces.CashflowProjection;
import com.example.backend.interfaces.DRETableProjection;
import com.example.backend.services.financesService.HistoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@RequestMapping("/history")
@RestController
@Tag(name = "Historico de Ações", description = "endpoints para consultar os historicos de balanço, renda e fluxo de caixa das ações disponíveis")
public class HistoryController 
{

    @Autowired
    HistoryService historyService;


    @Operation(summary = "Busca o historico de fluxo de caixa de uma ação especificado, tendo o periodo e a ação definidos no path")
    @ApiResponse(responseCode = "200", description = "Historico de fluxo de caixa da ação encontrado")
    @GetMapping("cashflow/{periodo}/{ticker}")
    public ResponseEntity<List<CashflowProjection>> buscarHistoricoCashflow(@PathVariable("periodo") String periodo,@PathVariable("ticker") String ticker) 
    {
        if(periodo.equalsIgnoreCase("anual"))
        {
            return ResponseEntity.status(HttpStatus.OK).body(historyService.buscarHistoricoCashflowAnual(ticker));
        }
        if(periodo.equalsIgnoreCase("trimestral"))
        {
            return ResponseEntity.status(HttpStatus.OK).body(historyService.buscarHistoricoCashflowTrimestral(ticker));
        }
        else
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @Operation(summary = "Busca o historico de renda especificado, tendo o periodo e a ação definidos no path")
    @ApiResponse(responseCode = "200", description = "Historico de renda encontrado")
    @GetMapping("income/{periodo}/{ticker}")
    public ResponseEntity<List<DRETableProjection>> buscarHistoricoRenda(@PathVariable("periodo") String periodo,@PathVariable("ticker") String ticker) 
    {
        if(periodo.equalsIgnoreCase("anual"))
        {
            return ResponseEntity.status(HttpStatus.OK).body(historyService.buscarHistoricoIncomeStatementAnual(ticker));
        }
        if(periodo.equalsIgnoreCase("trimestral"))
        {
            return ResponseEntity.status(HttpStatus.OK).body(historyService.buscarHistoricoIncomeStatementTrimestral(ticker));
        }
        else
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    
    @Operation(summary = "Busca o historico de balanço de uma ação especificado, tendo o periodo e a ação definidos no path")
    @ApiResponse(responseCode = "200", description = "Historico de balanço encontrado")
    @GetMapping("balance/{periodo}/{ticker}")
    public ResponseEntity<List<BalanceTableProjection>> buscarHistoricoBalanco(@PathVariable("periodo") String periodo,@PathVariable("ticker") String ticker) 
    {
        if(periodo.equalsIgnoreCase("anual"))
        {
            return ResponseEntity.status(HttpStatus.OK).body(historyService.buscarHistoricoBalancoAnual(ticker));
        }
        if(periodo.equalsIgnoreCase("trimestral"))
        {
            return ResponseEntity.status(HttpStatus.OK).body(historyService.buscarHistoricoBalancoTrimestal(ticker));
        }
        else
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }         
    }
}

