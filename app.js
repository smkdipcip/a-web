/**
 * SMK DIPONEGORO CIPARI - SCHOOL MANAGEMENT SYSTEM (SIMS) LOGIC
 */

// Global State
let schoolData = {};
let currentView = 'dashboard';
let attendanceChartInstance = null;
let majorsChartInstance = null;

// Helper: Format Currency to IDR
function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
}

// Helper: Show Toast Notification
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Initialize Application Data
function initDataStore() {
  const localData = localStorage.getItem('SMK_DIPONEGORO_DATA');
  if (localData) {
    try {
      schoolData = JSON.parse(localData);
    } catch (e) {
      console.error('Failed to parse localStorage data, restoring default data', e);
      schoolData = JSON.parse(JSON.stringify(DEFAULT_SCHOOL_DATA));
      saveDataStore();
    }
  } else {
    schoolData = JSON.parse(JSON.stringify(DEFAULT_SCHOOL_DATA));
    saveDataStore();
  }
}

function saveDataStore() {
  localStorage.setItem('SMK_DIPONEGORO_DATA', JSON.stringify(schoolData));
}

function resetDataStore() {
  if (confirm('Apakah Anda yakin ingin mengembalikan semua data ke sampel data awal? Data yang Anda ubah akan terhapus.')) {
    schoolData = JSON.parse(JSON.stringify(DEFAULT_SCHOOL_DATA));
    saveDataStore();
    showToast('Data berhasil di-reset ke sampel awal!');
    renderCurrentView();
  }
}

// View Routing & Navigation
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = item.getAttribute('data-view');
      if (targetView) {
        switchView(targetView);
      }
    });
  });

  // Theme Switcher Toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('SMK_THEME', newTheme);
      showToast(`Mode tampilan diubah ke ${newTheme.toUpperCase()}`);
    });
  }

  // Set initial stored theme
  const savedTheme = localStorage.getItem('SMK_THEME') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

function switchView(viewName) {
  currentView = viewName;
  
  // Update sidebar active link
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('data-view') === viewName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update content view visibility
  document.querySelectorAll('.view-section').forEach(section => {
    section.classList.remove('active');
  });

  const activeSection = document.getElementById(`view-${viewName}`);
  if (activeSection) {
    activeSection.classList.add('active');
  }

  // Update Top Navbar Title
  const titles = {
    dashboard: 'Dashboard Utama',
    siswa: 'Data Siswa & Keahlian',
    guru: 'Data Guru & Staf Pengajar',
    jadwal: 'Jadwal Pelajaran & Kelas',
    spp: 'Manajemen Keuangan & SPP',
    absensi: 'Rekap Absensi & Kehadiran',
    nilai: 'E-Rapor & Input Nilai',
    pengumuman: 'Pengumuman Sekolah',
    pengaturan: 'Pengaturan & Backup Data'
  };

  const pageTitleEl = document.getElementById('page-title');
  if (pageTitleEl) pageTitleEl.textContent = titles[viewName] || 'SMK Diponegoro Cipari';

  renderCurrentView();
}

function renderCurrentView() {
  switch (currentView) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'siswa':
      renderSiswaTable();
      break;
    case 'guru':
      renderGuruTable();
      break;
    case 'jadwal':
      renderJadwalView();
      break;
    case 'spp':
      renderSPPTable();
      break;
    case 'absensi':
      renderAbsensiView();
      break;
    case 'nilai':
      renderNilaiView();
      break;
    case 'pengumuman':
      renderPengumumanView();
      break;
    case 'pengaturan':
      renderSettingsView();
      break;
  }
}

/* =============================================================
   1. DASHBOARD VIEW RENDERER & CHARTS
   ============================================================= */
