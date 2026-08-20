/**
 * Initial Mock Data for SMK DIPONEGORO CIPARI
 */
const DEFAULT_SCHOOL_DATA = {
  info: {
    name: "SMK DIPONEGORO CIPARI",
    npsn: "20307891",
    address: "Jl. Raya Cipari No. 45, Kecamatan Cipari, Kabupaten Cilacap, Jawa Tengah 53262",
    phone: "(0280) 626123",
    email: "info@smkdiponegorocipari.sch.id",
    website: "https://smkdiponegorocipari.sch.id",
    principal: "Drs. H. Ahmad Masruhin, M.Pd.",
    accreditation: "A (Unggul)",
    academicYear: "2025/2026",
    currentSemester: "Ganjil"
  },

  majors: [
    { id: "TKJ", name: "Teknik Komputer & Jaringan", code: "TKJ", color: "#3b82f6", head: "Budi Santoso, S.T." },
    { id: "TKR", name: "Teknik Kendaraan Ringan Automotive", code: "TKR", color: "#ef4444", head: "Heri Prasetyo, S.Pd." },
    { id: "AKL", name: "Akuntansi & Keuangan Lembaga", code: "AKL", color: "#10b981", head: "Siti Nurhaliza, S.E." },
    { id: "OTKP", name: "Otomatisasi & Tata Kelola Perkantoran", code: "OTKP", color: "#8b5cf6", head: "Endang Rahayu, M.Pd." },
    { id: "TSM", name: "Teknik Sepeda Motor", code: "TSM", color: "#f59e0b", head: "Agus Setiawan, S.T." }
  ],

  teachers: [
    { id: "G001", nip: "197805122005011002", name: "Drs. H. Ahmad Masruhin, M.Pd.", gender: "L", subject: "Pendidikan Agama Islam", phone: "081234567801", email: "ahmad.masruhin@smkdiponegoro.sch.id", status: "PNS", classTutor: "-" },
    { id: "G002", nip: "198203152009021004", name: "Budi Santoso, S.T.", gender: "L", subject: "Komputer & Jaringan Dasar", phone: "081234567802", email: "budi.santoso@smkdiponegoro.sch.id", status: "PNS", classTutor: "XII TKJ 1" },
    { id: "G003", nip: "198511202010012008", name: "Siti Nurhaliza, S.E.", gender: "P", subject: "Akuntansi Dasar", phone: "081234567803", email: "siti.nurhaliza@smkdiponegoro.sch.id", status: "PNS", classTutor: "XI AKL 1" },
    { id: "G004", nip: "199004102015031002", name: "Heri Prasetyo, S.Pd.", gender: "L", subject: "Pemeliharaan Mesin Kendaraan", phone: "081234567804", email: "heri.prasetyo@smkdiponegoro.sch.id", status: "GTT", classTutor: "XII TKR 1" },
    { id: "G005", nip: "199208052019032011", name: "Endang Rahayu, M.Pd.", gender: "P", subject: "Kearsipan & Perkantoran", phone: "081234567805", email: "endang.rahayu@smkdiponegoro.sch.id", status: "PNS", classTutor: "X OTKP 1" },
    { id: "G006", nip: "199401122020121005", name: "Agus Setiawan, S.T.", gender: "L", subject: "Pemeliharaan Mesin Sepeda Motor", phone: "081234567806", email: "agus.setiawan@smkdiponegoro.sch.id", status: "GTT", classTutor: "XI TSM 1" },
    { id: "G007", nip: "198806222014022003", name: "Rina Wijaya, S.Pd.", gender: "P", subject: "Bahasa Inggris", phone: "081234567807", email: "rina.wijaya@smkdiponegoro.sch.id", status: "PNS", classTutor: "X TKJ 1" },
    { id: "G008", nip: "199103302018011006", name: "Fajar Nugroho, M.Kom.", gender: "L", subject: "Pemrograman Web & Perangkat Bergerak", phone: "081234567808", email: "fajar.nugroho@smkdiponegoro.sch.id", status: "GTT", classTutor: "XI TKJ 1" },
    { id: "G009", nip: "198709142012032001", name: "Dewi Lestari, S.Pd.", gender: "P", subject: "Matematika", phone: "081234567809", email: "dewi.lestari@smkdiponegoro.sch.id", status: "PNS", classTutor: "X TKR 1" },
    { id: "G010", nip: "199507182022011003", name: "Muhammad Rizki, S.Pd.", gender: "L", subject: "Pendidikan Jasmani & Olahraga", phone: "081234567810", email: "m.rizki@smkdiponegoro.sch.id", status: "GTT", classTutor: "-" }
  ],

  students: [
    { id: "S001", nisn: "0061234561", name: "Aditya Pratama", gender: "L", grade: "XII", major: "TKJ", className: "XII TKJ 1", status: "Aktif", phone: "085711112221", address: "Desa Cipari RT 02 RW 01" },
    { id: "S002", nisn: "0061234562", name: "Anisa Rahmawati", gender: "P", grade: "XII", major: "TKJ", className: "XII TKJ 1", status: "Aktif", phone: "085711112222", address: "Desa Cisuru RT 01 RW 03" },
    { id: "S003", nisn: "0061234563", name: "Bagus Setiawan", gender: "L", grade: "XII", major: "TKR", className: "XII TKR 1", status: "Aktif", phone: "085711112223", address: "Desa Caruy RT 04 RW 02" },
    { id: "S004", nisn: "0061234564", name: "Citra Dewi", gender: "P", grade: "XII", major: "AKL", className: "XII AKL 1", status: "Aktif", phone: "085711112224", address: "Desa Pegadingan RT 03 RW 01" },
    { id: "S005", nisn: "0061234565", name: "Dimas Anggara", gender: "L", grade: "XII", major: "TSM", className: "XII TSM 1", status: "Aktif", phone: "085711112225", address: "Desa Serang RT 02 RW 04" },
    { id: "S006", nisn: "0071234566", name: "Deni Kurniawan", gender: "L", grade: "XI", major: "TKJ", className: "XI TKJ 1", status: "Aktif", phone: "085711112226", address: "Desa Kutasari RT 01 RW 02" },
    { id: "S007", nisn: "0071234567", name: "Eka Putri Lestari", gender: "P", grade: "XI", major: "AKL", className: "XI AKL 1", status: "Aktif", phone: "085711112227", address: "Desa Cipari RT 05 RW 02" },
    { id: "S008", nisn: "0071234568", name: "Fajar Hidayat", gender: "L", grade: "XI", major: "TKR", className: "XI TKR 1", status: "Aktif", phone: "085711112228", address: "Desa Cisuru RT 03 RW 01" },
    { id: "S009", nisn: "0071234569", name: "Gita Gutawa", gender: "P", grade: "XI", major: "OTKP", className: "XI OTKP 1", status: "Aktif", phone: "085711112229", address: "Desa Mekarsari RT 02 RW 03" },
    { id: "S010", nisn: "0071234570", name: "Hendra Wijaya", gender: "L", grade: "XI", major: "TSM", className: "XI TSM 1", status: "Aktif", phone: "085711112230", address: "Desa Caruy RT 01 RW 01" },
    { id: "S011", nisn: "0081234571", name: "Indah Permata", gender: "P", grade: "X", major: "TKJ", className: "X TKJ 1", status: "Aktif", phone: "085711112231", address: "Desa Cipari RT 03 RW 03" },
    { id: "S012", nisn: "0081234572", name: "Joko Susilo", gender: "L", grade: "X", major: "TKR", className: "X TKR 1", status: "Aktif", phone: "085711112232", address: "Desa Pegadingan RT 01 RW 02" },
    { id: "S013", nisn: "0081234573", name: "Kania Kartika", gender: "P", grade: "X", major: "OTKP", className: "X OTKP 1", status: "Aktif", phone: "085711112233", address: "Desa Cisuru RT 02 RW 02" },
    { id: "S014", nisn: "0081234574", name: "Lukman Hakim", gender: "L", grade: "X", major: "TSM", className: "X TSM 1", status: "Aktif", phone: "085711112234", address: "Desa Serang RT 03 RW 01" },
    { id: "S015", nisn: "0081234575", name: "Maya Saphira", gender: "P", grade: "X", major: "AKL", className: "X AKL 1", status: "Aktif", phone: "085711112235", address: "Desa Kutasari RT 04 RW 03" }
  ],

  classes: [
    { id: "X-TKJ-1", name: "X TKJ 1", grade: "X", major: "TKJ", room: "Lab Komputer 1", tutor: "Rina Wijaya, S.Pd.", totalStudents: 32 },
    { id: "X-TKR-1", name: "X TKR 1", grade: "X", major: "TKR", room: "Bengkel Otomotif A", tutor: "Dewi Lestari, S.Pd.", totalStudents: 34 },
    { id: "X-AKL-1", name: "X AKL 1", grade: "X", major: "AKL", room: "Ruang 103", tutor: "Siti Nurhaliza, S.E.", totalStudents: 30 },
    { id: "X-OTKP-1", name: "X OTKP 1", grade: "X", major: "OTKP", room: "Ruang 104", tutor: "Endang Rahayu, M.Pd.", totalStudents: 31 },
    { id: "XI-TKJ-1", name: "XI TKJ 1", grade: "XI", major: "TKJ", room: "Lab Komputer 2", tutor: "Fajar Nugroho, M.Kom.", totalStudents: 33 },
    { id: "XI-TKR-1", name: "XI TKR 1", grade: "XI", major: "TKR", room: "Bengkel Otomotif B", tutor: "Heri Prasetyo, S.Pd.", totalStudents: 35 },
    { id: "XI-TSM-1", name: "XI TSM 1", grade: "XI", major: "TSM", room: "Bengkel Sepeda Motor", tutor: "Agus Setiawan, S.T.", totalStudents: 32 },
    { id: "XII-TKJ-1", name: "XII TKJ 1", grade: "XII", major: "TKJ", room: "Lab Jaringan", tutor: "Budi Santoso, S.T.", totalStudents: 34 }
  ],

  sppPayments: [
    { id: "SPP-1001", studentId: "S001", studentName: "Aditya Pratama", className: "XII TKJ 1", month: "Juli 2025", amount: 150000, status: "Lunas", paymentDate: "2025-07-10", receiptNo: "KW-202507-001" },
    { id: "SPP-1002", studentId: "S001", studentName: "Aditya Pratama", className: "XII TKJ 1", month: "Agustus 2025", amount: 150000, status: "Lunas", paymentDate: "2025-08-08", receiptNo: "KW-202508-014" },
    { id: "SPP-1003", studentId: "S002", studentName: "Anisa Rahmawati", className: "XII TKJ 1", month: "Juli 2025", amount: 150000, status: "Lunas", paymentDate: "2025-07-12", receiptNo: "KW-202507-005" },
    { id: "SPP-1004", studentId: "S002", studentName: "Anisa Rahmawati", className: "XII TKJ 1", month: "Agustus 2025", amount: 150000, status: "Belum Lunas", paymentDate: "-", receiptNo: "-" },
    { id: "SPP-1005", studentId: "S003", studentName: "Bagus Setiawan", className: "XII TKR 1", month: "Agustus 2025", amount: 150000, status: "Lunas", paymentDate: "2025-08-15", receiptNo: "KW-202508-032" },
    { id: "SPP-1006", studentId: "S004", studentName: "Citra Dewi", className: "XII AKL 1", month: "Agustus 2025", amount: 150000, status: "Lunas", paymentDate: "2025-08-05", receiptNo: "KW-202508-002" },
    { id: "SPP-1007", studentId: "S006", studentName: "Deni Kurniawan", className: "XI TKJ 1", month: "Agustus 2025", amount: 150000, status: "Belum Lunas", paymentDate: "-", receiptNo: "-" },
    { id: "SPP-1008", studentId: "S007", studentName: "Eka Putri Lestari", className: "XI AKL 1", month: "Agustus 2025", amount: 150000, status: "Lunas", paymentDate: "2025-08-11", receiptNo: "KW-202508-019" }
  ],

  attendanceToday: [
    { studentId: "S001", studentName: "Aditya Pratama", className: "XII TKJ 1", status: "Hadir", note: "" },
    { studentId: "S002", studentName: "Anisa Rahmawati", className: "XII TKJ 1", status: "Hadir", note: "" },
    { studentId: "S003", studentName: "Bagus Setiawan", className: "XII TKR 1", status: "Izin", note: "Acara keluarga" },
    { studentId: "S004", studentName: "Citra Dewi", className: "XII AKL 1", status: "Hadir", note: "" },
    { studentId: "S005", studentName: "Dimas Anggara", className: "XII TSM 1", status: "Sakit", note: "Surat Dokter" },
    { studentId: "S006", studentName: "Deni Kurniawan", className: "XI TKJ 1", status: "Hadir", note: "" },
    { studentId: "S007", studentName: "Eka Putri Lestari", className: "XI AKL 1", status: "Hadir", note: "" },
    { studentId: "S008", studentName: "Fajar Hidayat", className: "XI TKR 1", status: "Alpa", note: "Tanpa Keterangan" }
  ],

  grades: [
    { studentId: "S001", studentName: "Aditya Pratama", className: "XII TKJ 1", subject: "Komputer & Jaringan Dasar", tugas: 88, uts: 85, uas: 90, finalGrade: 88, predicate: "A" },
    { studentId: "S001", studentName: "Aditya Pratama", className: "XII TKJ 1", subject: "Pemrograman Web", tugas: 92, uts: 88, uas: 94, finalGrade: 92, predicate: "A" },
    { studentId: "S001", studentName: "Aditya Pratama", className: "XII TKJ 1", subject: "Bahasa Inggris", tugas: 80, uts: 78, uas: 82, finalGrade: 80, predicate: "B" },
    { studentId: "S002", studentName: "Anisa Rahmawati", className: "XII TKJ 1", subject: "Komputer & Jaringan Dasar", tugas: 90, uts: 92, uas: 95, finalGrade: 93, predicate: "A" },
    { studentId: "S003", studentName: "Bagus Setiawan", className: "XII TKR 1", subject: "Pemeliharaan Mesin Kendaraan", tugas: 85, uts: 82, uas: 88, finalGrade: 85, predicate: "B" },
    { studentId: "S004", studentName: "Citra Dewi", className: "XII AKL 1", subject: "Akuntansi Dasar", tugas: 95, uts: 94, uas: 96, finalGrade: 95, predicate: "A" }
  ],

  announcements: [
    { id: "A01", title: "Pendaftaran Asesmen Nasional Berbasis Komputer (ANBK)", date: "2025-08-18", category: "Akademik", author: "Waka Kurikulum", content: "Diberitahukan kepada seluruh siswa kelas XI bahwa persiapan ANBK akan dilaksanakan pekan depan di Lab Komputer 1 dan 2." },
    { id: "A02", title: "Pembayaran SPP Bulan Agustus 2025", date: "2025-08-10", category: "Keuangan", author: "Bendahara Sekolah", content: "Dihimbau kepada seluruh orang tua / wali murid untuk dapat menyelesaikaan administrasi SPP bulan Agustus paling lambat tanggal 20 Agustus 2025." },
    { id: "A03", title: "Kegiatan Ekstrakurikuler Pramuka & PMR", date: "2025-08-05", category: "Kesiswaan", author: "Waka Kesiswaan", content: "Kegiatan ekstrakurikuler rutin dilanjutkan kembali setiap hari Jumat sore pukul 15.00 WIB." }
  ],

  schedules: [
    { day: "Senin", time: "07:00 - 08:30", className: "XII TKJ 1", subject: "Komputer & Jaringan", teacher: "Budi Santoso, S.T.", room: "Lab Jaringan" },
    { day: "Senin", time: "08:30 - 10:00", className: "XII TKJ 1", subject: "Pemrograman Web", teacher: "Fajar Nugroho, M.Kom.", room: "Lab 2" },
    { day: "Senin", time: "10:15 - 11:45", className: "XII TKR 1", subject: "Pemeliharaan Mesin", teacher: "Heri Prasetyo, S.Pd.", room: "Bengkel A" },
    { day: "Selasa", time: "07:00 - 08:30", className: "XI AKL 1", subject: "Akuntansi Keuangan", teacher: "Siti Nurhaliza, S.E.", room: "Ruang 103" },
    { day: "Selasa", time: "08:30 - 10:00", className: "X OTKP 1", subject: "Kearsipan", teacher: "Endang Rahayu, M.Pd.", room: "Ruang 104" },
    { day: "Rabu", time: "07:00 - 08:30", className: "XI TSM 1", subject: "Mesin Sepeda Motor", teacher: "Agus Setiawan, S.T.", room: "Bengkel TSM" }
  ]
};
