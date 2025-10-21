package com.example.backend.services.financesService;
import com.example.backend.exceptions.AcaoNaoEncontrada;
import com.example.backend.interfaces.BalanceSheet;
import com.example.backend.interfaces.Cashflow;
import com.example.backend.interfaces.IncomeStatement;

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


    
    public List<BalanceSheet> buscarHistoricoBalancoAnual(String symbol)
    {
        return balanceSheetAnualRepo.findBySymbol(symbol)
                                        .orElseThrow(()->new AcaoNaoEncontrada("Erro ao buscar historico de balanço da ação de ticker" + symbol));
         
    }

    public List<BalanceSheet> buscarHistoricoBalancoTrimestal(String symbol)
    {
        return balanceSheetTrimestalRepo.findBySymbol(symbol)
                                        .orElseThrow(()->new AcaoNaoEncontrada("Erro ao buscar historico de balanço da ação de ticker" + symbol));
    }   


    public List<IncomeStatement> buscarHistoricoIncomeStatementAnual(String symbol) 
    {
        return incomeStatementAnualRepo.findByTicker(symbol)
                .orElseThrow(() -> new AcaoNaoEncontrada("Erro ao buscar histórico anual de renda  da ação de ticker " + symbol));
    }

    public List<IncomeStatement> buscarHistoricoIncomeStatementTrimestral(String symbol) 
    {
        return incomeStatementTrimestalRepo.findByTicker(symbol)
                .orElseThrow(() -> new AcaoNaoEncontrada("Erro ao buscar histórico trimestral de renda da ação de ticker " + symbol));
    }


    public List<Cashflow> buscarHistoricoCashflowAnual(String symbol) 
    {
        return cashflowHistoryAnualRepo.findBySymbol(symbol)
                .orElseThrow(() -> new AcaoNaoEncontrada("Erro ao buscar histórico anual de fluxo de caixa da ação de ticker " + symbol));
    }

    public List<Cashflow> buscarHistoricoCashflowTrimestral(String symbol) 
    {
        return cashflowHistoryTrimestalRepo.findBySymbol(symbol)
                .orElseThrow(() -> new AcaoNaoEncontrada("Erro ao buscar histórico trimestral de fluxo de caixa da ação de ticker " + symbol));
    }











}
