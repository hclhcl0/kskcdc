import { HealthReport, DashboardStats, GroupStat, StatKey, StatProgress, UnitProgress, ProgressDashboard } from './types';
import { getBenchmarks } from './benchmarks';
import { ACCOUNTS } from './accounts';
import { UNIT_TO_FACILITY } from './facilities';

// =========================================================
// In-memory data store (replaces a real database)
// Replace this with Prisma calls when ready
// =========================================================

const GROUP_DEFINITIONS: Omit<GroupStat, 'total'>[] = [
  {
    label: 'Người cao tuổi',
    shortLabel: 'Cao tuổi',
    key: 'nguoi_cao_tuoi',
    color: '#3b82f6',
  },
  {
    label: 'Người khuyết tật',
    shortLabel: 'Khuyết tật',
    key: 'nguoi_khuyet_tat',
    color: '#8b5cf6',
  },
  {
    label: 'Hộ nghèo',
    shortLabel: 'Hộ nghèo',
    key: 'ho_ngheo',
    color: '#f59e0b',
  },
  {
    label: 'Hộ cận nghèo',
    shortLabel: 'Cận nghèo',
    key: 'ho_can_ngheo',
    color: '#f97316',
  },
  {
    label: 'Người có công',
    shortLabel: 'Có công',
    key: 'nguoi_co_cong',
    color: '#10b981',
  },
  {
    label: 'Vùng khó khăn / DTTS',
    shortLabel: 'Vùng khó',
    key: 'vung_kho_khan',
    color: '#06b6d4',
  },
  {
    label: 'Trẻ em dưới 6 tuổi',
    shortLabel: 'Trẻ < 6T',
    key: 'tre_em_duoi_6_tuoi',
    color: '#ec4899',
  },
];

// Module-level store
let reportsStore: HealthReport[] = [];

