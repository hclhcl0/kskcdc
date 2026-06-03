import { LucideIcon } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  color: 'blue' | 'emerald' | 'violet' | 'amber';
}

const colorMap = {
  blue: {
    icon: 'bg-blue-100 text-blue-600',
    value: 'text-blue-700',
    ring: 'ring-1 ring-blue-100',
  },
  emerald: {
    icon: 'bg-emerald-100 text-emerald-600',
    value: 'text-emerald-700',
    ring: 'ring-1 ring-emerald-100',
  },
  violet: {
    icon: 'bg-violet-100 text-violet-600',
    value: 'text-violet-700',
    ring: 'ring-1 ring-violet-100',
  },
  amber: {
    icon: 'bg-amber-100 text-amber-600',
    value: 'text-amber-700',
    ring: 'ring-1 ring-amber-100',
  },
};

export default function KpiCard({ title, value, subtitle, icon: Icon, color }: KpiCardProps) {
  const c = colorMap[color];
  const displayValue = typeof value === 'number' ? formatNumber(value) : value;

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 p-5 ${c.ring} hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide truncate">
            {title}
          </p>
          <p className={`text-3xl font-bold mt-1.5 ${c.value}`}>{displayValue}</p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1 truncate">{subtitle}</p>
          )}
        </div>
        <div className={`flex-shrink-0 p-3 rounded-xl ${c.icon}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
