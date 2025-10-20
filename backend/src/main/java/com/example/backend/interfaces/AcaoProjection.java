package com.example.backend.interfaces;

public interface AcaoProjection 
{
    String getTicker();
	Float getValor_de_mercado();
	String getNome();
	Float getPreco();
	Float getVariacao();
	String getSetor();
	String getTipo();
	Float getPl();
	Float getLpa();
	Float getVpa();
    Float getP_vp();
	Long getQuantidade_acoes();
    Float getEarningYield();
    Float getP_ebit();
    Float getP_fco();
    Float getP_fcl();
    Float getP_receita();
    Float getDividendsYield();
    Float getEnterpriseValue();
    Float getEv_ebit();
    Float getEv_receita();
	Float getEv_fco();
    Float getEv_fcl();
    Float getLiq_corrente();
    Float getMargem_bruta();
	Float getMargem_ebitda();
	Float getMargem_liquida();
	Float getGiro_ativos();
    Float getRoe();
    Float getRoa();
    Float getRoic();
}
