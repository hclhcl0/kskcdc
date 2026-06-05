'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface HistoryChartProps {
  data: { date: string; total: number }[];
}

export default function HistoryChart({ data }: HistoryChartProps) {
  const chartConfig = {
    total: {
      label: "Lũy kế",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  // Format date for display
  const formattedData = data.map(d => ({
    ...d,
    displayDate: new Date(d.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
  }));

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500 text-sm">
        Chưa có dữ liệu báo cáo nào.
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="w-full h-[320px]">
      <AreaChart
        accessibilityLayer
        data={formattedData}
        margin={{ top: 12, right: 12, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis
          dataKey="displayDate"
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#64748b', fontSize: 12 }}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          tickFormatter={(v) => `${v.toLocaleString('vi-VN')}`}
        />
        <ChartTooltip
          cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
          content={<ChartTooltipContent />}
        />
        <Area
          type="monotone"
          dataKey="total"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#fillTotal)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
