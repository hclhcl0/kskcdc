# Hướng Dẫn Tối Ưu Hóa & Cấu Hình Máy Chủ Coolify (Proxmox VM)

Tài liệu này lưu lại toàn bộ các bước thiết lập hệ thống, cấu hình mạng và tối ưu hiệu năng đã thực hiện trên máy chủ ảo Ubuntu (chạy Coolify) trên nền tảng Proxmox VE. Bạn có thể sử dụng tài liệu này để tự triển khai lại từ đầu khi dựng máy chủ mới.

---

## 1. Sửa Lỗi Hiển Thị RAM Ảo (Cài QEMU Guest Agent)

**Mô tả:** Mặc định Proxmox không đọc được lượng RAM thực tế sử dụng mà cộng gộp cả bộ đệm (disk cache) dẫn đến báo ảo (ví dụ 10GB thay vì 2GB thực tế).

### Bước 1: Chạy lệnh cài đặt bên trong máy ảo
Truy cập SSH vào máy ảo chạy lệnh:
```bash
sudo apt update && sudo apt install -y qemu-guest-agent
sudo systemctl enable --now qemu-guest-agent
```

### Bước 2: Cấu hình trên giao diện Proxmox VE
1. **Tắt hẳn** máy ảo (Shutdown).
2. Chọn máy ảo > Vào tab **Options** (Tùy chọn).
3. Click đúp vào **QEMU Guest Agent** -> tích chọn **Enabled** (Kích hoạt).
4. Bật lại máy ảo (Start).

---

## 2. Cấu hình IP Tĩnh (Static IP) bằng Netplan

**Mô tả:** Tránh việc router cấp lại IP mới làm sập các kết nối tên miền (Domain) và SSH.

### Bước 1: Khóa tính năng tự động ghi đè mạng của Cloud-Init
```bash
echo "network: {config: disabled}" | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
```

### Bước 2: Tạo cấu hình Netplan mới
Xóa file cấu hình tự động cũ (nếu có) và tạo file cấu hình tĩnh mới:
```bash
sudo rm -f /etc/netplan/50-cloud-init.yaml
```

Tạo file `/etc/netplan/99-static.yaml` với nội dung (thay thế IP `172.16.3.28/22` và gateway `172.16.0.1` tương ứng với dải mạng của bạn):
```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    ens18:
      dhcp4: false
      addresses: [172.16.3.28/22]
      routes:
        - to: default
          via: 172.16.0.1
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
```

### Bước 3: Phân quyền bảo mật và Áp dụng cấu hình
```bash
sudo chmod 600 /etc/netplan/99-static.yaml
sudo netplan apply
```

---

## 3. Kích Hoạt Console SPICE & xterm.js trên Proxmox

**Mô tả:** Giúp giao diện Console trên Proxmox mượt mà hơn, hỗ trợ copy-paste (SPICE) và giao diện dòng lệnh gọn nhẹ (xterm.js) trực tiếp từ trình duyệt.

### Bước 1: Cấu hình hệ điều hành bên trong máy ảo
Chạy lệnh SSH:
```bash
# Cài đặt Driver hỗ trợ hiển thị mượt cho SPICE
sudo apt install -y spice-vdagent

# Cấu hình GRUB xuất luồng console qua cổng Serial (ttyS0) cho xterm.js
sudo sed -i 's/^GRUB_CMDLINE_LINUX_DEFAULT=.*/GRUB_CMDLINE_LINUX_DEFAULT="quiet console=tty0 console=ttyS0,115200"/' /etc/default/grub
grep -q "^GRUB_TERMINAL=" /etc/default/grub || echo 'GRUB_TERMINAL="serial console"' | sudo tee -a /etc/default/grub
grep -q "^GRUB_SERIAL_COMMAND=" /etc/default/grub || echo 'GRUB_SERIAL_COMMAND="serial --speed=115200 --unit=0 --word=8 --parity=no --stop=1"' | sudo tee -a /etc/default/grub

# Cập nhật cấu hình khởi động
sudo update-grub

# Bật dịch vụ lắng nghe cổng Serial
sudo systemctl enable --now serial-getty@ttyS0.service
```

### Bước 2: Cấu hình phần cứng trên Proxmox VE
1. **Tắt hẳn** máy ảo (Shutdown).
2. Vào tab **Hardware** (Phần cứng) của máy ảo:
   * **Bật SPICE:** Click đúp vào **Display** -> Chọn cấu hình là **SPICE (qxl)**.
   * **Bật xterm.js:** Nhấp vào nút **Add** (Thêm) -> Chọn **Serial Port** (Cổng nối tiếp) -> Chọn ID là `0` và lưu lại.
3. Bật lại máy ảo (Start). Lúc này thanh menu *Console* trên Proxmox sẽ mở khóa toàn bộ các chế độ điều khiển cao cấp.

---

## 4. Thiết Lập Múi Giờ Việt Nam (GMT+7)

**Mô tả:** Đảm bảo thời gian ghi nhận lịch sử Log của Docker, hệ thống backup tự động của Coolify và dữ liệu trong Database chạy chuẩn xác theo giờ Việt Nam.

```bash
sudo timedatectl set-timezone Asia/Ho_Chi_Minh
```

Để kiểm tra lại thời gian hiện tại của hệ thống:
```bash
date
```

---

## 5. Tăng Tốc Mạng Bằng Thuật Toán TCP BBR của Google

**Mô tả:** Giúp máy chủ tối ưu hóa việc phân phối gói tin mạng, giảm độ trễ (ping) và tăng băng thông truyền dữ liệu đi xa, khắc phục tình trạng mạng chập chờn khi người dùng dùng 4G/Wifi.

### Bước 1: Kích hoạt cấu hình BBR
```bash
echo "net.core.default_qdisc=fq" | sudo tee /etc/sysctl.d/99-bbr.conf
echo "net.ipv4.tcp_congestion_control=bbr" | sudo tee -a /etc/sysctl.d/99-bbr.conf
```

### Bước 2: Áp dụng cấu hình ngay lập tức mà không cần reboot
```bash
sudo sysctl -p /etc/sysctl.d/99-bbr.conf
```

### Bước 3: Xác nhận thuật toán đã hoạt động
Chạy lệnh sau:
```bash
sysctl net.ipv4.tcp_congestion_control
```
Kết quả trả về hiển thị `net.ipv4.tcp_congestion_control = bbr` là thành công.
