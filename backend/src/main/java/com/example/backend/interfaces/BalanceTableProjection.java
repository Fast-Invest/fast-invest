package com.example.backend.interfaces;

public interface BalanceTableProjection {

    String getData();

    String getTicker();

    Double getAtivosTotais();

    Double getAtivosCirculante();

    Double getCaixaEquivalentes();

    Double getEstoques();

    Double getPassivosTotais();

    Double getPassivosCirculante();

    Double getDividaLongoPrazo();

    Double getPatrimonioLiquido();

    Double getLucrosRetidos();
}