function renderDashboard() {
  // Update Count Metrics
  document.getElementById('stat-total-siswa').textContent = schoolData.students.length;
  document.getElementById('stat-total-guru').textContent = schoolData.teachers.length;
  document.getElementById('stat-total-kelas').textContent = schoolData.classes.length;

  // Attendance stats today
  const attendanceToday = schoolData.attendanceToday || [];
  const totalHadir = attendanceToday.filter(a => a.status === 'Hadir').length;
  const attendancePercent = attendanceToday.length > 0 ? Math.round((totalHadir / attendanceToday.length) * 100) : 100;
  document.getElementById('stat-absensi-today').textContent = `${attendancePercent}%`;

  // Render Charts
  renderDashboardCharts();

  // Render Recent Announcements Preview
  const annContainer = document.getElementById('dashboard-announcements-list');
  if (annContainer) {
    annContainer.innerHTML = schoolData.announcements.slice(0, 3).map(ann => `
      <div style="padding: 12px; background: rgba(15,23,42,0.4); border-radius: 8px; border-left: 3px solid var(--accent-green); margin-bottom: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <h4 style="font-size: 0.88rem; font-weight: 700;">${ann.title}</h4>
          <span style="font-size: 0.72rem; color: var(--text-muted);">${ann.date}</span>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-muted);">${ann.content.substring(0, 90)}...</p>
      </div>
    `).join('');
  }
}

