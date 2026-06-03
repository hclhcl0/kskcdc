import { z } from 'zod';

export const healthReportSchema = z.object({
  don_vi: z
    .string()
    .min(1, 'Vui lòng nhập tên đơn vị báo cáo')
    .max(200, 'Tên đơn vị không được vượt quá 200 ký tự'),
  ngay_kham: z
    .string()
    .min(1, 'Vui lòng chọn ngày thực hiện khám'),
  co_so_y_te: z
    .string()
    .min(1, 'Vui lòng nhập cơ sở y tế phụ trách')
    .max(200, 'Tên cơ sở y tế không được vượt quá 200 ký tự'),
  nguoi_nop_bao_cao: z
    .string()
    .min(2, 'Vui lòng nhập họ và tên người nộp báo cáo')
    .max(100, 'Họ và tên không được vượt quá 100 ký tự'),
  nguoi_cao_tuoi: z
    .number({ message: 'Vui lòng nhập số hợp lệ' })
    .int('Phải là số nguyên')
    .min(0, 'Số liệu không được âm'),
  nguoi_khuyet_tat: z
    .number({ message: 'Vui lòng nhập số hợp lệ' })
    .int('Phải là số nguyên')
    .min(0, 'Số liệu không được âm'),
  ho_ngheo: z
    .number({ message: 'Vui lòng nhập số hợp lệ' })
    .int('Phải là số nguyên')
    .min(0, 'Số liệu không được âm'),
  ho_can_ngheo: z
    .number({ message: 'Vui lòng nhập số hợp lệ' })
    .int('Phải là số nguyên')
    .min(0, 'Số liệu không được âm'),
  nguoi_co_cong: z
    .number({ message: 'Vui lòng nhập số hợp lệ' })
    .int('Phải là số nguyên')
    .min(0, 'Số liệu không được âm'),
  vung_kho_khan: z
    .number({ message: 'Vui lòng nhập số hợp lệ' })
    .int('Phải là số nguyên')
    .min(0, 'Số liệu không được âm'),
  tre_em_duoi_6_tuoi: z
    .number({ message: 'Vui lòng nhập số hợp lệ' })
    .int('Phải là số nguyên')
    .min(0, 'Số liệu không được âm'),
});

export type HealthReportFormValues = z.infer<typeof healthReportSchema>;
