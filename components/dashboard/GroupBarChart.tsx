'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { GroupStat } from '@/lib/types';
import { formatNumber } from '@/lib/utils';

interface GroupBarChartProps {
  data: GroupStat[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3">
        <p className="text-sm font-semibold text-slate-700 mb-1">{label}</p>
        <p className="text-xl font-bold" style={{ color: payload[0].fill }}>
          {formatNumber(payload[0].value)}
        </p>
        <p className="text-xs text-slate-400">người được khám</p>
      </div>
    );
  }
  return null;
}

export default function GroupBarChart({ data }: GroupBarChartProps) {
  const chartData = data.map((d) => ({
    name: d.shortLabel,
    label: d.label,
    total: d.total,
    color: d.color,
  }));

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">Thống kê theo nhóm đối tượng</h2>
          <p className="text-xs text-slate-400 mt-0.5">Tổng hợp toàn hệ thống</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 12, left: 0, bottom: 40 }}
          barSize={36}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            angle={-20}
            textAnchor="end"
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatNumber(v)}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 8 }} />
          <Bar dataKey="total" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 pt-3 border-t border-slate-100">
        {data.map((d) => (
          <div key={d.key} className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-xs text-slate-500">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
