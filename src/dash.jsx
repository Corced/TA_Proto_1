import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dash.css";

const Dash = () => {
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

  return (
    <div>
      {/* Logo for opening sidebar */}
      <img
        src="resource/Logo/Logo SMK 2 Singosari.png"
        alt="logosmk"
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

      {/* Main Content */}
      <h1 className="title">Dashboard Aplikasi Buku Tamu</h1>
      <main className="content">
        <div className="card-container">
          <div className="card">
            <div className="card-number" id="Kunjungan aktif">
              Null
            </div>
            <div className="card-label">Kunjungan Aktif</div>
          </div>
          <div className="card">
            <div className="card-number" id="Kunjungan Tidak Terkonfirmasi">
              Null
            </div>
            <div className="card-label">Kunjungan Tidak Terkonfirmasi</div>
          </div>
          <div className="card">
            <div className="card-number" id="Kunjungan Selesai">
              Null
            </div>
            <div className="card-label">Kunjungan Selesai</div>
          </div>
        </div>
      </main>
      <article>
        <div className="active-visits-section">
          <h2 className="section-title">Kunjungan Aktif</h2>
          <div className="visit-card"></div>
          <div className="visit-card"></div>
          <div className="visit-card"></div>
        </div>
      </article>
    </div>
  );
};

export default Dash;