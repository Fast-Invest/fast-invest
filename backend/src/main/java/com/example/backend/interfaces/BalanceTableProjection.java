package com.example.backend.interfaces;

public interface BalanceTableProjection {

    Integer getAno();

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
