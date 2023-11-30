import React, { useEffect, useState } from "react";
import { LiaEyeSolid } from "react-icons/lia";
import { MdSearch, MdCancel } from "react-icons/md";

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
  Link,
  useDisclosure,
  Image,
  SelectItem,
  Select,
} from "@nextui-org/react";
import instance from "./axios";
import { NavBarSM } from "./Components/NavBarSM";
import { useLocation, useNavigate } from "react-router-dom";

const columns = [
  { name: "Jenis Kamar", uid: "jenisKamar" },
  { name: "Gambar", uid: "gambar" },
  { name: "Deskripsi Kamar", uid: "fasilitas" },
  { name: "Jumlah Kamar Tersedia", uid: "totalKamar" },
  { name: "Luas Kamar (m²)", uid: "luas_kamar" },
  { name: "Harga", uid: "harga" },
  { name: "Detail", uid: "actions" },
];

export function ListRoom() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
    onClose: onClose2,
  } = useDisclosure();

  const [isOpen3, setIsOpen3] = useState(false);
  const location = useLocation();
  const { checkIn, checkOut, jmlDewasa, jmlAnak } = location.state || {};
  const [tanggal_check_in, setTanggalCheckIn] = useState(checkIn || "");
  const [tanggal_check_out, setTanggalCheckOut] = useState(checkOut || "");
  const [dewasa, setJumlahDewasa] = useState(0 || jmlDewasa);
  const [anak, setJumlahAnak] = useState(0 || jmlAnak);

  const [kamar, setKamar] = useState([]);
  const [nomor_rek, setNomorRekening] = useState(0);
  const [jenis_kamar, setJenisKamar] = useState("");
  const [jenisKamar, setJenisKamar2] = useState([]);
  const [fasilitasTambahan, setFasilitasTambahan] = useState([]);
  const [layanan, setLayanan] = useState([]);
  const [id_jenis, setIdJenisKamar] = useState("");
  const [fasilitas, setDeskripsiKamar] = useState("");
  const [permintaan_khusus, setPermintaan] = useState("");
  const [luas_kamar, setUkuranKamar] = useState("");
  const [kapasitas, setKapasitas] = useState(0);
  const [harga, setHarga] = useState(0);
  const [tipe_ranjang, setTipeRanjang] = useState("");
  const [gambar, setGambar] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [jumlahKamar, setJumlahKamar] = useState(0);

  const [jenisKamarInputs, setJenisKamarInputs] = useState([
    { id_jenis: "", jumlah: "" },
  ]);

  const [fasilitasInputs, setFasilitasInputs] = useState([
    { id_fasilitas: "", jumlah: "" },
  ]);

  const navigate = useNavigate();

  const availableRoom = () => {
    if (tanggal_check_out <= tanggal_check_in) {
      alert(
        "Tanggal check out tidak boleh lebih awal daripada tanggal check in"
      );
    }

    instance
      .post("/kamarTersedia", {
        tanggal_check_in: tanggal_check_in,
        tanggal_check_out: tanggal_check_out,
      })
      .then((res) => {
        const availableRooms = res.data.data.filter(
          (kamar) => kamar.totalKamar > 0
        );
        setKamar(availableRooms);
        console.log(availableRooms);
        setJenisKamar2(availableRooms.map((kamar) => kamar.jenis_kamar));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reservasi = () => {
    const id_customer = localStorage.getItem("id_user");
    const confirmation = window.confirm(
      "Apakah anda yakin ingin melakukan reservasi ?"
    );
    const confirmation2 = window.confirm(
      "Apakah anda ingin memesan fasilitas tambahan ?"
    );

    if (confirmation) {
      instance
        .post("/tambahReservasi", {
          id_customer: id_customer,
          tanggal_check_in,
          tanggal_check_out,
          dewasa,
          anak,
          nomor_rek,
          permintaan_khusus,
          jenis_kamar: jenisKamarInputs,
        })
        .then((res) => {
          console.log(res.data);
          if (confirmation2) {
            localStorage.setItem("id_reservasi", res.data.data.id_reservasi);
            setIsOpen3(true);
            onClose();
          } else {
            alert("Reservasi berhasil");
            localStorage.setItem("id_reservasi", res.data.data.id_reservasi);
            navigate("/resume");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(
            "Gagal reservasi : " + JSON.stringify(err.response.data.message)
          );
        });
    }
  };

  const tambahFasilitas = () => {
    instance
      .post("/tambahLayanan", {
        id_reservasi: localStorage.getItem("id_reservasi"),
        fasilitas: fasilitasInputs,
      })
      .then((res) => {
        console.log(res.data);
        alert("Reservasi berhasil ditambahkan");
        navigate("/resume");
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Gagal menambahkan fasilitas : " +
            JSON.stringify(err.response.data.message)
        );
      });
  };

  const detailKamar = (kamar) => {
    setJenisKamar(kamar.jenis_kamar.jenis_kamar);
    setDeskripsiKamar(kamar.jenis_kamar.fasilitas);
    setKapasitas(kamar.jenis_kamar.kapasitas);
    setUkuranKamar(kamar.jenis_kamar.luas_kamar);
    setIdJenisKamar(kamar.id_jenis);
    setHarga(kamar.harga);
    setTipeRanjang(kamar.jenis_kamar.tipe_ranjang);
    setGambar(kamar.jenis_kamar.gambar);
    onOpen2();
  };

  const formatRupiah = (uang) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(uang);
  };

  const handleFasilitasChange = (selected, index) => {
    const updatedInputs = [...fasilitasInputs];
    const isDuplicate = fasilitasInputs
      .slice(0, index)
      .some((item) => item.id_fasilitas == selected.currentKey);

    if (isDuplicate) {
      alert(
        "Jenis kamar ini sudah dipilih sebelumnya. Pilih jenis kamar yang berbeda."
      );
      updatedInputs[index].id_fasilitas = 0;
      setFasilitasInputs(updatedInputs);
    } else {
      updatedInputs[index].id_fasilitas = selected.currentKey;
      setFasilitasInputs(updatedInputs);
    }
  };

  const handleJumlahFasilitasChange = (value, index) => {
    const updatedInputs = [...fasilitasInputs];
    updatedInputs[index].jumlah = value;
    setFasilitasInputs(updatedInputs);
  };

  const handleRemoveFasilitas = (index) => {
    const updatedInputs = [...fasilitasInputs];
    updatedInputs.splice(index, 1);
    setFasilitasInputs(updatedInputs);
  };

  const handleAddFasilitas = () => {
    setFasilitasInputs([...fasilitasInputs, { id_jenis: "", jumlah: "" }]);
  };

  const handleJenisKamarChange = (selected, index) => {
    const updatedInputs = [...jenisKamarInputs];
    const isDuplicate = jenisKamarInputs
      .slice(0, index)
      .some((item) => item.id_jenis == selected.currentKey);

    if (isDuplicate) {
      alert(
        "Jenis kamar ini sudah dipilih sebelumnya. Pilih jenis kamar yang berbeda."
      );
      updatedInputs[index].id_jenis = 0;
      setJenisKamarInputs(updatedInputs);
    } else {
      updatedInputs[index].id_jenis = selected.currentKey;
      setJenisKamarInputs(updatedInputs);
    }
  };

  const handleJumlahKamarChange = (value, index) => {
    const updatedInputs = [...jenisKamarInputs];
    updatedInputs[index].jumlah = value;
    setJenisKamarInputs(updatedInputs);
  };

  const handleRemoveJenisKamar = (index) => {
    const updatedInputs = [...jenisKamarInputs];
    updatedInputs.splice(index, 1);
    setJenisKamarInputs(updatedInputs);
  };

  const handleAddJenisKamar = () => {
    setJenisKamarInputs([...jenisKamarInputs, { id_jenis: "", jumlah: "" }]);
  };

  useEffect(() => {
    instance
      .get("/fasilitas")
      .then((response) => {
        setFasilitasTambahan(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat fasilitas :", error);
      });
  }, []);

  const renderCell = (kamar, columnKey) => {
    const cellValue = kamar[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detail Kamar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <LiaEyeSolid onClick={() => detailKamar(kamar)} />
              </span>
            </Tooltip>
          </div>
        );

      case "fasilitas":
        return <div>{kamar.jenis_kamar.fasilitas}</div>;

      case "luas_kamar":
        return <div>{kamar.jenis_kamar.luas_kamar}</div>;

      case "gambar":
        return (
          <div>
            <Image
              src={kamar.jenis_kamar.gambar}
              style={{ width: "400px", height: "200px" }}
            />{" "}
          </div>
        );

      case "harga":
        return <div>{formatRupiah(kamar.harga)}</div>;

      default:
        return cellValue;
    }
  };

  return (
    <div>
      <NavBarSM />
      <div className="p-16">
        <h1 className="text-3xl font-bold text-center mb-14">
          Ketersediaan Kamar
        </h1>
        <div className="flex gap-4 mb-8">
          <span className="flex-1">
            <label className="text-lg font-semibold">Tanggal Check In</label>
            <Input
              value={tanggal_check_in}
              onValueChange={setTanggalCheckIn}
              className="max-w-2xl"
              labelPlacement="outside"
              type="date"
            />
          </span>
          <span className="flex-1">
            <label className="text-lg font-semibold">Tanggal Check Out</label>
            <Input
              className="max-w-2xl"
              labelPlacement="outside"
              type="date"
              value={tanggal_check_out}
              onValueChange={setTanggalCheckOut}
            />
          </span>
          <span className="flex-1">
            <label className="text-lg font-semibold">Jumlah Dewasa</label>
            <Input
              className="max-w-2xl"
              labelPlacement="outside"
              type="number"
              value={dewasa}
              onValueChange={setJumlahDewasa}
            />
          </span>
          <span className="flex-1">
            <label className="text-lg font-semibold">Jumlah Anak-Anak</label>
            <Input
              className="max-w-2xl"
              labelPlacement="outside"
              type="number"
              value={anak}
              onValueChange={setJumlahAnak}
            />
          </span>
          <span className="ml-auto">
            <Button
              onPress={() => {
                availableRoom();
              }}
              color="primary"
              className="mt-7"
            >
              <MdSearch className="mt-1" />
              Cari
            </Button>
          </span>
          <span className="ml-auto">
            <Button
              onPress={() => {
                onOpen();
              }}
              color="primary"
              className="mt-7"
            >
              Reservasi
            </Button>
          </span>
        </div>

        <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={kamar || []} emptyContent={"No rows to display."}>
            {(item) =>
              item.totalKamar > 0 && (
                <TableRow key={item.id_jenis}>
                  {(columnKey) => (
                    <TableCell key={columnKey}>
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
      <Modal
        placement="center"
        size="4xl"
        isOpen={isOpen2}
        onOpenChange={onOpenChange2}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader className="text-2xl font-bold">
            Kamar {jenis_kamar}
          </ModalHeader>

          <ModalBody>
            <Image
              removeWrapper
              alt="Card background"
              src={gambar}
              style={{ width: "500px", height: "300px" }}
            />
            <div className="mb-3">
              <strong>Kapasitas :</strong> {kapasitas} orang
            </div>
            <div className="mb-3">
              <strong>Tipe tempat tidur :</strong> {tipe_ranjang}
            </div>
            <div className="mb-3">
              Kamar berukuran <strong> {luas_kamar} meter persegi </strong>
            </div>
            <div>
              <strong>Internet </strong> - WiFi Gratis
            </div>
            <div>
              <strong>Hiburan</strong> - Televisi LCD dengan channel TV premium
              channels
            </div>
            <div>
              <strong>Makan Minum</strong> - Pembuat kopi/teh, minibar, layanan
              kamar 24-jam, air minum kemasan gratis, termasuk sarapan
            </div>
            <div>
              <strong>Untuk tidur</strong> - Seprai kualitas premium dan
              gorden/tirai kedap cahaya
            </div>
            <div>
              <strong>Kamar Mandi</strong> - Kamar mandi pribadi dengan bathtub
              dan shower terpisah, jubah mandi, dan sandal
            </div>
            <div>
              <strong>Kemudahan</strong> - Brankas (muat laptop), Meja tulis,
              dan Telepon; tempat tidur lipat/tambahan tersedia berdasarkan
              permintaan
            </div>
            <div>
              <strong>Kenyamanan</strong> - AC dan layanan pembenahan kamar
              harian
            </div>
            <div className="mb-6">
              <strong>Merokok/Dilarang Merokok</strong> - Informasi tentang
              kebijakan merokok
            </div>
            <div className="mb-3">
              <strong>Rincian Kamar :</strong> {fasilitas}
            </div>
            <div className="mb-3">
              <strong>Harga :</strong> {formatRupiah(harga)}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="error" onClick={onOpenChange2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Reservasi Kamar
              </ModalHeader>
              <ModalBody>
                <div className="mt-2">
                  <h1 className="ml-2">Pilih Kamar</h1>
                  {jenisKamarInputs.map((input, index) => (
                    <div key={input.id_jenis}>
                      <div className="flex mt-2">
                        <Select
                          items={jenisKamar || []}
                          type="text"
                          label={`Kamar ${index + 1}`}
                          selectedKeys={input.id_jenis}
                          onSelectionChange={(selected) =>
                            handleJenisKamarChange(selected, index)
                          }
                        >
                          {(jenisKamar) => (
                            <SelectItem key={jenisKamar.id_jenis}>
                              {jenisKamar.jenis_kamar}
                            </SelectItem>
                          )}
                        </Select>

                        <Input
                          value={input.jumlah}
                          onValueChange={(value) =>
                            handleJumlahKamarChange(value, index)
                          }
                          type="number"
                          label={`Jumlah Kamar ${index + 1}`}
                          className="ml-2"
                        />
                      </div>
                      {index > 0 && (
                        <div
                          className="mt-2"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            color="error"
                            onPress={() => handleRemoveJenisKamar(index)}
                          >
                            <MdCancel />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Link href="#" color="primary" onPress={handleAddJenisKamar}>
                    Tambah Kamar
                  </Link>
                </div>

                <h1 className="ml-2">Nomor Rekening</h1>
                <Input
                  value={nomor_rek}
                  onValueChange={setNomorRekening}
                  type="text"
                />

                <h1 className="ml-2">Permintaan Khusus</h1>
                <Input
                  value={permintaan_khusus}
                  onValueChange={setPermintaan}
                  type="text"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    reservasi();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div>
        <Modal isOpen={isOpen3} onClose={() => setIsOpen3(false)}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Fasilitas Tambahan
            </ModalHeader>
            <ModalBody>
              <div className="mt-2">
                <h1 className="ml-2">Pilih Fasilitas Tambahan</h1>
                {fasilitasInputs.map((input, index) => (
                  <div key={input.id_fasilitas}>
                    <div className="flex mt-2">
                      <Select
                        items={fasilitasTambahan || []}
                        type="text"
                        label={`Fasilitas ${index + 1}`}
                        selectedKeys={input.id_fasilitas}
                        onSelectionChange={(selected) =>
                          handleFasilitasChange(selected, index)
                        }
                      >
                        {(fasilitasTambahan) => (
                          <SelectItem key={fasilitasTambahan.id_fasilitas}>
                            {fasilitasTambahan.nama_fasilitas}
                          </SelectItem>
                        )}
                      </Select>

                      <Input
                        value={input.jumlah}
                        onValueChange={(value) =>
                          handleJumlahFasilitasChange(value, index)
                        }
                        type="number"
                        label={`Jumlah ${index + 1}`}
                        className="ml-2"
                      />
                    </div>
                    {index > 0 && (
                      <div
                        className="mt-2"
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          color="error"
                          onPress={() => handleRemoveFasilitas(index)}
                        >
                          <MdCancel />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <Link href="#" color="primary" onClick={handleAddFasilitas}>
                  Tambah Fasilitas
                </Link>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onClick={() => setIsOpen3(false)}
              >
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  tambahFasilitas();
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
         
    </div>
  );
}
