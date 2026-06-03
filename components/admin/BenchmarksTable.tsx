'use client';

import { useState, useCallback } from 'react';
import { Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface BenchmarkRecord {
  don_vi: string;
  nguoi_cao_tuoi: number | null;
  nguoi_khuyet_tat: number | null;
  ho_ngheo: number | null;
  ho_can_ngheo: number | null;
  nguoi_co_cong: number | null;
  vung_kho_khan: number | null;
  tre_em_duoi_6_tuoi: number | null;
}

const FIELDS: { key: keyof Omit<BenchmarkRecord, 'don_vi'>; label: string; short: string }[] = [
  { key: 'nguoi_cao_tuoi',     label: 'Người cao tuổi',               short: 'Cao tuổi'  },
  { key: 'nguoi_khuyet_tat',   label: 'Người khuyết tật',             short: 'Khuyết tật'},
  { key: 'ho_ngheo',           label: 'Hộ nghèo',                     short: 'Hộ nghèo'  },
  { key: 'ho_can_ngheo',       label: 'Hộ cận nghèo',                 short: 'Cận nghèo' },
  { key: 'nguoi_co_cong',      label: 'Người có công',                short: 'Có công'   },
  { key: 'vung_kho_khan',      label: 'Vùng khó khăn / DTTS',         short: 'Vùng khó'  },
  { key: 'tre_em_duoi_6_tuoi', label: 'Trẻ em dưới 6 tuổi',          short: 'Trẻ <6T'   },
];

interface CellProps {
  value: number | null;
  onChange: (val: number | null) => void;
  saving: boolean;
}

function EditCell({ value, onChange, saving }: CellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  const startEdit = () => {
    setDraft(value === null ? '' : String(value));
    setEditing(true);
  };

  const commit = () => {
    setEditing(false);
    const trimmed = draft.trim();
    if (trimmed === '' || trimmed === '-') {
      onChange(null);
    } else {
      const n = parseInt(trimmed.replace(/[.,\s]/g, ''), 10);
      onChange(isNaN(n) ? null : n);
    }
  };

  if (editing) {
    return (
      <input
        autoFocus
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false); }}
        className="w-full px-2 py-1 text-sm border-2 border-blue-400 rounded text-center focus:outline-none bg-blue-50"
      />
    );
  }

  return (
    <button
      onClick={startEdit}
      disabled={saving}
      className={`w-full px-2 py-1.5 text-sm text-center rounded transition-colors hover:bg-blue-50 hover:text-blue-700 ${
        value === null
          ? 'text-slate-300 italic'
          : 'text-slate-700 font-medium'
      }`}
    >
      {value === null ? '—' : value.toLocaleString('vi-VN')}
    </button>
  );
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface RowStatus {
  status: SaveStatus;
  message?: string;
}

interface Props {
  initialData: BenchmarkRecord[];
}

export default function BenchmarksTable({ initialData }: Props) {
  const [rows, setRows] = useState<BenchmarkRecord[]>(initialData);
  const [rowStatus, setRowStatus] = useState<Record<string, RowStatus>>({});
  const [search, setSearch] = useState('');

  const filtered = rows.filter((r) =>
    r.don_vi.toLowerCase().includes(search.toLowerCase())
  );

  const updateCell = useCallback(
    (don_vi: string, field: keyof Omit<BenchmarkRecord, 'don_vi'>, val: number | null) => {
      setRows((prev) => prev.map((r) => r.don_vi === don_vi ? { ...r, [field]: val } : r));
    },
    []
  );

  const saveRow = useCallback(async (row: BenchmarkRecord) => {
    setRowStatus((s) => ({ ...s, [row.don_vi]: { status: 'saving' } }));
    try {
      const res = await fetch(`/api/benchmarks/${encodeURIComponent(row.don_vi)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(row),
      });
      const data = await res.json();
      if (data.success) {
        setRowStatus((s) => ({ ...s, [row.don_vi]: { status: 'saved' } }));
        setTimeout(() => setRowStatus((s) => ({ ...s, [row.don_vi]: { status: 'idle' } })), 2000);
      } else {
        setRowStatus((s) => ({ ...s, [row.don_vi]: { status: 'error', message: data.error } }));
      }
    } catch {
      setRowStatus((s) => ({ ...s, [row.don_vi]: { status: 'error', message: 'Lỗi kết nối' } }));
    }
  }, []);

  const totalFilled = rows.reduce((acc, r) => {
    const hasData = FIELDS.some((f) => r[f.key] !== null);
    return acc + (hasData ? 1 : 0);
  }, 0);

  return (
    <div>
      {/* Stats + Search bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 items-start sm:items-center justify-between">
        <div className="flex gap-3 text-sm">
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">
            ✓ {totalFilled} đơn vị có chỉ tiêu
          </span>
          <span className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full font-medium">
            ⚠ {rows.length - totalFilled} chưa có
          </span>
        </div>
        <input
          type="text"
          placeholder="Tìm đơn vị..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="text-left px-4 py-3 font-semibold text-slate-600 sticky left-0 bg-slate-50 min-w-[180px]">
                Xã / Phường
              </th>
              {FIELDS.map((f) => (
                <th key={f.key} className="text-center px-2 py-3 font-semibold text-slate-600 min-w-[100px] whitespace-nowrap">
                  {f.short}
                </th>
              ))}
              <th className="text-center px-3 py-3 font-semibold text-slate-600 min-w-[80px]">
                Lưu
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((row, idx) => {
              const st = rowStatus[row.don_vi] ?? { status: 'idle' };
              const isSaving = st.status === 'saving';
              return (
                <tr
                  key={row.don_vi}
                  className={`transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                  } hover:bg-blue-50/30 ${
                    st.status === 'saved' ? 'bg-emerald-50/50' : ''
                  } ${st.status === 'error' ? 'bg-red-50/50' : ''}`}
                >
                  {/* Tên đơn vị */}
                  <td className="px-4 py-2 font-medium text-slate-800 sticky left-0 bg-inherit whitespace-nowrap">
                    {row.don_vi}
                  </td>

                  {/* Cells */}
                  {FIELDS.map((f) => (
                    <td key={f.key} className="px-1 py-1">
                      <EditCell
                        value={row[f.key]}
                        saving={isSaving}
                        onChange={(val) => updateCell(row.don_vi, f.key, val)}
                      />
                    </td>
                  ))}

                  {/* Save button */}
                  <td className="px-2 py-1 text-center">
                    {st.status === 'saving' ? (
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin mx-auto" />
                    ) : st.status === 'saved' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" />
                    ) : st.status === 'error' ? (
                      <button onClick={() => saveRow(row)} title={st.message}>
                        <AlertCircle className="w-4 h-4 text-red-500 mx-auto" />
                      </button>
                    ) : (
                      <button
                        onClick={() => saveRow(row)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Lưu chỉ tiêu"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            Không tìm thấy đơn vị nào
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-3">
        💡 Nhấn vào ô để sửa → Enter hoặc click ra ngoài để xác nhận → nhấn 💾 để lưu
      </p>
    </div>
  );
}
