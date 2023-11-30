import React, { useState, useEffect } from "react";
import instance from "../axios";
import { NavLink, useNavigate } from "react-router-dom";
import { NavBarFO } from "../components/NavBarFO";
import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  SelectItem,
  Select,
  Card,
  ScrollShadow,
  Link,
} from "@nextui-org/react";

export function NotaLunas() {
  const [reservasiData, setReservasiData] = useState({});
  const [invoiceData, setInvoiceData] = useState({});
  const [namaPegawai, setNamaPegawai] = useState("");
  const [uang, setUang] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id_reservasi = localStorage.getItem("id_reservasi");
    instance
      .get(`/notaLunas/${id_reservasi}`)
      .then((res) => {
        setReservasiData(res.data.data);
        setInvoiceData(res.data.invoice);
        console.log(res.data.data);
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

  return (
    <div>
      <NavBarFO />
      <div className="flex flex-col justify-center items-center bg-login-bg">
        <Card className="mt-10 w-[600px] items-center">
          <div className=" ">
            <div className="Card w-[550px] items-center">
              <div className="">
                <div className="text-center mb-2 ">
                  <div className="flex justify-between"></div>
                  <div className="my-6"></div>
                  <hr className="border-b-2 border-foreground" />
                  <h1 className="text-xl font-bold">INVOICE</h1>
                  <hr className="border-b-2 border-foreground" />
                </div>
                {reservasiData && (
                  <div>
                    <div style={{ textAlign: "right" }}>
                      <h3 className="font-semibold mb-2">
                        Tanggal : {invoiceData.tanggal}
                      </h3>
                      <h3 className="font-semibold mb-2">
                        No Invoice : {reservasiData.id_booking}
                      </h3>
                      <h3 className=" font-semibold mb-2">
                        {reservasiData.pegawai && (
                          <div>
                            Nama Pegawai: {reservasiData.pegawai.nama_pegawai}
                          </div>
                        )}
                      </h3>
                    </div>

                    <h4 className="font-semibold mb-2">
                      ID Booking : {reservasiData.id_booking}
                    </h4>
                    <h4 className="font-semibold mb-2">
                      {reservasiData.customer && (
                        <div>Nama: {reservasiData.customer.nama}</div>
                      )}
                    </h4>
                    <h4 className="font-semibold mb-6">
                      {reservasiData.customer && (
                        <div>Alamat: {reservasiData.customer.alamat}</div>
                      )}
                    </h4>

                    <hr className="border-b-2 border-foreground" />
                    <h1 className="text-xl font-bold text-center">DETAIL</h1>
                    <hr className="border-b-2 border-foreground" />

                    <h4 className="font-semibold mb-2">
                      Check In : {reservasiData.tanggal_check_in}
                    </h4>
                    <h4 className="font-semibold mb-2">
                      Check Out : {reservasiData.tanggal_check_out}
                    </h4>
                    <h4 className="font-semibold mb-2">
                      Dewasa : {reservasiData.dewasa}
                    </h4>
                    <h4 className="font-semibold mb-6">
                      Anak : {reservasiData.anak}
                    </h4>

                    <hr className="border-b-2 border-foreground" />
                    <h1 className="text-xl text-center font-bold">KAMAR</h1>
                    <hr className="border-b-2 border-foreground" />

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

                    <hr className="border-b-2 border-foreground" />
                    <h1 className="text-xl text-center font-bold">LAYANAN</h1>
                    <hr className="border-b-2 border-foreground" />
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

                    <hr></hr>

                    <div style={{ textAlign: "right" }}>
                      <h3 className="font-semibold my-4 mb-2">
                        Pajak : {invoiceData.pajak}
                      </h3>
                      <h3 className="text-l font-bold mb-6">
                        Total : {invoiceData.total_harga}
                      </h3>
                      <h3 className=" font-semibold mb-2">
                        Jaminan : {invoiceData.jaminan}
                      </h3>
                      <h3 className=" font-semibold mb-2">
                        Deposit : {invoiceData.deposit}
                      </h3>
                      <h3 className="text-l font-bold mb-2">
                        Cash : {invoiceData.cash}
                      </h3>
                    </div>

                    <h1 className="text-center font-semibold my-4">
                      Thank you for your visit !
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
