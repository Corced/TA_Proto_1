import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./notifikasi.css";

const Notifikasi = () => {
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

  // Example static notification data
  const notifications = [
    {
      id: 1,
      text: (
        <>
          Permintaan <strong>Natalia Sarah</strong> ditolak oleh <strong>Bu Dian</strong> pada 05/07/2025 pukul 02.00
        </>
      ),
    },
    {
      id: 2,
      text: (
        <>
          Permintaan <strong>Windah Basudara</strong> diterima oleh <strong>Pak Budi</strong> pada 06/07/2025 pukul 09.00
        </>
      ),
    },
    {
      id: 3,
      text: (
        <>
          Permintaan <strong>Raisa Leza</strong> ditolak oleh <strong>Bu Dian</strong> pada 07/07/2025 pukul 10.30
        </>
      ),
    },
  ];

  return (
    <div>
      {/* Logo for opening sidebar */}
      <img
        src="resource/Logo/Logo SMK 2 Singosari.png"
        alt="logosmk"
        id="logosmk"
        className="logosmk"
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

      <div className="notification-container">
        <img
          src="resource/Logo/bckg.svg"
          className="background-svg"
          alt="Decorative stripes"
        />

        <div className="notification-list">
          {notifications.map((notif) => (
            <div className="notification-item" key={notif.id}>
              {notif.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifikasi;