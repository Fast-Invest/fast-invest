import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Download, Maximize2, Eye, EyeOff } from "lucide-react";

export default function QuotationChart({ quotation }) {
  // Estados de controle
  const [chartType, setChartType] = useState("line"); // line, area, bar
  const [period, setPeriod] = useState(30); // 7, 14, 30, 90
  const [showVolume, setShowVolume] = useState(true);
  const [showRSI, setShowRSI] = useState(true);
  const [showMA, setShowMA] = useState(false); // Média Móvel
  const [showBB, setShowBB] = useState(false); // Bandas de Bollinger
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Gerar dados com período selecionado
  const generateChartData = useMemo(() => {
    const data = [];
    let basePrice = quotation.precoAtual;

    for (let i = period; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * 0.3;
      basePrice = Math.max(basePrice + variation, basePrice * 0.8);

      data.push({
        day: `D-${i}`,
        preco: parseFloat(basePrice.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000),
        rsi: Math.floor(Math.random() * 100),
      });
    }

    return data.reverse();
  }, [period, quotation.precoAtual]);

  // Calcular Média Móvel (SMA de 7 dias)
  const dataWithMA = useMemo(() => {
    return generateChartData.map((item, index) => {
      if (index < 6) return item;

      const sum = generateChartData
        .slice(index - 6, index + 1)
        .reduce((acc, curr) => acc + curr.preco, 0);
      const ma = sum / 7;

      return {
        ...item,
        ma: parseFloat(ma.toFixed(2)),
      };
    });
  }, [generateChartData]);

  // Calcular Bandas de Bollinger
  const dataWithBB = useMemo(() => {
    const period = 20;
    const stdDev = 2;

    return dataWithMA.map((item, index) => {
      if (index < period - 1) return item;

      const slice = dataWithMA.slice(index - period + 1, index + 1);
      const prices = slice.map((d) => d.preco);
      const mean = prices.reduce((a, b) => a + b) / prices.length;
      const variance =
        prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) /
        prices.length;
      const std = Math.sqrt(variance);

      return {
        ...item,
        bbUpper: parseFloat((mean + stdDev * std).toFixed(2)),
        bbLower: parseFloat((mean - stdDev * std).toFixed(2)),
        bbMiddle: parseFloat(mean.toFixed(2)),
      };
    });
  }, [dataWithMA]);

  // Dados finais com todos os indicadores
  const chartData = dataWithBB;

  // Cores do tema dark
  const chartColors = {
    primary: "#00FF88",
    secondary: "#8b5cf6",
    warning: "#f59e0b",
    danger: "#ef4444",
    success: "#10b981",
    text: "#e5e7eb",
    gridStroke: "#374151",
  };

  // Renderizar gráfico baseado no tipo selecionado
  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 0, bottom: 5 },
    };

    const baseChart = (
      <>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.gridStroke} />
        <XAxis
          dataKey="day"
          stroke={chartColors.text}
          style={{ fontSize: "12px" }}
        />
        <YAxis stroke={chartColors.text} style={{ fontSize: "12px" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: `1px solid ${chartColors.primary}`,
            borderRadius: "8px",
          }}
          formatter={(value) => {
            if (typeof value === "number") {
              return value.toFixed(2);
            }
            return value;
          }}
          labelStyle={{ color: chartColors.primary }}
        />
        <Legend />

        {/* Linha de Preço */}
        {chartType === "line" && (
          <Line
            type="monotone"
            dataKey="preco"
            stroke={chartColors.primary}
            strokeWidth={2}
            dot={false}
            name="Preço (R$)"
          />
        )}

        {/* Área de Preço */}
        {chartType === "area" && (
          <>
            <defs>
              <linearGradient id="colorPreco" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartColors.primary}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartColors.primary}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="preco"
              stroke={chartColors.primary}
              fillOpacity={1}
              fill="url(#colorPreco)"
              name="Preço (R$)"
            />
          </>
        )}

        {/* Barras de Preço */}
        {chartType === "bar" && (
          <Bar
            dataKey="preco"
            fill={chartColors.primary}
            name="Preço (R$)"
            radius={[4, 4, 0, 0]}
          />
        )}

        {/* Média Móvel */}
        {showMA && (
          <Line
            type="monotone"
            dataKey="ma"
            stroke={chartColors.warning}
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
            name="Média Móvel (7)"
          />
        )}

        {/* Bandas de Bollinger */}
        {showBB && (
          <>
            <Line
              type="monotone"
              dataKey="bbUpper"
              stroke={chartColors.danger}
              strokeWidth={1}
              dot={false}
              strokeDasharray="3 3"
              name="BB Superior"
            />
            <Line
              type="monotone"
              dataKey="bbMiddle"
              stroke={chartColors.secondary}
              strokeWidth={1}
              dot={false}
              strokeDasharray="3 3"
              name="BB Média"
            />
            <Line
              type="monotone"
              dataKey="bbLower"
              stroke={chartColors.success}
              strokeWidth={1}
              dot={false}
              strokeDasharray="3 3"
              name="BB Inferior"
            />
          </>
        )}
      </>
    );

    if (chartType === "area") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart {...commonProps}>{baseChart}</AreaChart>
        </ResponsiveContainer>
      );
    } else if (chartType === "bar") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart {...commonProps}>{baseChart}</BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart {...commonProps}>{baseChart}</LineChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div
      className={`space-y-6 ${
        isFullscreen
          ? "fixed inset-0 bg-bg z-50 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-black/40"
          : ""
      }`}
    >
      <div className="bg-black/40 border border-primary/20 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Análise de <span className="text-primary">{quotation.symbol}</span>
          </h3>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-gray-400 hover:text-primary"
            title={isFullscreen ? "Sair do fullscreen" : "Fullscreen"}
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4 pb-4 border-b border-primary/20">
          <p className="text-xs text-gray-400 font-semibold mb-2">
            Tipo de Gráfico
          </p>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: "line", label: "Linha" },
              { value: "area", label: "Área" },
              { value: "bar", label: "Barras" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setChartType(option.value)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  chartType === option.value
                    ? "bg-primary text-black"
                    : "bg-black/40 border border-primary/20 text-gray-300 hover:border-primary/40"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 pb-4 border-b border-primary/20">
          <p className="text-xs text-gray-400 font-semibold mb-2">Período</p>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 7, label: "7 dias" },
              { value: 14, label: "14 dias" },
              { value: 30, label: "30 dias" },
              { value: 90, label: "90 dias" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPeriod(option.value)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  period === option.value
                    ? "bg-primary text-black"
                    : "bg-black/40 border border-primary/20 text-gray-300 hover:border-primary/40"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 pb-4 border-b border-primary/20">
          <p className="text-xs text-gray-400 font-semibold mb-2">
            Indicadores
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { state: showVolume, setState: setShowVolume, label: "Volume" },
              { state: showRSI, setState: setShowRSI, label: "RSI" },
              { state: showMA, setState: setShowMA, label: "Média Móvel" },
              { state: showBB, setState: setShowBB, label: "Bandas BB" },
            ].map((indicator) => (
              <button
                key={indicator.label}
                onClick={() => indicator.setState(!indicator.state)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                  indicator.state
                    ? "bg-primary/20 border border-primary/40 text-primary"
                    : "bg-black/40 border border-primary/20 text-gray-400 hover:border-primary/40"
                }`}
              >
                {indicator.state ? (
                  <Eye className="w-3 h-3" />
                ) : (
                  <EyeOff className="w-3 h-3" />
                )}
                {indicator.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black/40 border border-primary/20 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">
          Evolução de Preço
        </h3>
        {renderChart()}
      </div>

      {showVolume && (
        <div className="bg-black/40 border border-primary/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">
            Volume de Negociação
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.gridStroke}
              />
              <XAxis
                dataKey="day"
                stroke={chartColors.text}
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke={chartColors.text} style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: `1px solid ${chartColors.secondary}`,
                  borderRadius: "8px",
                }}
                formatter={(value) => [
                  `${(value / 1000000).toFixed(2)}M`,
                  "Volume",
                ]}
                labelStyle={{ color: chartColors.secondary }}
              />
              <Bar
                dataKey="volume"
                fill={chartColors.secondary}
                name="Volume"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {showRSI && (
        <div className="bg-black/40 border border-primary/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">
            RSI <span className="text-primary">(Relative Strength Index)</span>
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.gridStroke}
              />
              <XAxis
                dataKey="day"
                stroke={chartColors.text}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke={chartColors.text}
                style={{ fontSize: "12px" }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: `1px solid ${chartColors.warning}`,
                  borderRadius: "8px",
                }}
                formatter={(value) => [value.toFixed(2), "RSI"]}
                labelStyle={{ color: chartColors.warning }}
              />
              <Legend />
              <ReferenceLine
                y={70}
                stroke={chartColors.danger}
                strokeDasharray="5 5"
                label={{
                  value: "Sobrecompra (70)",
                  position: "right",
                  fill: chartColors.danger,
                  fontSize: 12,
                }}
              />
              <ReferenceLine
                y={30}
                stroke={chartColors.success}
                strokeDasharray="5 5"
                label={{
                  value: "Sobrevenda (30)",
                  position: "right",
                  fill: chartColors.success,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="rsi"
                stroke={chartColors.warning}
                strokeWidth={2}
                dot={false}
                name="RSI"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="fixed bottom-6 right-6 px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/80 transition-all"
        >
          Sair do Fullscreen
        </button>
      )}
    </div>
  );
}
