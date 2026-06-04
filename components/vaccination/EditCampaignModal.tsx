'use client';

import { useState, useEffect } from 'react';
import { X, ShieldPlus, Plus, CalendarDays } from 'lucide-react';
import { VaccineCampaign } from '@/lib/types';

interface EditCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: VaccineCampaign | null;
  vaccines: any[];
  onSuccess: () => void;
}

export default function EditCampaignModal({ isOpen, onClose, campaign, vaccines, onSuccess }: EditCampaignModalProps) {
  const [formData, setFormData] = useState<any>({
    id: '',
    name: '',
    startDate: '',
    endDate: '',
    status: 'active',
    vaccines: []
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campaign) {
      setFormData({
        id: campaign.id,
        name: campaign.name,
        startDate: new Date(campaign.startDate).toISOString().split('T')[0],
        endDate: new Date(campaign.endDate).toISOString().split('T')[0],
        status: campaign.status,
        vaccines: campaign.vaccines.map(v => ({
          vaccineId: v.vaccineId,
          totalAllocated: v.totalAllocated
        }))
      });
    }
  }, [campaign]);

  if (!isOpen || !campaign) return null;

  const handleVaccineChange = (index: number, field: string, value: string) => {
    const newVaccines = [...formData.vaccines];
    newVaccines[index] = { ...newVaccines[index], [field]: value };
    setFormData({ ...formData, vaccines: newVaccines });
  };

  const handleAddVaccine = () => {
    if (vaccines.length === 0) return;
    setFormData({
      ...formData,
      vaccines: [...formData.vaccines, { vaccineId: vaccines[0].id, totalAllocated: 0 }]
    });
  };

  const handleRemoveVaccine = (index: number) => {
    const newVaccines = formData.vaccines.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, vaccines: newVaccines });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/vaccination/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_campaign',
          data: formData
        })
      });
      if (!res.ok) throw new Error('Update failed');
      onSuccess();
      onClose();
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật đợt tiêm');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
            Sửa Đợt tiêm chủng
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tên chiến dịch / Đợt tiêm <span className="text-red-500">*</span></label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full text-sm px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Các loại vắc xin trong đợt này <span className="text-red-500">*</span></label>
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {formData.vaccines.map((cv: any, idx: number) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <select required value={cv.vaccineId} onChange={e => handleVaccineChange(idx, 'vaccineId', e.target.value)} className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white">
                        {vaccines.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                      </select>
                    </div>
                    <div className="flex-1">
                      <input required type="number" min="1" value={cv.totalAllocated} onChange={e => handleVaccineChange(idx, 'totalAllocated', e.target.value)} className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" placeholder="Số lượng mũi cấp..." />
                    </div>
                    {formData.vaccines.length > 1 && (
                      <button type="button" onClick={() => handleRemoveVaccine(idx)} className="mt-1 p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={handleAddVaccine} className="text-sm text-indigo-600 font-medium flex items-center gap-1 hover:text-indigo-700 mt-2">
                  <Plus className="w-4 h-4" /> Thêm loại vắc xin
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ngày bắt đầu <span className="text-red-500">*</span></label>
                <input required type="date" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full text-sm px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ngày kết thúc <span className="text-red-500">*</span></label>
                <input required type="date" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full text-sm px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full text-sm px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                <option value="active">Đang diễn ra</option>
                <option value="completed">Đã kết thúc</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                Hủy
              </button>
              <button type="submit" disabled={loading} className="px-6 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-colors disabled:opacity-50">
                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
