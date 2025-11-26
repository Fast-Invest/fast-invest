package com.example.backend.interfaces;

public interface CashflowProjection {

    Integer getAno();

    String getSymbol();

    Double getFluxoDeCaixaOperacional();

    Double getCaixaGeradoNasOperacoes();

    Double getVariacoesNosAtivosPassivos();

    Double getFluxoDeCaixaDeInvestimento();

    Double getFluxoDeCaixaDeFinanciamento();

    Double getFluxoDeCaixaLivre();

    Double getVariacaoDeCaixa();

    Double getSaldoInicialDeCaixa();

    Double getSaldoFinalDeCaixa();
}
