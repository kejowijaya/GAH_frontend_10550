import React, { useState, useEffect } from "react";
import instance from "../axios";
import { NavLink, useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
} from "@nextui-org/react";

export function ResumeReservasi() {
  const [reservasiData, setReservasiData] = useState({});
  const [uang, setUang] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id_reservasi = localStorage.getItem("id_reservasi");
    instance
      .get(`/getResumeReservasi/${id_reservasi}`)
      .then((res) => {
        setReservasiData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const bayarReservasi = (id_reservasi) => {
    id_reservasi = localStorage.getItem("id_reservasi");
    instance
      .post(`/bayar/${id_reservasi}`, {
        uang,
      })
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        console.log(res.data.data);
        alert("Pembayaran Berhasil");
        setOpen(false);
        navigate("/tandaTerimaPersonal");
      })
      .catch((err) => {
        console.log(err.response);
        alert(
          "Pembayaran gagal karena " + JSON.stringify(err.response.data.message)
        );
      });
  };

  const formatRupiah = (uang) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(uang);
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center bg-login-bg">
        <Card className="mt-10 w-[600px] items-center">
          <div className=" ">
            <div className="Card w-[550px] items-center">
              <div className="">
                <div className="text-center mb-10 ">
                  <div className="flex justify-between"></div>
                  <hr className=""></hr>
                  <h1 className="text-2xl font-bold my-5">Resume Pemesanan</h1>
                </div>
                {reservasiData && (
                  <div>
                    <h2 className="text-xl font-bold mb-2">
                      ID Booking : {reservasiData.id_booking}
                    </h2>

                    <h2 className="text-xl font-bold my-4">Transaksi Kamar</h2>

                    <Table>
                      <TableHeader
                        columns={[
                          { name: "Jenis Kamar", uid: "jenisKamar" },
                          { name: "Jumlah", uid: "jumlah" },
                          { name: "Subtotal", uid: "subtotal" },
                        ]}
                      >
                        {(column) => (
                          <TableColumn key={column.uid}>
                            {column.name}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        items={reservasiData.reservasi_kamar || []}
                        emptyContent={"No rows to display."}
                      >
                        {(item) => (
                          <TableRow key={item.id_reservasi_kamar}>
                            <TableCell>{item.id_jenis}</TableCell>
                            <TableCell>{item.jumlah}</TableCell>
                            <TableCell>{item.subtotal}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>

                    <h2 className="text-xl font-bold my-4">
                      Transaksi Layanan
                    </h2>
                    <Table>
                      <TableHeader
                        columns={[
                          { name: "Nama Layanan", uid: "namaLayanan" },
                          { name: "Jumlah", uid: "jumlah" },
                          { name: "Subtotal", uid: "subtotal" },
                        ]}
                      >
                        {(column) => (
                          <TableColumn key={column.uid}>
                            {column.name}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        items={reservasiData.reservasi_layanan || []}
                        emptyContent={"No rows to display."}
                      >
                        {(item) => (
                          <TableRow key={item.id_reservasi_layanan}>
                            <TableCell>{item.id_fasilitas}</TableCell>
                            <TableCell>{item.jumlah}</TableCell>
                            <TableCell>{item.total_harga}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    <div className="my-4 text-l">
                      No Rekening : {reservasiData.nomor_rek}
                    </div>

                    <hr></hr>
                    <div className="text-xl font-bold mt-4">
                      Total Pembayaran:{" "}
                      {formatRupiah(reservasiData.total_harga)}
                      <hr></hr>
                      <hr></hr>
                      <hr></hr>
                    </div>
                    <Button
                      className="ml-44 mt-5 mb-8 center-button"
                      color="primary"
                      onClick={() => setOpen(true)}
                    >
                      Bayar Pemesanan
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
        <div className="flex flex-col justify-center items-center h-screen bg-login-bg">
          <Modal
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            width="600"
            height="350"
          >
            <ModalContent>
              <ModalHeader>Pembayaran Uang Pemesanan</ModalHeader>
              <ModalBody>
                <h2 className="text-xl font-bold mb-2">
                  Total Harga {formatRupiah(reservasiData.total_harga)}
                </h2>
                <Input
                  type="number"
                  value={uang}
                  onValueChange={(value) => setUang(value)}
                  placeholder="Masukkan jumlah uang"
                  label="Jumlah Uang"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => setOpen(false)}>
                  Batal
                </Button>
                <Button color="primary" onClick={bayarReservasi}>
                  Bayar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
