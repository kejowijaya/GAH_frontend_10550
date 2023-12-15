import React, { useState, useEffect, useRef } from "react";
import instance from "../axios";
import { NavLink, useNavigate } from "react-router-dom";
import { NavBar } from "../Components/NavBar";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  ScrollShadow,
} from "@nextui-org/react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function TandaTerimaPersonal() {
  const [reservasiData, setReservasiData] = useState({});
  const [reservasiCustomer, setReservasiCustomer] = useState({});
  const [jenisKamarData, setJenisKamarData] = useState([]);
  const [fasilitasData, setFasilitasData] = useState([]);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const downloadPDF = () => {
    const input = cardRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("tanda-terima-pemesanan.pdf");
    });
  };

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

  useEffect(() => {
    const id_reservasi = localStorage.getItem("id_reservasi");
    instance
      .get(`/reservasi/${id_reservasi}`)
      .then((res) => {
        setReservasiCustomer(res.data.data.customer);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    instance
      .get("/jenisKamar")
      .then((res) => {
        setJenisKamarData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const formatRupiah = (uang) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(uang);
  };

  useEffect(() => {
    instance
      .get("/fasilitas")
      .then((res) => {
        setFasilitasData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex mt-5 flex-col justify-center items-center bg-login-bg">
        <Card className="w-[600px] items-center " ref={cardRef}>
          <ScrollShadow hideScrollBar>
            <div className="w-[550px] items-center">
              <div className="text-center mb-10 ">
                <h1 className="text-2xl font-extrabold my-5">
                  Tanda Terima Pemesanan
                </h1>
                <div className="text-center text-xl font-extrabold">
                  <h1>Grand Atma Hotel</h1>
                </div>
              </div>
              {reservasiData && (
                <div>
                  <h2 className="text-l mb-2">
                    <strong>ID Booking</strong> {reservasiData.id_booking}
                  </h2>
                  <h2 className="text-l  mb-2">
                    <strong>Tanggal</strong> {reservasiData.tanggal_booking}
                  </h2>
                  <h2 className="text-l  mb-2">
                    <strong>Nama</strong> {reservasiCustomer.nama}
                  </h2>
                  <h2 className="text-l  mb-2">
                    <strong>Alamat</strong> {reservasiCustomer.alamat}
                  </h2>

                  <hr className=""></hr>
                  <h1 className="text-xl text-center font-extrabold py-5">
                    Detail Pemesanan
                  </h1>
                  <h2 className="text-l  mb-2">
                    <strong>Tanggal Check In</strong>{" "}
                    {reservasiData.tanggal_check_in}
                  </h2>
                  <h2 className="text-l  mb-2">
                    <strong>Tanggal Check Out</strong>{" "}
                    {reservasiData.tanggal_check_out}
                  </h2>
                  <h2 className="text-l  mb-2">
                    <strong>Dewasa</strong> {reservasiData.dewasa}
                  </h2>
                  <h2 className="text-l  mb-2">
                    <strong>Anak</strong> {reservasiData.anak}
                  </h2>
                  <h2 className="text-l  mb-2">
                    <strong>Tanggal Pembayaran</strong>{" "}
                    {reservasiData.tanggal_bayar}
                  </h2>

                  <h2 className="text-l  font-bold my-4">Transaksi Kamar</h2>

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
                      {(item) => {
                        const jenisKamar = jenisKamarData.find(
                          (jenis) => jenis.id_jenis === item.id_jenis
                        );

                        return (
                          <TableRow key={item.id_reservasi_kamar}>
                            <TableCell>
                              {jenisKamar
                                ? jenisKamar.jenis_kamar
                                : "Unknown Jenis"}
                            </TableCell>
                            <TableCell>{item.jumlah}</TableCell>
                            <TableCell>{formatRupiah(item.subtotal)}</TableCell>
                          </TableRow>
                        );
                      }}
                    </TableBody>
                  </Table>

                  <h2
                    className="text-l mt-5"
                    style={{ display: "flex", justifyContent: "right" }}
                  >
                    <strong className="mr-5">Total Harga </strong>{" "}
                    {formatRupiah(reservasiData.total_harga)}
                  </h2>
                  <h2 className="text-l  mt-5 mb-5">
                    <strong>Permintaan Khusus</strong>{" "}
                    {reservasiData.permintaan_khusus}
                  </h2>
                </div>
              )}
            </div>
          </ScrollShadow>
        </Card>
        <div className="mt-5 flex justify-end">
          <Button color="primary" onClick={() => downloadPDF()}>
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
