import { prisma } from './prisma';

export interface BenchmarkRecord {
  don_vi: string;
  nguoi_cao_tuoi: number | null;
  nguoi_khuyet_tat: number | null;
  ho_ngheo: number | null;
  ho_can_ngheo: number | null;
  nguoi_co_cong: number | null;
  vung_kho_khan: number | null;
  tre_em_duoi_6_tuoi: number | null;
}

export async function getBenchmarks(): Promise<BenchmarkRecord[]> {
  const rows = await prisma.benchmark.findMany({
    orderBy: { don_vi: 'asc' },
  });
  return rows.map((r) => ({
    don_vi: r.don_vi,
    nguoi_cao_tuoi: r.nguoi_cao_tuoi,
    nguoi_khuyet_tat: r.nguoi_khuyet_tat,
    ho_ngheo: r.ho_ngheo,
    ho_can_ngheo: r.ho_can_ngheo,
    nguoi_co_cong: r.nguoi_co_cong,
    vung_kho_khan: r.vung_kho_khan,
    tre_em_duoi_6_tuoi: r.tre_em_duoi_6_tuoi,
  }));
}

export async function getBenchmarkByUnit(don_vi: string): Promise<BenchmarkRecord | null> {
  const row = await prisma.benchmark.findUnique({ where: { don_vi } });
  return row ?? null;
}

export async function upsertBenchmark(
  don_vi: string,
  updates: Partial<Omit<BenchmarkRecord, 'don_vi'>>
): Promise<BenchmarkRecord> {
  const row = await prisma.benchmark.upsert({
    where: { don_vi },
    create: { don_vi, ...updates },
    update: { ...updates },
  });
  return {
    don_vi: row.don_vi,
    nguoi_cao_tuoi: row.nguoi_cao_tuoi,
    nguoi_khuyet_tat: row.nguoi_khuyet_tat,
    ho_ngheo: row.ho_ngheo,
    ho_can_ngheo: row.ho_can_ngheo,
    nguoi_co_cong: row.nguoi_co_cong,
    vung_kho_khan: row.vung_kho_khan,
    tre_em_duoi_6_tuoi: row.tre_em_duoi_6_tuoi,
  };
}
