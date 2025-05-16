import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./tambahjanji.css";

const monthNames = [
  "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
  "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
];
const dayNames = [
  "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
];

function formatDateForDisplay(date) {
  const dayName = dayNames[date.getDay()];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${dayName}, ${day} ${month} ${year}`;
}

function formatDateForStorage(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const TambahJanji = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    description: "",
  });

  const navigate = useNavigate();

  // Sidebar handlers
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const handleSidebarClick = (e) => {
    if (e.target.classList.contains("sidebar-popup")) closeSidebar();
  };

  // Navigation handlers (replace with react-router-dom's useNavigate in a full app)
  const goTo = (path) => {
    window.location.href = path;
  };

  // Calendar logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startDay = firstDay.getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectDate = (date) => setSelectedDate(date);

  const selectToday = () => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setSelectedDate(t);
  };

  const selectTomorrow = () => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    t.setHours(0, 0, 0, 0);
    setSelectedDate(t);
  };

  // Form handlers
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Silakan pilih tanggal janji temu");
      return;
    }
    const formData = {
      ...form,
      date: formatDateForDisplay(selectedDate),
    };
    alert(
      `Janji temu berhasil dibuat!\n\n` +
        `Nama: ${formData.name}\n` +
        `No HP: ${formData.phone}\n` +
        `Keterangan: ${formData.description}\n` +
        `Tanggal: ${formData.date}`
    );
    setForm({ name: "", phone: "", description: "" });
    setSelectedDate(null);
  };

  // Generate calendar days
  const renderDays = () => {
    const days = [];
    // Previous month days
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="day other-month"></div>);
    }
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      days.push(
        <div
          key={i}
          className={`day${isToday ? " today" : ""}${isSelected ? " selected" : ""}`}
          onClick={() => selectDate(date)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div>
      {/* Logo for opening sidebar */}
      <img
        src="resource/Logo/Logo SMK 2 Singosari.png"
        alt="Logo SMK"
        className="logo"
        id="logosmk"
        onClick={openSidebar}
        style={{ cursor: "pointer" }}
      />

      {/* Sidebar Popup */}
      <div
        id="sidebar-popup"
        className={`sidebar-popup${sidebarOpen ? " active" : ""}`}
        onClick={handleSidebarClick}
      >
        <aside className="sidebar">
          <span className="close-btn" onClick={closeSidebar}>
            &times;
          </span>
          <h2 id="title">PENERIMA TAMU</h2>
          <ul className="menu">
            <li>
              <button onClick={() => navigate("/")}>
                <h3>Dashboard</h3>
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/notifikasi")}>
                <h3>Notifikasi</h3>
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/datatamu")}>
                <h3>Data Tamu</h3>
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/tambahjanji")}>
                <h3>Tambah Janji</h3>
              </button>
            </li>
          </ul>
          <button className="logout">
            <b>Keluar</b>
          </button>
        </aside>
      </div>

      <div className="container">
        <header className="header">
          <img
            src="resource/Logo/Logo SMK 2 Singosari.png"
            alt="Logo SMK"
            className="logo"
            id="logosmk-header"
            style={{ left: 20, position: "absolute" }}
          />
          <h1>TAMBAH JANJI TEMU</h1>
        </header>

        <main className="main-content">
          <div className="calendar-section">
            <h2>KALENDER</h2>
            <div className="calendar-wrapper">
              <div className="month-header">
                <button
                  className="nav-button prev-month"
                  onClick={() =>
                    setCurrentDate(
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() - 1,
                        1
                      )
                    )
                  }
                >
                  <i className="material-icons">chevron_left</i>
                </button>
                <span className="month-name">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
                <button
                  className="nav-button next-month"
                  onClick={() =>
                    setCurrentDate(
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() + 1,
                        1
                      )
                    )
                  }
                >
                  <i className="material-icons">chevron_right</i>
                </button>
              </div>
              <div className="weekdays">
                <span>Min</span>
                <span>Sen</span>
                <span>Sel</span>
                <span>Rab</span>
                <span>Kam</span>
                <span>Jum</span>
                <span>Sab</span>
              </div>
              <div className="days-grid">{renderDays()}</div>
              <div className="quick-selection">
                <button className="quick-btn today-btn" onClick={selectToday}>
                  Hari Ini
                </button>
                <button className="quick-btn tomorrow-btn" onClick={selectTomorrow}>
                  Besok
                </button>
              </div>
              <input
                type="hidden"
                id="selected-date"
                name="selected-date"
                value={selectedDate ? formatDateForStorage(selectedDate) : ""}
                readOnly
              />
            </div>
          </div>

          <div className="form-section">
            <h2>TAMBAH JANJI TEMU</h2>
            <form id="appointment-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="guest-name">Nama Tamu</label>
                <input
                  type="text"
                  id="guest-name"
                  name="name"
                  placeholder="Input Nama Tamu"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="guest-phone">No Hp Tamu</label>
                <input
                  type="text"
                  id="guest-phone"
                  name="phone"
                  placeholder="081234567890"
                  value={form.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Keterangan</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Meeting"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Buat Janji Temu
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TambahJanji;