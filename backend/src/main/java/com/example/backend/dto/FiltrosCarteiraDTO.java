package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FiltrosCarteiraDTO {
    // Ação
    private Double valorAcaoMin;
    private Double valorAcaoMax;

    // Lucro por Ação
    private Double lpaMin;
    private Double lpaMax;

    // Valor Patrimonial por Ação
    private Double vpaMin;
    private Double vpaMax;

    // Preço sobre Lucro por Ação
    private Double plMin;
    private Double plMax;

    // Preço sobre Valor Patrimonial
    private Double pvpMin;
    private Double pvpMax;

    // Preço sobre Ebit(Lucro antes de Juros e Impostos)
    private Double pebitMin;
    private Double pebitMax;

    // Preço sobre Receita
    private Double psrMin;
    private Double psrMax;

    // Percentual anual de dividendo pagos em relação ao preço
    private Double dividendYieldMin;
    private Double dividendYieldMax;

    // Percentual de Lucro Liquído da empresa em relação ao seu valor de mercado
    private Double earningYieldMin;
    private Double earningYieldMax;

    // Enterprise Value sobre Ebit(Lucro antes de Juros e Impostos)
    private Double evEbitMin;
    private Double evEbitMax;

    // Enterprise Value sobre Receita
    private Double evReceitaMin;
    private Double evReceitaMax;

    // Enterprise Value sobre Fluxo de Caixa Operacional
    private Double evFcoMin;
    private Double evFcoMax;

    // Enterprise Value sobre Fluxo de Caixa Livre
    private Double evFclMin;
    private Double evFclMax;

    // Preço sobre Fluxo de Caixa Operacional
    private Double pfcoMin;
    private Double pfcoMax;

    // Preço sobre Fluxo de Caixa Livre
    private Double pfclMin;
    private Double pfclMax;

    // Valor da Empresa incluindo Dívidas
    private Double enterpriseValueMin;
    private Double enterpriseValueMax;

    // Valor Total de todas as Ações da Empresa
    private Double valorMercadoMin;
    private Double valorMercadoMax;

    // Índice específico para Instituições
    private Double indiceBasileiaMin;
    private Double indiceBasileiaMax;

    // Capacidade da Empresa de pagar as suas Obrigações de Curto Prazo com os seus Ativos Circulante
    private Double liquidezCorrenteMin;
    private Double liquidezCorrenteMax;

    // Percentual de Receita que sobra após deduzir Custos Diretos de Dedução
    private Double margemBrutaMin;
    private Double margemBrutaMax;

    // Percentual da Receita que representa o Lucro antes dos Juros e Impostos
    private Double margemEbitMin;
    private Double margemEbitMax;

    // Percentual de Receita que se converte em Lucro Líquido após todas as Deduções
    private Double margemLiquidaMin;
    private Double margemLiquidaMax;

    // Mede a eficiência da Empresa em gerar Receita em seus Ativos Totais
    private Double giroAtivoMin;
    private Double giroAtivoMax;

    // Médio Retorno sobre Patrimônio Líquido, indicando a eficiência em gerar Lucro com o Capital dos acionistas
    private Double roeMin;
    private Double roeMax;

    // Retorno sobre o Capital Investido
    private Double roicMin;
    private Double roicMax;

    // Mede a eficiência da Empresa em gerar Lucro com os seus Ativos Totais
    private Double roaMin;
    private Double roaMax;

    // Percentual de Lucro Líquido distribuído com Dividendos para os Acionistas
    private Double payoutMin;
    private Double payoutMax;

    // Taxa de Crescimento Anual composta das receitas dos últimos anos
    private Double cagrReceitaMin;
    private Double cagrReceitaMax;

    // Taxa de Crescimento Anual composta do Lucro Líquido dos últimos anos
    private Double cagrLucroMin;
    private Double cagrLucroMax;

    // Taxa de Crescimento Anual composta do Ebit dos últimos anos
    private Double cagrEbitMin;
    private Double cagrEbitMax;
}
