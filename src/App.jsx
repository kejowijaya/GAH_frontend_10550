import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPegawai } from "./auth/LoginPegawai";
import { LoginCustomer } from "./Auth/LoginCustomer";
import { RegisterPage } from "./auth/Register";
import { ResetPass } from "./auth/ResetPass";
import { Kamar } from "./crud/Kamar";
import { Fasilitas } from "./crud/Fasilitas";
import { Season } from "./crud/Season";
import { Tarif } from "./crud/Tarif";
import { LandingPage } from "./LandingPage";
import { ProfileUser } from "./auth/ProfileUser";
import { JenisKamar } from "./crud/JenisKamar";
import { ListRoom } from "./ListRoom";
import { ResumeReservasi } from "./reservasi/Resume";
import { TandaTerimaPersonal } from "./reservasi/TandaTerimaPersonal";
import { RiwayatReservasi } from "./reservasi/Riwayat";
import { Grup } from "./auth/CustomerGrup";
import { RiwayatReservasiGrup } from "./reservasi/RiwayatGrup";
import { Laporan1 } from "./laporan/laporan1";
import { Laporan2 } from "./laporan/Laporan2";
import { Laporan3 } from "./laporan/Laporan3";
import { Laporan4 } from "./laporan/Laporan4";
import { DaftarReservasi } from "./reservasi/DaftarReservasi";
import { NotaLunas } from "./reservasi/NotaLunas";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginCustomer />} />
          <Route path="/loginPegawai" element={<LoginPegawai />} />
          <Route path="/profil" element={<ProfileUser />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/kamar" element={<Kamar />} />
          <Route path="/jenisKamar" element={<JenisKamar />} />
          <Route path="/fasilitas" element={<Fasilitas />} />
          <Route path="/season" element={<Season />} />
          <Route path="/tarif" element={<Tarif />} />
          <Route path="/resetPass" element={<ResetPass />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/listRoom" element={<ListRoom />} />
          <Route path="/resume" element={<ResumeReservasi />} />
          <Route
            path="/tandaTerimaPersonal"
            element={<TandaTerimaPersonal />}
          />
          <Route path="/riwayatReservasi" element={<RiwayatReservasi />} />
          <Route path="/customerGrup" element={<Grup />} />
          <Route
            path="/riwayatReservasiGrup"
            element={<RiwayatReservasiGrup />}
          />
          <Route path="/laporan1" element={<Laporan1 />} />
          <Route path="/laporan2" element={<Laporan2 />} />
          <Route path="/laporan3" element={<Laporan3 />} />
          <Route path="/laporan4" element={<Laporan4 />} />
          <Route path="/daftarReservasi" element={<DaftarReservasi />} />
          <Route path="/notaLunas" element={<NotaLunas />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
