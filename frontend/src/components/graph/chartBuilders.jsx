import {
    ScatterChart,
    Scatter,
    XAxis,
    CartesianGrid,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
    AreaChart,
    Area,
    ComposedChart,
    Legend
} from "recharts";

const PRIMARY = "#00ff9c";
const PRIMARY_DARK = "#00cc7f";
const SECONDARY = "#00b36f";

const Empty = () => (
    <div className="h-[350px] flex items-center justify-center text-gray-400">
        Sem dados para exibir
    </div>
);

// small helper local (keeps code tiny)
const mkDate = (d) => d?.data || d?.dataBalanco || d?.dataDemonstrativoResultados || d?.date || null;
const dateTick = (v) => {
    if (!v) return "";
    const dt = new Date(v);
    if (isNaN(dt)) return String(v);
    return dt.getFullYear();
};

const tooltipDate = (v) => {
    if (!v) return "";
    const dt = new Date(v);
    if (isNaN(dt)) return String(v);
    return dt.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

/* ----------------- ROIC vs EV/EBIT (unchanged except prepared) ----------------- */
export function RoicVsEvEbit({ data }) {
    if (!Array.isArray(data) || data.length === 0) return <Empty />;

    const prepared = data.map((d) => ({ ...d, __date: mkDate(d) }));

    return (
        <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 45, left: 60 }} data={prepared}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
                <XAxis
                    type="number"
                    dataKey="roic"
                    name="ROIC"
                    unit="%"
                    tick={{ fill: "#e5e7eb", fontSize: 12 }}
                    label={{ value: "ROIC (%)", position: "bottom", offset: 25, fill: "#e5e7eb" }}
                />
                <YAxis
                    type="number"
                    dataKey="evEbit"
                    name="EV / EBIT"
                    tick={{ fill: "#e5e7eb", fontSize: 12 }}
                    label={{ value: "EV / EBIT", angle: -90, position: "insideLeft", fill: "#e5e7eb" }}
                />
                <Tooltip
                    cursor={{ stroke: PRIMARY, strokeWidth: 1 }}
                    content={({ active, payload }) => {
                        const date = payload?.[0]?.payload?.__date;
                        if (!active || !payload?.length) return null;
                        const { symbol, roic, evEbit } = payload[0].payload;
                        return (
                            <div className="bg-[#0b0f14] border border-primary rounded-lg px-3 py-2 shadow-lg">
                                <div className="font-bold text-primary mb-1">{symbol}</div>
                                {date && <div className="text-xs text-gray-400">{tooltipDate(date)}</div>}
                                <div className="text-sm text-gray-200">ROIC: <span className="font-semibold">{Number(roic).toFixed(2)}%</span></div>
                                <div className="text-sm text-gray-200">EV / EBIT: <span className="font-semibold">{Number(evEbit).toFixed(2)}</span></div>
                            </div>
                        );
                    }}
                />
                <Scatter data={prepared} fill={PRIMARY} stroke={PRIMARY_DARK} strokeWidth={1.5} r={5} />
            </ScatterChart>
        </ResponsiveContainer>
    );
}

