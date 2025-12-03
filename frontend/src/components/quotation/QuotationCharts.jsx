import  { useMemo } from "react";
import {
    ResponsiveContainer,
    ComposedChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Bar,
    Line,
    Legend,
    BarChart,
    LineChart
    
} from "recharts";

/**
 * Props:
 * - historico_indicadores: array de objetos com ao menos { dataBalanco, dy, dividendosAnuais }
 *
 * O componente agrupa/ordena por ano automaticamente e renderiza:
 * - Barras: dy (em porcentagem)  => eixo direito
 * - Linha: dividendosAnuais (R$) => eixo esquerdo
 *
 * Usa as variáveis CSS do seu theme:
 * --color-primary, --color-primary-dark, --color-secondary
 */
export function ContentDividendsChart({ historico_indicadores = [] }) {
    const PRIMARY = "var(--color-primary, #00ff9c)"; // fallback
    const PRIMARY_DARK = "var(--color-primary-dark, #00cc7f)";
    const SECONDARY = "var(--color-secondary, #00b36f)";
    const BAR_COLOR = "var(--color-bar, #2f6bed)"; // se quiser forçar azul, setar --color-bar no root; fallback azul

    // prepara os pontos a partir do historico_indicadores
    const data = useMemo(() => {
        if (!Array.isArray(historico_indicadores)) return [];

        const map = new Map();

        historico_indicadores.forEach((it) => {
            const date =
                it?.dataBalanco ||
                it?.dataDemonstrativoResultados ||
                it?.pagamentoDividendo;

            if (!date) return;

            const year = new Date(date).getFullYear();
            if (!Number.isFinite(year)) return;

            // sobrescreve se existir ano duplicado
            map.set(year, {
                year,
                dy: typeof it.dy === "number" ? it.dy : 0,
                dividends:
                    typeof it.dividendosAnuais === "number"
                        ? it.dividendosAnuais
                        : 0,
            });
        });

        return Array.from(map.values()).sort((a, b) => a.year - b.year);
    }, [historico_indicadores]);

    if (!data.length) {
        return (
            <div className="w-full h-80 border border-gray-700 rounded-xl flex items-center justify-center text-gray-400">
                Nenhum dado histórico disponível para desenhar o gráfico.
            </div>
        );
    }

    // calcula maximos para ajustar domains
    const maxDividends = Math.max(...data.map((d) => (d.dividends ?? 0)), 0);
    const maxDy = Math.max(...data.map((d) => (d.dy ?? 0)), 0);

    // formata tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) return null;
        const info = {};
        payload.forEach((p) => {
            info[p.dataKey] = p;
        });

        return (
            <div style={{
                background: "var(--color-bg-card, #1f1f26)",
                color: "var(--color-text, #f6f6f6)",
                padding: 12,
                borderRadius: 8,
                boxShadow: "0 6px 18px rgba(0,0,0,0.45)",
            }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
                {info.dividends && (
                    <div style={{ fontSize: 13, marginBottom: 4 }}>
                        <span style={{ opacity: 0.8 }}>Dividendos: </span>
                        <strong>R$ {Number(info.dividends.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </div>
                )}
                {info.dy && (
                    <div style={{ fontSize: 13 }}>
                        <span style={{ opacity: 0.8 }}>Dividend Yield: </span>
                        <strong>{Number(info.dy.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</strong>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full h-80 p-4 bg-transparent">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 20, right: 48, left: 24, bottom: 8 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis
                        dataKey="year"
                        tick={{ fill: "var(--color-text-muted, #9ca3af)", fontSize: 13 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.04)" }}
                        tickLine={false}
                        padding={{ left: 8, right: 8 }}
                    />

                    {/* Eixo esquerdo -> valores em R$ (dividendos) */}
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        tickFormatter={(v) =>
                            `R$ ${Number(v).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
                        }
                        tick={{ fill: "var(--color-text-muted, #9ca3af)", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.04)" }}
                        tickLine={false}
                        domain={[0, Math.max(maxDividends * 1.2, 1)]}
                    />

                    {/* Eixo direito -> porcentagem DY */}
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickFormatter={(v) => `${Number(v).toLocaleString(undefined, { maximumFractionDigits: 0 })}%`}
                        tick={{ fill: "var(--color-text-muted, #9ca3af)", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        domain={[0, Math.max(maxDy * 1.4, 10)]}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Legend
                        verticalAlign="top"
                        align="right"
                        wrapperStyle={{ color: "var(--color-text, #f6f6f6)", fontSize: 13 }}
                        payload={[
                            { value: "Dividendos (R$)", type: "square", color: PRIMARY_DARK },
                            { value: "Dividend Yield (%)", type: "line", color: PRIMARY },
                        ]}
                    />

                    {/* Barras = DY (mostradas em %), usaremos eixo 'right' */}
                    <Bar
                        yAxisId="right"
                        dataKey="dy"
                        name="Dividend Yield (%)"
                        barSize={28}
                        fill={BAR_COLOR}
                        radius={[8, 8, 0, 0]}
                        isAnimationActive={false}
                    />

                    {/* Linha = dividendos em R$ (eixo left) */}
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="dividends"
                        name="Dividendos (R$)"
                        stroke={PRIMARY}
                        strokeWidth={3}
                        dot={{ stroke: PRIMARY_DARK, strokeWidth: 2, r: 4, fill: PRIMARY }}
                        activeDot={{ r: 6 }}
                        isAnimationActive={false}
                    />

                    {/* Opcional: se quiser uma linha de referência no DY (ex: média) */}
                    {/* <ReferenceLine y={data.reduce((s,d)=>s+(d.dy||0),0)/data.length} yAxisId="right" stroke={SECONDARY} strokeDasharray="3 3" /> */}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}



export function EvMultiplesChart({ historico_indicadores = [] }) {
    const COLORS = {
        ev: "#018251", // fundo
        ev_receita: "#00ff9c",
        ev_fco: "#00b3ff",
        ev_fcl: "#ffb300",
    };

    const parseNumber = (v) => {
        if (v === null || v === undefined) return null;
        if (typeof v === "number") return v;
        const n = Number(v);
        return Number.isFinite(n) ? n : null;
    };

    const data = useMemo(() => {
        if (!Array.isArray(historico_indicadores)) return [];

        const map = new Map();

        historico_indicadores.forEach((it) => {
            const date =
                it.dataBalanco ??
                it.dataDemonstrativoResultados ??
                it.data ??
                it.paymentDate;

            if (!date) return;

            const year = new Date(date).getFullYear();
            if (!Number.isFinite(year)) return;

            map.set(year, {
                year,
                enterprise_value: parseNumber(it.enterpriseValue),
                ev_receita: parseNumber(it.evReceita),
                ev_fco: parseNumber(it.evFco),
                ev_fcl: parseNumber(it.evFcl),
            });
        });

        return Array.from(map.values()).sort((a, b) => a.year - b.year);
    }, [historico_indicadores]);

    if (!data.length) {
        return (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
                Sem dados disponíveis
            </div>
        );
    }

    return (
        <div className="w-full h-full" style={{ minWidth: 0, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />

                    <XAxis dataKey="year" stroke="#9ca3af" />

                    {/* 🔹 Eixo esquerdo — ENTERPRISE VALUE */}
                    <YAxis
                        yAxisId="ev"
                        orientation="left"
                        stroke="#6b7280"
                        tickFormatter={(v) =>
                            typeof v === "number"
                                ? `${(v / 1e9).toFixed(1)}B`
                                : ""
                        }
                    />

                    {/* 🔹 Eixo direito — MÚLTIPLOS */}
                    <YAxis
                        yAxisId="multiples"
                        orientation="right"
                        stroke="#9ca3af"
                    />

                    <Tooltip
                        formatter={(value, name) => {
                            if (name === "Enterprise Value") {
                                return typeof value === "number"
                                    ? value.toLocaleString("pt-BR")
                                    : "—";
                            }
                            return typeof value === "number"
                                ? value.toFixed(2)
                                : "—";
                        }}
                    />

                    <Legend />

                    {/* 🔹 BARRAS – EV (FICA ATRÁS) */}
                    <Bar
                        yAxisId="ev"
                        dataKey="enterprise_value"
                        name="Enterprise Value"
                        fill={COLORS.ev}
                        barSize={32}
                        radius={[6, 6, 0, 0]}
                    />

                    {/* 🔹 LINHAS – MÚLTIPLOS (FICAM NA FRENTE) */}
                    <Line
                        yAxisId="multiples"
                        type="monotone"
                        dataKey="ev_receita"
                        name="EV / Receita"
                        stroke={COLORS.ev_receita}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        yAxisId="multiples"
                        type="monotone"
                        dataKey="ev_fco"
                        name="EV / FCO"
                        stroke={COLORS.ev_fco}
                        strokeWidth={2}
                        dot={false}
                    />

                    <Line
                        yAxisId="multiples"
                        type="monotone"
                        dataKey="ev_fcl"
                        name="EV / FCL"
                        stroke={COLORS.ev_fcl}
                        strokeWidth={2}
                        dot={false}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}