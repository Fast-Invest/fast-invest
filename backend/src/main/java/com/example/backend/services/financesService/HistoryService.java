package com.example.backend.services.financesService;
import com.example.backend.exceptions.AcaoNaoEncontrada;
import com.example.backend.interfaces.BalanceTableProjection;
import com.example.backend.interfaces.CashflowProjection;
import com.example.backend.interfaces.DRETableProjection;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repositories.BalanceSheetAnualRepo;
import com.example.backend.repositories.BalanceSheetTrimestralRepo;


import com.example.backend.repositories.CashflowHistoryAnualRepo;
import com.example.backend.repositories.CashflowHistoryTrimestralRepo;

import com.example.backend.repositories.IncomeStatementAnualRepo;
import com.example.backend.repositories.IncomeStatementTrimestralRepo;
@Service
public class HistoryService 
{
    
    @Autowired
    BalanceSheetAnualRepo balanceSheetAnualRepo;
    @Autowired
    BalanceSheetTrimestralRepo balanceSheetTrimestalRepo;


    @Autowired
    CashflowHistoryAnualRepo cashflowHistoryAnualRepo;
    @Autowired
    CashflowHistoryTrimestralRepo cashflowHistoryTrimestalRepo;



    @Autowired
    IncomeStatementAnualRepo incomeStatementAnualRepo;
    @Autowired
    IncomeStatementTrimestralRepo incomeStatementTrimestalRepo;


    
    public List<BalanceTableProjection> buscarHistoricoBalancoAnual(String symbol)
    {
        return balanceSheetAnualRepo.getAnualBalanceTable(symbol)
                                    .orElseThrow(()->new AcaoNaoEncontrada("Erro ao buscar historico de balanço da ação de ticker" + symbol));
    }

    public List<BalanceTableProjection> buscarHistoricoBalancoTrimestal(String symbol)
    {
        return balanceSheetTrimestalRepo.getTrimestalBalanceTable(symbol)
                                        .orElseThrow(()->new AcaoNaoEncontrada("Erro ao buscar historico de balanço da ação de ticker" + symbol));
    }   


    public List<DRETableProjection> buscarHistoricoIncomeStatementAnual(String symbol) 
    {
        return incomeStatementAnualRepo.getAnualIncomeTable(symbol)
                .orElseThrow(() -> new AcaoNaoEncontrada("Erro ao buscar histórico anual de renda  da ação de ticker " + symbol));
    }

    public List<DRETableProjection> buscarHistoricoIncomeStatementTrimestral(String symbol) 
    {
        return incomeStatementTrimestalRepo.getTrimestalIncomeTable(symbol)
                .orElseThrow(() -> new AcaoNaoEncontrada("Erro ao buscar histórico trimestral de renda da ação de ticker " + symbol));
    }


    public List<CashflowProjection> buscarHistoricoCashflowAnual(String symbol) 
    {
        return cashflowHistoryAnualRepo.getAnualCashflowTable(symbol)
                .orElseThrow(() -> new AcaoNaoEncontrada("Erro ao buscar histórico anual de fluxo de caixa da ação de ticker " + symbol));
    }

    public List<CashflowProjection> buscarHistoricoCashflowTrimestral(String symbol) 
    {
        return cashflowHistoryTrimestalRepo.getTrimestalCashflowTable(symbol)
                .orElseThrow(() -> new AcaoNaoEncontrada("Erro ao buscar histórico trimestral de fluxo de caixa da ação de ticker " + symbol));
    }











}