/* ----------------- P / VP -> Area over time ----------------- */
export function PVpaChart({ data }) {
    if (!Array.isArray(data) || data.length === 0) return <Empty />;

    const prepared = data.map((d) => ({ ...d, __date: mkDate(d) }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={prepared} margin={{ top: 16, right: 16, bottom: 40, left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.12} />
                <XAxis dataKey="__date" tickFormatter={dateTick} tick={{ fill: "#e5e7eb" }} />
                <YAxis tick={{ fill: "#e5e7eb" }} label={{ value: "P / VP", angle: -90, position: "insideLeft", fill: "#e5e7eb" }} />
                <Tooltip labelFormatter={(l) => `Data: ${tooltipDate(l)}`} formatter={(v, name, p) => [v?.toFixed?.(2) ?? v, `P/VP (${p?.payload?.symbol})`]} />
                <Area dataKey="pvp" fill={PRIMARY} stroke={PRIMARY_DARK} strokeWidth={1.5} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

/* ----------------- Giro de Ativos -> Line over time ----------------- */
export function GiroAtivosChart({ data }) {
    if (!Array.isArray(data) || data.length === 0) return <Empty />;

    const prepared = data.map((d) => ({ ...d, __date: mkDate(d) }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepared} margin={{ top: 16, right: 16, bottom: 40, left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.12} />
                <XAxis dataKey="__date" tickFormatter={dateTick} tick={{ fill: "#e5e7eb" }} />
                <YAxis tick={{ fill: "#e5e7eb" }} label={{ value: "Giro de Ativos", angle: -90, position: "insideLeft", fill: "#e5e7eb" }} />
                <Tooltip formatter={(v, name, p) => [Number(v).toFixed(3), `Giro (${p?.payload?.symbol})`]} labelFormatter={(l) => tooltipDate(l)} />
                <Line type="monotone" dataKey="giroAtivos" stroke={SECONDARY} strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

/* ----------------- Dívida Líq / EBIT -> Bar (keeps bars) ----------------- */
export function DividaEbitdaChart({ data }) {
    if (!Array.isArray(data) || data.length === 0) return <Empty />;

    const prepared = data.map((d) => ({ ...d, __date: mkDate(d) }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={prepared} margin={{ top: 16, right: 16, bottom: 40, left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.12} />
                <XAxis dataKey="__date" tickFormatter={dateTick} tick={{ fill: "#e5e7eb" }} />
                <YAxis tick={{ fill: "#e5e7eb" }} label={{ value: "Dívida Líq./EBIT", angle: -90, position: "insideLeft", fill: "#e5e7eb" }} />
                <Tooltip formatter={(v, name, p) => [Number(v).toFixed(2), `Dívida/EBIT (${p?.payload?.symbol})`]} labelFormatter={(l) => tooltipDate(l)} />
                <Bar dataKey="dividaLiqEbit" fill={PRIMARY} radius={[6, 6, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}

/* ----------------- Dívida / Patrimônio -> Composed (bar + line) ----------------- */
export function DividaPatrimonioChart({ data }) {
    if (!Array.isArray(data) || data.length === 0) return <Empty />;

    const prepared = data.map((d) => ({ ...d, __date: mkDate(d) }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={prepared} margin={{ top: 16, right: 16, bottom: 40, left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.12} />
                <XAxis dataKey="__date" tickFormatter={dateTick} tick={{ fill: "#e5e7eb" }} />
                <YAxis tick={{ fill: "#e5e7eb" }} label={{ value: "Dívida / Patrimônio", angle: -90, position: "insideLeft", fill: "#e5e7eb" }} />
                <Tooltip formatter={(v, name, p) => [Number(v).toFixed(2), `${name} (${p?.payload?.symbol})`]} labelFormatter={(l) => tooltipDate(l)} />
                <Bar dataKey="dividaLiqPatrimonio" fill={SECONDARY} barSize={16} />
                <Line dataKey="dividaLiqPatrimonio" stroke={PRIMARY_DARK} strokeWidth={1.5} dot={false} />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

/* ----------------- Caixa -> Area (visually smooth) ----------------- */
export function CaixaTotalChart({ data }) {
    if (!Array.isArray(data) || data.length === 0) return <Empty />;

    const prepared = data.map((d) => ({ ...d, __date: mkDate(d) }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={prepared} margin={{ top: 16, right: 16, bottom: 40, left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.12} />
                <XAxis dataKey="__date" tickFormatter={dateTick} tick={{ fill: "#e5e7eb" }} />
                <YAxis tickFormatter={(v) => (v === null || v === undefined ? "" : `${(v / 1e9).toFixed(1)} B`)} tick={{ fill: "#e5e7eb" }} label={{ value: "Caixa (R$)", angle: -90, position: "insideLeft", fill: "#e5e7eb" }} />
                <Tooltip formatter={(v, name, p) => [Intl.NumberFormat("pt-BR").format(v), `Caixa (${p?.payload?.symbol})`]} labelFormatter={(l) => tooltipDate(l)} />
                <Area dataKey="caixa" fill={PRIMARY} stroke={PRIMARY_DARK} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

/* ----------------- Balanço empilhado (mantém stacked) ----------------- */
export function BalancoStackedChart({ data }) {
    if (!Array.isArray(data) || data.length === 0) return <Empty />;

    const prepared = data.map((d) => ({ ...d, __date: mkDate(d) }));

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={prepared} margin={{ top: 16, right: 16, bottom: 40, left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.10} />
                <XAxis dataKey="__date" tickFormatter={dateTick} tick={{ fill: "#e5e7eb" }} />
                <YAxis tickFormatter={(v) => (v ? `${(v / 1e9).toFixed(1)} B` : "")} tick={{ fill: "#e5e7eb" }} />
                <Tooltip formatter={(v, name, p) => [Intl.NumberFormat("pt-BR").format(v), name && `${name} (${p?.payload?.symbol})`]} labelFormatter={(l) => tooltipDate(l)} />
                <Bar dataKey="passivosTotais" stackId="a" fill="#ef4444" />
                <Bar dataKey="patrimonioLiquido" stackId="a" fill={PRIMARY} />
                <Bar dataKey="ativosTotais" stackId="b" fill="#3b82f6" />
                <Legend verticalAlign="top" align="right" wrapperStyle={{ color: "#e5e7eb" }} />
            </BarChart>
        </ResponsiveContainer>
    );
}

/* ----------------- Ativos Ratios -> Composed (bars + line) ----------------- */
export function AtivosRatiosChart({ data }) {
    if (!Array.isArray(data) || data.length === 0) return <Empty />;

    const prepared = data.map((d) => ({ ...d, __date: mkDate(d) }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={prepared} margin={{ top: 16, right: 16, bottom: 40, left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.12} />
                <XAxis dataKey="__date" tickFormatter={dateTick} tick={{ fill: "#e5e7eb" }} />
                <YAxis tick={{ fill: "#e5e7eb" }} />
                <Tooltip formatter={(v, name, p) => [Number(v).toFixed(2), `${name} (${p?.payload?.symbol})`]} labelFormatter={(l) => tooltipDate(l)} />
                <Bar dataKey="pAtivos" name="P / Ativos" fill={PRIMARY} barSize={12} />
                <Bar dataKey="patrimoniosAtivos" name="Patrim. / Ativos" fill={SECONDARY} barSize={12} />
                <Line dataKey="patrimoniosAtivos" stroke={PRIMARY_DARK} strokeWidth={1.5} dot={false} />
            </ComposedChart>
        </ResponsiveContainer>
    );
}

/* ----------------- ROIC TimeSeries (kept as line) ----------------- */
function parseToTimestamp(v) {
    if (!v && v !== 0) return NaN;
    if (v instanceof Date) return v.getTime();
    if (typeof v === "number" && Number.isFinite(v)) return v;

    const s = String(v).trim();

    // Try ISO parse first
    const iso = Date.parse(s);
    if (!Number.isNaN(iso)) return iso;

    // Try dd/mm/yy or dd/mm/yyyy (common in BR)
    const parts = s.split(/[\/\-\.]/).map(p => p.trim());
    if (parts.length === 3) {
        let [dd, mm, yy] = parts;
        // normalize year
        if (yy.length === 2) {
            const num = Number(yy);
            yy = num > 50 ? `19${yy}` : `20${yy}`; // heuristic
        }
        const y = Number(yy), m = Number(mm) - 1, d = Number(dd);
        const ts = new Date(y, m, d).getTime();
        if (!Number.isNaN(ts)) return ts;
    }

    return NaN;
}

function parseNumberBR(n) {
    if (n === null || n === undefined) return NaN;
    if (typeof n === "number") return n;
    const s = String(n).trim();
    // handle "1.234,56" -> "1234.56", "1234,56" -> "1234.56"
    const replaced = s.replace(/\./g, "").replace(/,/g, ".");
    const num = Number(replaced);
    return Number.isFinite(num) ? num : NaN;
}

export function RoicTimeSeries({ data }) {
    if (!Array.isArray(data) || data.length === 0) return <Empty />;

    const prepared = data
        .map((d) => {
            const dateRaw = d.dataBalanco || d.data || d.dataDemonstrativoResultados || d.date;
            const ts = parseToTimestamp(dateRaw);
            const roicVal = parseNumberBR(d.roic);
            return {
                ...d,
                __date: ts, // timestamp (number)
                roic: Number.isFinite(roicVal) ? roicVal : null // keep null for missing
            };
        })
        .filter((d) => Number.isFinite(d.__date)) // drop rows without valid date
        .sort((a, b) => a.__date - b.__date);

    if (prepared.length === 0) return <Empty />;

    // Debug tip: descomente se quiser checar rapidamente no console
    // console.table(prepared.map(p => ({ date: new Date(p.__date).toISOString(), roic: p.roic, type: typeof p.roic })));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={prepared} margin={{ top: 20, right: 20, bottom: 30, left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.12} />

                <XAxis
                    dataKey="__date"
                    type="number"
                    scale="time"
                    domain={["dataMin", "dataMax"]}
                    tickFormatter={dateTick}
                    tick={{ fill: "#e5e7eb", fontSize: 16 }}
                    interval="preserveStartEnd"
                />

                <YAxis
                    type="number"
                    domain={["auto", "auto"]}
                    tickFormatter={(v) => (v === null || v === undefined ? "" : `${v}%`)}
                    tick={{ fill: "#e5e7eb" }}
                    label={{
                        value: "ROIC (%)",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#e5e7eb"
                    }}
                />

                <Tooltip
                    labelFormatter={tooltipDate}
                    formatter={(v) => [`${Number(v).toFixed(2)}%`, "ROIC"]}
                />

                <Line
                    type="monotone"
                    dataKey="roic"
                    connectNulls
                    stroke={PRIMARY}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}