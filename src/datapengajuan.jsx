import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./datapengajuan.css";

const Datapengajuan = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Sidebar open/close handlers
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  // Optional: close sidebar when clicking outside
  const handleSidebarClick = (e) => {
    if (e.target.classList.contains("sidebar-popup")) {
      closeSidebar();
    }
  };

  // Example static data (replace with API data as needed)
  const pengajuanData = [
    {
      nama: "Windah Basudara",
      tanggal: "25/05/2025",
      waktu: "08.30 WIB",
      kepada: "Bu Dian",
      status: "Diterima",
    },
    {
      nama: "Windah Basudara",
      tanggal: "25/05/2025",
      waktu: "08.30 WIB",
      kepada: "Bu Dian",
      status: "Diterima",
    },
    // Add more rows as needed
  ];

  return (
    <div className="notification-container">
      {/* Logo for opening sidebar */}
      <img
        src="resource/Logo/Logo SMK 2 Singosari.png"
        alt="Logo SMK"
        className="logosmk"
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

      <header className="header">
        <h1>DATA PENGAJUAN JANJI</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Masukkan nama tamu"
            className="search-input"
          />
          <button className="search-button">
            <img src="resource/Logo/scope.svg" alt="Search" />
          </button>
        </div>
      </header>

      <main>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama Tamu</th>
              <th>Tanggal</th>
              <th>Waktu</th>
              <th>Kepada</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pengajuanData.map((row, idx) => (
              <tr key={idx}>
                <td>{row.nama}</td>
                <td>{row.tanggal}</td>
                <td>{row.waktu}</td>
                <td>{row.kepada}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Datapengajuan;