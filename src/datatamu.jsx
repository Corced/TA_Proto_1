import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./datatamu.css";

const Datatamu = () => {
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
  const dataTamu = [
    {
      id: "1234",
      nama: "Natalia Sarah",
      instansi: "SMKN 2 SINGOSARI",
      keperluan: "Rapat Kepala Sekolah",
      tanggalKunjungan: "25 April 2025",
      jamMasuk: "10:10",
      jamKeluar: "12:30",
      petugasPenerima: "Raisa Leza",
    },
    // Add more rows as needed
  ];

  // Export to CSV
  const exportToCSV = () => {
    const header = [
      "ID Tamu",
      "Nama",
      "Instansi",
      "Keperluan",
      "Tanggal Kunjungan",
      "Jam Masuk",
      "Jam Keluar",
      "Petugas Penerima",
    ];
    const rows = dataTamu.map((row) =>
      [
        row.id,
        row.nama,
        row.instansi,
        row.keperluan,
        row.tanggalKunjungan,
        row.jamMasuk,
        row.jamKeluar,
        row.petugasPenerima,
      ].map((cell) => `"${cell}"`).join(",")
    );
    const csvContent = [header.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data_tamu.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Logo for opening sidebar */}
      <img
        src="resource/Logo/Logo SMK 2 Singosari.png"
        alt="Logosmk"
        id="logosmk"
        className="logo"
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
        <header>
          <div className="header-center">
            <img
              src="resource/Logo/circleblue.svg"
              className="circle-svg"
              alt="circle blue"
            />
            <img
              src="resource/Logo/circleorange.svg"
              className="circle-svg"
              alt="circle orange"
            />
            <span className="data-tamu-title">DATA TAMU</span>
            <img
              src="resource/Logo/circleorange.svg"
              className="circle-svg"
              alt="circle orange"
            />
            <img
              src="resource/Logo/circleblue.svg"
              className="circle-svg"
              alt="circle blue"
            />
          </div>
        </header>
        <table>
          <thead>
            <tr>
              <th>ID Tamu</th>
              <th>Nama</th>
              <th>Instansi</th>
              <th>Keperluan</th>
              <th>Tanggal Kunjungan</th>
              <th>Jam Masuk</th>
              <th>Jam Keluar</th>
              <th>Petugas Penerima</th>
            </tr>
          </thead>
          <tbody>
            {dataTamu.map((tamu, idx) => (
              <tr key={idx}>
                <td>{tamu.id}</td>
                <td>{tamu.nama}</td>
                <td>{tamu.instansi}</td>
                <td>{tamu.keperluan}</td>
                <td>{tamu.tanggalKunjungan}</td>
                <td>{tamu.jamMasuk}</td>
                <td>{tamu.jamKeluar}</td>
                <td>{tamu.petugasPenerima}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button id="export-button" onClick={exportToCSV}>
          Ekspor Data
        </button>
      </div>
    </div>
  );
};

export default Datatamu;