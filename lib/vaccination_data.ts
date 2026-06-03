import { Vaccine, VaccineCampaign, VaccinationReport } from './types';
import { ACCOUNTS } from './accounts';

// Seed data
const MOCK_VACCINES: Vaccine[] = [];

const MOCK_CAMPAIGNS: VaccineCampaign[] = [];

// In-memory stores
let vaccinesStore = [...MOCK_VACCINES];
let campaignsStore = [...MOCK_CAMPAIGNS];
let vaccinationReportsStore: VaccinationReport[] = [];

// --- Vaccines API ---
export function getVaccines() {
  return [...vaccinesStore];
}

export function addVaccine(v: Omit<Vaccine, 'id'>) {
  const newV: Vaccine = { ...v, id: `v${Date.now()}` };
  vaccinesStore.push(newV);
  return newV;
}

export function deleteVaccine(id: string) {
  vaccinesStore = vaccinesStore.filter(v => v.id !== id);
}

// --- Campaigns API ---
export function getCampaigns() {
  return [...campaignsStore].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
}

export function getCampaignById(id: string) {
  return campaignsStore.find(c => c.id === id);
}

export function addCampaign(c: Omit<VaccineCampaign, 'id'>) {
  const newC: VaccineCampaign = { ...c, id: `c${Date.now()}` };
  campaignsStore.push(newC);
  return newC;
}

export function updateCampaign(id: string, updates: Partial<VaccineCampaign>) {
  const idx = campaignsStore.findIndex(c => c.id === id);
  if (idx !== -1) {
    campaignsStore[idx] = { ...campaignsStore[idx], ...updates };
    return campaignsStore[idx];
  }
  return null;
}

export function deleteCampaign(id: string) {
  campaignsStore = campaignsStore.filter(c => c.id !== id);
  // Also delete associated reports
  vaccinationReportsStore = vaccinationReportsStore.filter(r => r.campaignId !== id);
}

// --- Reports API ---
export function getVaccinationReports(campaignId?: string) {
  let reports = [...vaccinationReportsStore];
  if (campaignId) {
    reports = reports.filter(r => r.campaignId === campaignId);
  }
  return reports.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function addVaccinationReport(r: Omit<VaccinationReport, 'id' | 'created_at'>) {
  const newR: VaccinationReport = { 
    ...r, 
    id: `vac-rep-${Date.now()}`,
    created_at: new Date().toISOString()
  };
  vaccinationReportsStore.push(newR);
  return newR;
}

export function deleteVaccinationReport(id: string): boolean {
  const initialLength = vaccinationReportsStore.length;
  vaccinationReportsStore = vaccinationReportsStore.filter(r => r.id !== id);
  return vaccinationReportsStore.length < initialLength;
}

export function updateVaccinationReport(id: string, updates: Partial<VaccinationReport>): VaccinationReport | null {
  const idx = vaccinationReportsStore.findIndex(r => r.id === id);
  if (idx !== -1) {
    vaccinationReportsStore[idx] = { ...vaccinationReportsStore[idx], ...updates };
    return vaccinationReportsStore[idx];
  }
  return null;
}
