'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { Facility } from '@prisma/client';

export default function FacilitiesClientPage({ initialFacilities }: { initialFacilities: Facility[] }) {
  const router = useRouter();
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [newName, setNewName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    
    setIsAdding(true);
    setError('');
    try {
      const res = await fetch('/api/facilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra');
      }
      
      setFacilities([...facilities, data].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName('');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc muốn xóa Cơ sở y tế "${name}"?`)) return;
    
    setDeletingId(id);
    setError('');
    try {
      const res = await fetch(`/api/facilities/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra');
      }
      
      setFacilities(facilities.filter(f => f.id !== id));
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in zoom-in duration-300">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <Building2 className="w-8 h-8 text-blue-600" />
          Cơ sở y tế phụ trách
        </h1>
        <p className="mt-2 text-slate-600">
          Quản lý danh sách các Cơ sở y tế (TTYT/Bệnh viện). Các đơn vị cấp dưới sẽ được gán vào các Cơ sở y tế này.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <form onSubmit={handleAdd} className="flex gap-3">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nhập tên Cơ sở y tế mới..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              disabled={isAdding}
            />
            <button
              type="submit"
              disabled={!newName.trim() || isAdding}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-sm hover:shadow-md"
            >
              {isAdding ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              Thêm mới
            </button>
          </form>
          {error && (
            <div className="mt-3 text-red-600 text-sm flex items-center gap-1 bg-red-50 p-2 rounded-lg border border-red-100">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        <div className="divide-y divide-slate-100">
          {facilities.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              Chưa có Cơ sở y tế nào.
            </div>
          ) : (
            facilities.map((f) => (
              <div key={f.id} className="p-4 px-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                <div className="font-medium text-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <Building2 className="w-4 h-4" />
                  </div>
                  {f.name}
                </div>
                <button
                  onClick={() => handleDelete(f.id, f.name)}
                  disabled={deletingId === f.id}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-50"
                  title="Xóa cơ sở y tế"
                >
                  {deletingId === f.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
