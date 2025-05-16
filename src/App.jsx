import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dash from "./dash";
import Datapengajuan from "./datapengajuan";
import Datatamu from "./datatamu";
import Notifikasi from "./notifikasi";
import TambahJanji from "./tambahjanji";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dash />} />
        <Route path="/datapengajuan" element={<Datapengajuan />} />
        <Route path="/datatamu" element={<Datatamu />} />
        <Route path="/notifikasi" element={<Notifikasi />} />
        <Route path="/tambahjanji" element={<TambahJanji />} />
      </Routes>
    </Router>
  );
}

export default App;