function renderDashboardCharts() {
  // Chart 1: Attendance Distribution
  const ctxAttendance = document.getElementById('chartAttendance');
  if (ctxAttendance && typeof Chart !== 'undefined') {
    if (attendanceChartInstance) attendanceChartInstance.destroy();

    const counts = { Hadir: 0, Izin: 0, Sakit: 0, Alpa: 0 };
    (schoolData.attendanceToday || []).forEach(item => {
      if (counts[item.status] !== undefined) counts[item.status]++;
    });

    attendanceChartInstance = new Chart(ctxAttendance, {
      type: 'doughnut',
      data: {
        labels: ['Hadir', 'Izin', 'Sakit', 'Alpa'],
        datasets: [{
          data: [counts.Hadir, counts.Izin, counts.Sakit, counts.Alpa],
          backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#94a3b8' } }
        }
      }
    });
  }

  // Chart 2: Major Distribution
  const ctxMajors = document.getElementById('chartMajors');
  if (ctxMajors && typeof Chart !== 'undefined') {
    if (majorsChartInstance) majorsChartInstance.destroy();

    const majorCounts = {};
    schoolData.majors.forEach(m => majorCounts[m.code] = 0);
    schoolData.students.forEach(s => {
      if (majorCounts[s.major] !== undefined) majorCounts[s.major]++;
    });

    majorsChartInstance = new Chart(ctxMajors, {
      type: 'bar',
      data: {
        labels: Object.keys(majorCounts),
        datasets: [{
          label: 'Jumlah Siswa',
          data: Object.values(majorCounts),
          backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#8b5cf6', '#f59e0b'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }
}

/* =============================================================
   2. DATA SISWA MANAGEMENT
   ============================================================= */
function renderSiswaTable() {
  const tbody = document.getElementById('siswa-table-body');
  if (!tbody) return;

  const searchVal = (document.getElementById('search-siswa')?.value || '').toLowerCase();
  const filterMajor = document.getElementById('filter-siswa-major')?.value || 'ALL';
  const filterGrade = document.getElementById('filter-siswa-grade')?.value || 'ALL';

  const filtered = schoolData.students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchVal) || s.nisn.includes(searchVal) || s.className.toLowerCase().includes(searchVal);
    const matchMajor = filterMajor === 'ALL' || s.major === filterMajor;
    const matchGrade = filterGrade === 'ALL' || s.grade === filterGrade;
    return matchSearch && matchMajor && matchGrade;
  });

  tbody.innerHTML = filtered.map(s => `
    <tr>
      <td><strong>${s.nisn}</strong></td>
      <td>
        <div style="font-weight: 600;">${s.name}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${s.gender === 'L' ? 'Laki-laki' : 'Perempuan'} • ${s.phone || '-'}</div>
      </td>
      <td><span class="badge badge-info">${s.className}</span></td>
      <td><span class="badge badge-purple">${s.major}</span></td>
      <td>${s.address}</td>
      <td><span class="badge badge-success">${s.status}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="editSiswa('${s.id}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteSiswa('${s.id}')">Hapus</button>
      </td>
    </tr>
  `).join('');
}

function openModalAddSiswa() {
  document.getElementById('form-siswa-id').value = '';
  document.getElementById('form-siswa-nisn').value = '';
  document.getElementById('form-siswa-name').value = '';
  document.getElementById('form-siswa-gender').value = 'L';
  document.getElementById('form-siswa-grade').value = 'X';
  document.getElementById('form-siswa-major').value = 'TKJ';
  document.getElementById('form-siswa-class').value = 'X TKJ 1';
  document.getElementById('form-siswa-phone').value = '';
  document.getElementById('form-siswa-address').value = '';
  
  document.getElementById('modal-siswa-title').textContent = 'Tambah Data Siswa Baru';
  document.getElementById('modal-siswa').classList.add('active');
}

function editSiswa(id) {
  const siswa = schoolData.students.find(s => s.id === id);
  if (!siswa) return;

  document.getElementById('form-siswa-id').value = siswa.id;
  document.getElementById('form-siswa-nisn').value = siswa.nisn;
  document.getElementById('form-siswa-name').value = siswa.name;
  document.getElementById('form-siswa-gender').value = siswa.gender;
  document.getElementById('form-siswa-grade').value = siswa.grade;
  document.getElementById('form-siswa-major').value = siswa.major;
  document.getElementById('form-siswa-class').value = siswa.className;
  document.getElementById('form-siswa-phone').value = siswa.phone || '';
  document.getElementById('form-siswa-address').value = siswa.address || '';

  document.getElementById('modal-siswa-title').textContent = 'Edit Data Siswa';
  document.getElementById('modal-siswa').classList.add('active');
}

function saveSiswaForm(e) {
  if (e) e.preventDefault();
  const id = document.getElementById('form-siswa-id').value;
  const nisn = document.getElementById('form-siswa-nisn').value.trim();
  const name = document.getElementById('form-siswa-name').value.trim();
  const gender = document.getElementById('form-siswa-gender').value;
  const grade = document.getElementById('form-siswa-grade').value;
  const major = document.getElementById('form-siswa-major').value;
  const className = document.getElementById('form-siswa-class').value.trim();
  const phone = document.getElementById('form-siswa-phone').value.trim();
  const address = document.getElementById('form-siswa-address').value.trim();

  if (!nisn || !name) {
    alert('NISN dan Nama Siswa wajib diisi!');
    return;
  }

  if (id) {
    // Edit existing
    const idx = schoolData.students.findIndex(s => s.id === id);
    if (idx !== -1) {
      schoolData.students[idx] = { ...schoolData.students[idx], nisn, name, gender, grade, major, className, phone, address };
      showToast('Data Siswa berhasil diperbarui!');
    }
  } else {
    // Add new
    const newId = 'S' + String(schoolData.students.length + 1).padStart(3, '0');
    schoolData.students.push({ id: newId, nisn, name, gender, grade, major, className, status: 'Aktif', phone, address });
    showToast('Siswa baru berhasil ditambahkan!');
  }

  saveDataStore();
  closeModal('modal-siswa');
  renderSiswaTable();
}

function deleteSiswa(id) {
  if (confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
    schoolData.students = schoolData.students.filter(s => s.id !== id);
    saveDataStore();
    showToast('Data siswa telah dihapus.', 'warning');
    renderSiswaTable();
  }
}

/* =============================================================
   3. DATA GURU MANAGEMENT
   ============================================================= */
function renderGuruTable() {
  const tbody = document.getElementById('guru-table-body');
  if (!tbody) return;

  const searchVal = (document.getElementById('search-guru')?.value || '').toLowerCase();

  const filtered = schoolData.teachers.filter(g => {
    return g.name.toLowerCase().includes(searchVal) || g.nip.includes(searchVal) || g.subject.toLowerCase().includes(searchVal);
  });

  tbody.innerHTML = filtered.map(g => `
    <tr>
      <td><strong>${g.nip}</strong></td>
      <td>
        <div style="font-weight: 600;">${g.name}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">${g.email}</div>
      </td>
      <td><span class="badge badge-info">${g.subject}</span></td>
      <td>${g.classTutor !== '-' ? `<span class="badge badge-purple">${g.classTutor}</span>` : '-'}</td>
      <td>${g.phone}</td>
      <td><span class="badge badge-success">${g.status}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="editGuru('${g.id}')">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteGuru('${g.id}')">Hapus</button>
      </td>
    </tr>
  `).join('');
}

function openModalAddGuru() {
  document.getElementById('form-guru-id').value = '';
  document.getElementById('form-guru-nip').value = '';
  document.getElementById('form-guru-name').value = '';
  document.getElementById('form-guru-gender').value = 'L';
  document.getElementById('form-guru-subject').value = '';
  document.getElementById('form-guru-status').value = 'PNS';
  document.getElementById('form-guru-tutor').value = '-';
  document.getElementById('form-guru-phone').value = '';
  document.getElementById('form-guru-email').value = '';

  document.getElementById('modal-guru-title').textContent = 'Tambah Data Guru';
  document.getElementById('modal-guru').classList.add('active');
}

function editGuru(id) {
  const g = schoolData.teachers.find(teacher => teacher.id === id);
  if (!g) return;

  document.getElementById('form-guru-id').value = g.id;
  document.getElementById('form-guru-nip').value = g.nip;
  document.getElementById('form-guru-name').value = g.name;
  document.getElementById('form-guru-gender').value = g.gender;
  document.getElementById('form-guru-subject').value = g.subject;
  document.getElementById('form-guru-status').value = g.status;
  document.getElementById('form-guru-tutor').value = g.classTutor;
  document.getElementById('form-guru-phone').value = g.phone;
  document.getElementById('form-guru-email').value = g.email;

  document.getElementById('modal-guru-title').textContent = 'Edit Data Guru';
  document.getElementById('modal-guru').classList.add('active');
}

function saveGuruForm(e) {
  if (e) e.preventDefault();
  const id = document.getElementById('form-guru-id').value;
  const nip = document.getElementById('form-guru-nip').value.trim();
  const name = document.getElementById('form-guru-name').value.trim();
  const gender = document.getElementById('form-guru-gender').value;
  const subject = document.getElementById('form-guru-subject').value.trim();
  const status = document.getElementById('form-guru-status').value;
  const classTutor = document.getElementById('form-guru-tutor').value.trim();
  const phone = document.getElementById('form-guru-phone').value.trim();
  const email = document.getElementById('form-guru-email').value.trim();

  if (!nip || !name) {
    alert('NIP dan Nama Guru wajib diisi!');
    return;
  }

  if (id) {
    const idx = schoolData.teachers.findIndex(g => g.id === id);
    if (idx !== -1) {
      schoolData.teachers[idx] = { ...schoolData.teachers[idx], nip, name, gender, subject, status, classTutor, phone, email };
      showToast('Data Guru diperbarui!');
    }
  } else {
    const newId = 'G' + String(schoolData.teachers.length + 1).padStart(3, '0');
    schoolData.teachers.push({ id: newId, nip, name, gender, subject, status, classTutor, phone, email });
    showToast('Guru baru ditambahkan!');
  }

  saveDataStore();
  closeModal('modal-guru');
  renderGuruTable();
}

function deleteGuru(id) {
  if (confirm('Apakah Anda yakin ingin menghapus data guru ini?')) {
    schoolData.teachers = schoolData.teachers.filter(g => g.id !== id);
    saveDataStore();
    showToast('Data guru telah dihapus.', 'warning');
    renderGuruTable();
  }
}

/* =============================================================
   4. JADWAL PELAJARAN VIEW
   ============================================================= */
function renderJadwalView() {
  const container = document.getElementById('jadwal-cards-container');
  if (!container) return;

  const dayFilter = document.getElementById('filter-jadwal-day')?.value || 'ALL';

  const filtered = schoolData.schedules.filter(sch => dayFilter === 'ALL' || sch.day === dayFilter);

  container.innerHTML = filtered.map(sch => `
    <div class="schedule-card">
      <div class="time">${sch.day} • ${sch.time}</div>
      <h4>${sch.subject}</h4>
      <p style="margin-top: 4px; font-weight: 600; color: var(--text-main);">${sch.className} (${sch.room})</p>
      <p style="font-size: 0.76rem; color: var(--text-muted); margin-top: 2px;">Pengajar: ${sch.teacher}</p>
    </div>
  `).join('');
}

/* =============================================================
   5. MANAJEMEN KEUANGAN & SPP
   ============================================================= */
function renderSPPTable() {
  const tbody = document.getElementById('spp-table-body');
  if (!tbody) return;

  const filterStatus = document.getElementById('filter-spp-status')?.value || 'ALL';

  const filtered = schoolData.sppPayments.filter(p => filterStatus === 'ALL' || p.status === filterStatus);

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td><strong>${p.receiptNo !== '-' ? p.receiptNo : p.id}</strong></td>
      <td><strong>${p.studentName}</strong></td>
      <td><span class="badge badge-info">${p.className}</span></td>
      <td>${p.month}</td>
      <td><strong>${formatRupiah(p.amount)}</strong></td>
      <td><span class="badge ${p.status === 'Lunas' ? 'badge-success' : 'badge-danger'}">${p.status}</span></td>
      <td>${p.paymentDate}</td>
      <td>
        ${p.status === 'Lunas' 
          ? `<button class="btn btn-secondary btn-sm" onclick="printKwitansi('${p.id}')">Cetak Kwitansi</button>` 
          : `<button class="btn btn-primary btn-sm" onclick="bayarSPPModal('${p.id}')">Bayar Sekarang</button>`}
      </td>
    </tr>
  `).join('');
}

function openModalAddSPP() {
  const studentSelect = document.getElementById('form-spp-student');
  studentSelect.innerHTML = schoolData.students.map(s => `<option value="${s.id}">${s.name} (${s.className})</option>`).join('');
  
  document.getElementById('form-spp-month').value = 'Agustus 2025';
  document.getElementById('form-spp-amount').value = 150000;
  
  document.getElementById('modal-spp').classList.add('active');
}

function saveSPPForm(e) {
  if (e) e.preventDefault();
  const studentId = document.getElementById('form-spp-student').value;
  const month = document.getElementById('form-spp-month').value;
  const amount = parseInt(document.getElementById('form-spp-amount').value) || 150000;
  const student = schoolData.students.find(s => s.id === studentId);

  if (!student) return;

  const newId = 'SPP-' + (1000 + schoolData.sppPayments.length + 1);
  const receiptNo = 'KW-' + new Date().toISOString().slice(0,7).replace('-','') + '-' + String(schoolData.sppPayments.length + 1).padStart(3, '0');
  const todayStr = new Date().toISOString().slice(0, 10);

  schoolData.sppPayments.push({
    id: newId,
    studentId: student.id,
    studentName: student.name,
    className: student.className,
    month: month,
    amount: amount,
    status: 'Lunas',
    paymentDate: todayStr,
    receiptNo: receiptNo
  });

  saveDataStore();
  closeModal('modal-spp');
  showToast('Pembayaran SPP berhasil dicatat!');
  renderSPPTable();
}

function bayarSPPModal(sppId) {
  const p = schoolData.sppPayments.find(item => item.id === sppId);
  if (!p) return;

  p.status = 'Lunas';
  p.paymentDate = new Date().toISOString().slice(0, 10);
  p.receiptNo = 'KW-' + new Date().toISOString().slice(0,7).replace('-','') + '-' + String(Math.floor(Math.random()*900 + 100));

  saveDataStore();
  showToast(`Pembayaran SPP ${p.studentName} bulan ${p.month} LUNAS!`);
  renderSPPTable();
}

function printKwitansi(sppId) {
  const p = schoolData.sppPayments.find(item => item.id === sppId);
  if (!p) return;

  const printArea = document.getElementById('print-kwitansi-area');
  printArea.innerHTML = `
    <div class="kwitansi-box">
      <div class="kwitansi-header">
        <h2>${schoolData.info.name}</h2>
        <p>${schoolData.info.address} | Telp: ${schoolData.info.phone}</p>
        <h3 style="margin-top: 10px; text-decoration: underline;">KWITANSI PEMBAYARAN SPP</h3>
        <p>No: ${p.receiptNo}</p>
      </div>
      <div class="kwitansi-row">
        <div class="kwitansi-label">Telah Diterima Dari</div>
        <div class="kwitansi-val">: <strong>${p.studentName}</strong> (${p.className})</div>
      </div>
      <div class="kwitansi-row">
        <div class="kwitansi-label">Guna Pembayaran</div>
        <div class="kwitansi-val">: SPP Bulan ${p.month} - TA ${schoolData.info.academicYear}</div>
      </div>
      <div class="kwitansi-row">
        <div class="kwitansi-label">Jumlah Uang</div>
        <div class="kwitansi-val">: <strong>${formatRupiah(p.amount)}</strong></div>
      </div>
      <div class="kwitansi-row">
        <div class="kwitansi-label">Tanggal Pembayaran</div>
        <div class="kwitansi-val">: ${p.paymentDate}</div>
      </div>
      <div class="kwitansi-footer">
        <div>
          <p>Siswa / Pembayar,</p>
          <br><br><br>
          <p><strong>(${p.studentName})</strong></p>
        </div>
        <div>
          <p>Cipari, ${p.paymentDate}</p>
          <p>Bendahara Sekolah,</p>
          <br><br>
          <p><strong>(Siti Nurhaliza, S.E.)</strong></p>
        </div>
      </div>
    </div>
  `;

  window.print();
}

/* =============================================================
   6. REKAP ABSENSI VIEW
   ============================================================= */
function renderAbsensiView() {
  const tbody = document.getElementById('absensi-table-body');
  if (!tbody) return;

  const attendance = schoolData.attendanceToday || [];
  tbody.innerHTML = attendance.map((a, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${a.studentName}</strong></td>
      <td><span class="badge badge-info">${a.className}</span></td>
      <td>
        <select class="form-select" onchange="updateAbsensiStatus('${a.studentId}', this.value)" style="padding: 4px 8px; font-size: 0.8rem;">
          <option value="Hadir" ${a.status === 'Hadir' ? 'selected' : ''}>Hadir</option>
          <option value="Izin" ${a.status === 'Izin' ? 'selected' : ''}>Izin</option>
          <option value="Sakit" ${a.status === 'Sakit' ? 'selected' : ''}>Sakit</option>
          <option value="Alpa" ${a.status === 'Alpa' ? 'selected' : ''}>Alpa</option>
        </select>
      </td>
      <td>${a.note || '-'}</td>
    </tr>
  `).join('');
}

function updateAbsensiStatus(studentId, newStatus) {
  const item = schoolData.attendanceToday.find(a => a.studentId === studentId);
  if (item) {
    item.status = newStatus;
    saveDataStore();
    showToast(`Status kehadiran ${item.studentName} diubah ke ${newStatus}`);
  }
}

/* =============================================================
   7. NILAI & E-RAPOR VIEW
   ============================================================= */
function renderNilaiView() {
  const tbody = document.getElementById('nilai-table-body');
  if (!tbody) return;

  tbody.innerHTML = schoolData.grades.map(g => `
    <tr>
      <td><strong>${g.studentName}</strong></td>
      <td><span class="badge badge-info">${g.className}</span></td>
      <td>${g.subject}</td>
      <td>${g.tugas}</td>
      <td>${g.uts}</td>
      <td>${g.uas}</td>
      <td><strong>${g.finalGrade}</strong></td>
      <td><span class="badge ${g.predicate === 'A' ? 'badge-success' : 'badge-warning'}">${g.predicate}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="printERapor('${g.studentId}')">Cetak Rapor</button>
      </td>
    </tr>
  `).join('');
}

function printERapor(studentId) {
  const student = schoolData.students.find(s => s.id === studentId);
  if (!student) return;

  const studentGrades = schoolData.grades.filter(g => g.studentId === studentId);

  const printArea = document.getElementById('print-kwitansi-area');
  printArea.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #000;">
      <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
        <h2 style="font-size: 1.5rem; font-weight: bold;">${schoolData.info.name}</h2>
        <p>${schoolData.info.address}</p>
        <h3 style="margin-top: 10px; text-decoration: underline;">LAPORAN HASIL BELAJAR (E-RAPOR)</h3>
        <p>Semester ${schoolData.info.currentSemester} - Tahun Ajaran ${schoolData.info.academicYear}</p>
      </div>
      
      <table style="width: 100%; margin-bottom: 20px; font-size: 0.9rem;">
        <tr><td style="width: 120px; font-weight: bold;">Nama Siswa</td><td>: ${student.name}</td><td style="width: 120px; font-weight: bold;">Kelas</td><td>: ${student.className}</td></tr>
        <tr><td style="font-weight: bold;">NISN</td><td>: ${student.nisn}</td><td style="font-weight: bold;">Jurusan</td><td>: ${student.major}</td></tr>
      </table>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 0.9rem;" border="1" cellpadding="8">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th>No</th><th>Mata Pelajaran</th><th>Nilai Tugas</th><th>UTS</th><th>UAS</th><th>Nilai Akhir</th><th>Predikat</th>
          </tr>
        </thead>
        <tbody>
          ${studentGrades.map((g, idx) => `
            <tr>
              <td style="text-align: center;">${idx + 1}</td>
              <td>${g.subject}</td>
              <td style="text-align: center;">${g.tugas}</td>
              <td style="text-align: center;">${g.uts}</td>
              <td style="text-align: center;">${g.uas}</td>
              <td style="text-align: center; font-weight: bold;">${g.finalGrade}</td>
              <td style="text-align: center; font-weight: bold;">${g.predicate}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="display: flex; justify-content: space-between; margin-top: 40px; font-size: 0.9rem;">
        <div style="text-align: center;">
          <p>Orang Tua / Wali,</p>
          <br><br><br>
          <p>_____________________</p>
        </div>
        <div style="text-align: center;">
          <p>Cipari, ${new Date().toLocaleDateString('id-ID')}</p>
          <p>Wali Kelas,</p>
          <br><br><br>
          <p><strong>(Budi Santoso, S.T.)</strong></p>
        </div>
      </div>
    </div>
  `;

  window.print();
}

/* =============================================================
   8. PENGUMUMAN VIEW
   ============================================================= */
function renderPengumumanView() {
  const container = document.getElementById('pengumuman-list-container');
  if (!container) return;

  container.innerHTML = schoolData.announcements.map(ann => `
    <div class="glass-card">
      <div class="card-header">
        <div>
          <span class="badge badge-purple">${ann.category}</span>
          <h3 style="margin-top: 6px; font-size: 1.15rem;">${ann.title}</h3>
          <p style="font-size: 0.78rem; color: var(--text-muted);">Dipublikasikan oleh ${ann.author} pada ${ann.date}</p>
        </div>
      </div>
      <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-main);">${ann.content}</p>
    </div>
  `).join('');
}

/* =============================================================
   9. PENGATURAN & EXPORT / IMPORT DATA
   ============================================================= */
function renderSettingsView() {
  const info = schoolData.info;
  document.getElementById('setting-sch-name').value = info.name;
  document.getElementById('setting-sch-npsn').value = info.npsn;
  document.getElementById('setting-sch-address').value = info.address;
  document.getElementById('setting-sch-principal').value = info.principal;
}

function exportDataJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schoolData, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `SMK_Diponegoro_Cipari_Backup_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Data berhasil diekspor!');
}

function importDataJSON(inputEl) {
  const file = inputEl.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported && imported.students && imported.teachers) {
        schoolData = imported;
        saveDataStore();
        showToast('Data berhasil diimpor!');
        renderCurrentView();
      } else {
        alert('File JSON tidak valid atau struktur data tidak cocok.');
      }
    } catch (err) {
      alert('Gagal membaca file JSON.');
    }
  };
  reader.readAsText(file);
}

// Modal helper
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// Event Listeners Setup
document.addEventListener('DOMContentLoaded', () => {
  initDataStore();
  setupNavigation();
  renderCurrentView();

  // Attach search & filter listeners
  const searchSiswa = document.getElementById('search-siswa');
  if (searchSiswa) searchSiswa.addEventListener('input', renderSiswaTable);

  const filterMajor = document.getElementById('filter-siswa-major');
  if (filterMajor) filterMajor.addEventListener('change', renderSiswaTable);

  const filterGrade = document.getElementById('filter-siswa-grade');
  if (filterGrade) filterGrade.addEventListener('change', renderSiswaTable);

  const searchGuru = document.getElementById('search-guru');
  if (searchGuru) searchGuru.addEventListener('input', renderGuruTable);

  const filterDay = document.getElementById('filter-jadwal-day');
  if (filterDay) filterDay.addEventListener('change', renderJadwalView);

  const filterSPP = document.getElementById('filter-spp-status');
  if (filterSPP) filterSPP.addEventListener('change', renderSPPTable);
});