export function getAllReports(): HealthReport[] {
  return [...reportsStore].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function getReportById(id: string): HealthReport | undefined {
  return reportsStore.find((r) => r.id === id);
}

export function addReport(report: HealthReport): HealthReport {
  reportsStore.push(report);
  return report;
}

export function deleteReport(id: string): boolean {
  const initialLength = reportsStore.length;
  reportsStore = reportsStore.filter(r => r.id !== id);
  return reportsStore.length < initialLength;
}

export function updateReport(id: string, updates: Partial<HealthReport>): HealthReport | null {
  const idx = reportsStore.findIndex(r => r.id === id);
  if (idx !== -1) {
    reportsStore[idx] = { ...reportsStore[idx], ...updates };
    return reportsStore[idx];
  }
  return null;
}

export function getDashboardStats(): DashboardStats {
  const reports = getAllReports();

  const totalExaminations = reports.reduce((sum, r) => {
    return (
      sum +
      r.nguoi_cao_tuoi +
      r.nguoi_khuyet_tat +
      r.ho_ngheo +
      r.ho_can_ngheo +
      r.nguoi_co_cong +
      r.vung_kho_khan +
      r.tre_em_duoi_6_tuoi
    );
  }, 0);

  const uniqueUnits = new Set(reports.map((r) => r.don_vi)).size;

  const groupTotals: GroupStat[] = GROUP_DEFINITIONS.map((def) => ({
    ...def,
    total: reports.reduce((sum, r) => sum + r[def.key], 0),
  }));

  // Aggregate by unit
  const unitMap = new Map<
    string,
    { don_vi: string; co_so_y_te: string; ngay_kham: string; total: number; reportCount: number }
  >();

  for (const r of reports) {
    const existing = unitMap.get(r.don_vi);
    const rowTotal =
      r.nguoi_cao_tuoi +
      r.nguoi_khuyet_tat +
      r.ho_ngheo +
      r.ho_can_ngheo +
      r.nguoi_co_cong +
      r.vung_kho_khan +
      r.tre_em_duoi_6_tuoi;

    if (existing) {
      existing.total += rowTotal;
      existing.reportCount += 1;
    } else {
      unitMap.set(r.don_vi, {
        don_vi: r.don_vi,
        co_so_y_te: r.co_so_y_te,
        ngay_kham: r.ngay_kham,
        total: rowTotal,
        reportCount: 1,
      });
    }
  }

  const reportsByUnit = Array.from(unitMap.values()).sort((a, b) => b.total - a.total);

  return {
    totalReports: reports.length,
    totalExaminations,
    uniqueUnits,
    groupTotals,
    reportsByUnit,
  };
}

export { GROUP_DEFINITIONS };

// ─── Benchmark Progress ──────────────────────────────────────────────────────

const STAT_META: { key: StatKey; label: string; icon: string }[] = [
  { key: 'nguoi_cao_tuoi',    label: 'Người cao tuổi',         icon: '👴' },
  { key: 'nguoi_khuyet_tat',  label: 'Người khuyết tật',       icon: '♿' },
  { key: 'ho_ngheo',          label: 'Hộ nghèo',               icon: '🏠' },
  { key: 'ho_can_ngheo',      label: 'Hộ cận nghèo',           icon: '🏡' },
  { key: 'nguoi_co_cong',     label: 'Người có công',          icon: '⭐' },
  { key: 'vung_kho_khan',     label: 'Vùng khó khăn / DTTS',   icon: '🏔️' },
  { key: 'tre_em_duoi_6_tuoi',label: 'Trẻ em dưới 6 tuổi',    icon: '👶' },
];

export function getProgressDashboard(): ProgressDashboard {
  const reports = getAllReports();
  const benchmarks = getBenchmarks();

  // Gom báo cáo theo đơn vị → cộng gộp tất cả
  const achievedMap = new Map<string, {
    achieved: Record<StatKey, number>;
    reportCount: number;
    lastDate: string;
    co_so_y_te: string;
  }>();

  for (const r of reports) {
    const existing = achievedMap.get(r.don_vi);
    const current: Record<StatKey, number> = {
      nguoi_cao_tuoi:    r.nguoi_cao_tuoi,
      nguoi_khuyet_tat:  r.nguoi_khuyet_tat,
      ho_ngheo:          r.ho_ngheo,
      ho_can_ngheo:      r.ho_can_ngheo,
      nguoi_co_cong:     r.nguoi_co_cong,
      vung_kho_khan:     r.vung_kho_khan,
      tre_em_duoi_6_tuoi: r.tre_em_duoi_6_tuoi,
    };
    if (existing) {
      for (const k of Object.keys(current) as StatKey[]) {
        existing.achieved[k] += current[k];
      }
      existing.reportCount += 1;
      if (r.ngay_kham > existing.lastDate) existing.lastDate = r.ngay_kham;
    } else {
      achievedMap.set(r.don_vi, {
        achieved: { ...current },
        reportCount: 1,
        lastDate: r.ngay_kham,
        co_so_y_te: r.co_so_y_te,
      });
    }
  }

  // Lấy tất cả tên đơn vị từ accounts (93 đơn vị)
  const allUnitNames = ACCOUNTS
    .filter((a) => a.role === 'unit')
    .map((a) => a.displayName);

  const unitsNoBenchmark: string[] = [];
  const unitsWith0Reports: string[] = [];

  const units: UnitProgress[] = benchmarks.map((bm) => {
    const unitData = achievedMap.get(bm.don_vi);
    if (!unitData) unitsWith0Reports.push(bm.don_vi);

    const stats: StatProgress[] = STAT_META.map(({ key, label, icon }) => {
      const achieved = unitData?.achieved[key] ?? 0;
      const target = bm[key];
      let pct: number | null = null;
      if (target !== null && target > 0) {
        pct = Math.min(100, Math.round((achieved / target) * 100));
      }
      return { key, label, icon, achieved, target, pct };
    });

    // % trung bình chỉ tính những chỉ tiêu đã có target > 0
    const validStats = stats.filter((s) => s.pct !== null);
    const overallPct = validStats.length > 0
      ? Math.round(validStats.reduce((sum, s) => sum + (s.pct ?? 0), 0) / validStats.length)
      : null;

    if (overallPct === null && validStats.length === 0) {
      unitsNoBenchmark.push(bm.don_vi);
    }

    return {
      don_vi: bm.don_vi,
      co_so_y_te: unitData?.co_so_y_te ?? UNIT_TO_FACILITY[bm.don_vi] ?? '',
      reportCount: unitData?.reportCount ?? 0,
      lastReportDate: unitData?.lastDate ?? '',
      stats,
      overallPct,
    };
  });

  // Sắp xếp: đơn vị có báo cáo lên trước, rồi theo % giảm dần
  units.sort((a, b) => {
    if (a.reportCount > 0 && b.reportCount === 0) return -1;
    if (a.reportCount === 0 && b.reportCount > 0) return 1;
    return (b.overallPct ?? -1) - (a.overallPct ?? -1);
  });

  const validSystem = units.filter((u) => u.overallPct !== null);
  const systemOverallPct = validSystem.length > 0
    ? Math.round(validSystem.reduce((sum, u) => sum + (u.overallPct ?? 0), 0) / validSystem.length)
    : null;

  return { units, systemOverallPct, unitsWith0Reports, unitsNoBenchmark };
}
