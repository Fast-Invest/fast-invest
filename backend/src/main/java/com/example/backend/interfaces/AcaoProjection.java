package com.example.backend.interfaces;
import com.fasterxml.jackson.annotation.JsonProperty;

public interface AcaoProjection 
{
    @JsonProperty("ticker")
    String getTicker();

    @JsonProperty("valor_de_mercado")
    Float getValor_de_mercado();

    @JsonProperty("nome")
    String getNome();

    @JsonProperty("preco")
    Float getPreco();

    @JsonProperty("variacao")
    Float getVariacao();

    @JsonProperty("setor")
    String getSetor();

    @JsonProperty("tipo")
    String getTipo();

    @JsonProperty("p/l")
    Float getPl();

    @JsonProperty("lpa")
    Float getLpa();

    @JsonProperty("vpa")
    Float getVpa();

    @JsonProperty("p/vp")
    Float getP_vp();

    @JsonProperty("quantidade_acoes")
    Long getQuantidade_acoes();

    @JsonProperty("earning_yield")
    Float getEarningYield();

    @JsonProperty("p/ebit")
    Float getP_ebit();

    @JsonProperty("p/fco")
    Float getP_fco();

    @JsonProperty("p/fcl")
    Float getP_fcl();

    @JsonProperty("p/receita")
    Float getP_receita();

    @JsonProperty("dividends_yield")
    Float getDividendsYield();

    @JsonProperty("enterprise_value")
    Float getEnterpriseValue();

    @JsonProperty("ev/ebit")
    Float getEv_ebit();

    @JsonProperty("ev/receita")
    Float getEv_receita();

    @JsonProperty("ev/fco")
    Float getEv_fco();

    @JsonProperty("ev/fcl")
    Float getEv_fcl();

    @JsonProperty("liquidez_corrente")
    Float getLiq_corrente();

    @JsonProperty("margem_bruta")
    Float getMargem_bruta();

    @JsonProperty("margem_ebitda")
    Float getMargem_ebitda();

    @JsonProperty("margem_liquida")
    Float getMargem_liquida();

    @JsonProperty("giro_ativos")
    Float getGiro_ativos();

    @JsonProperty("roe")
    Float getRoe();

    @JsonProperty("roa")
    Float getRoa();

    @JsonProperty("roic")
    Float getRoic();

    // Adicionar os novos campos que faltam
    @JsonProperty("passivos/ativos")
    Float getPassivos_ativos();

    @JsonProperty("patrimonio_ativos")
    Float getPatrimonio_ativos();

    @JsonProperty("liquidez_media_diaria")
    Float getLiquidez_media_diaria();

    @JsonProperty("divida_liq_ebit")
    Float getDivida_liq_ebit();

    @JsonProperty("divida_liq_patrimonio")
    Float getDivida_liq_patrimonio();
}