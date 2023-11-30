import { useState, useEffect, useMemo } from "react";
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
  Switch,
  useDisclosure,
  Pagination,
  getKeyValue,
  Chip,
  Select,
  SelectItem,
  Link,
} from "@nextui-org/react";
import instance from "../axios";
import { NavBarFO } from "../Components/NavBarFO";
import { MdSearch, MdCancel, MdOutlinePayment, MdAdd } from "react-icons/md";
import { LiaEyeSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const columns = [
  { name: "ID Reservasi", uid: "id_booking" },
  { name: "Nama Customer", uid: "nama_customer" },
  { name: "Tanggal Booking", uid: "tanggal_booking" },
  { name: "Tanggal Check In", uid: "tanggal_check_in" },
  { name: "Tanggal Check Out", uid: "tanggal_check_out" },
  { name: "Total Harga", uid: "total_harga" },
  { name: "Status", uid: "status" },
  { name: "Action", uid: "check_in" },
  { name: "Fasilitas", uid: "fasilitas" },
];

export function DaftarReservasi() {
  const [transaksi, setTransaksi] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [idReservasi, setIdReservasi] = useState();
  const [totalHarga, setTotalHarga] = useState();
  const [uang, setUang] = useState(0);
  const [searchTransaksi, setSearch] = useState([]);
  const [TransaksiForSearch, setTransaksiSearch] = useState([]);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const { onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onOpenChange: onOpenChange3,
    onClose: onClose3,
  } = useDisclosure();
  const [fasilitasTambahan, setFasilitasTambahan] = useState([]);
  const [selectedReservasiId, setSelectedReservasiId] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = (idReservasi) => {
    setSelectedReservasiId(idReservasi);
    onOpenChange3(true);
  };

  const [fasilitasInputs, setFasilitasInputs] = useState([
    { id_fasilitas: "", jumlah: "" },
  ]);

  function getRiwayatReservasi() {
    instance
      .get("/reservasi", {})
      .then((response) => {
        setTransaksi(response.data.data);
        setTransaksiSearch(response.data.data);
        setIdReservasi(response.data.data.id_reservasi);
      })
      .catch((error) => {
        alert(
          "Gagal memuat riwayat reservasi : " +
            JSON.stringify(error.response.data.message)
        );
        console.error(
          "Gagal memuat  riwayat reservasi: " +
            JSON.stringify(error.response.data.message)
        );
      });
  }

  useEffect(() => {
    getRiwayatReservasi();
  }, []);

  const pages = Math.ceil(transaksi.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return transaksi.slice(start, end);
  }, [page, transaksi]);

  useEffect(() => {
    if (!searchTransaksi) {
      setTransaksiSearch(transaksi);
      return;
    }
    const TransaksiResult = transaksi.filter((row) => {
      return (
        row.id_booking
          ?.toString()
          .toLowerCase()
          .includes(searchTransaksi?.trim()?.toLowerCase()) ||
        row.tanggal_booking
          ?.toLowerCase()
          .includes(searchTransaksi?.trim()?.toLowerCase()) ||
        row.customer.nama
          ?.toLowerCase()
          .includes(searchTransaksi?.trim()?.toLowerCase())
      );
    });
    setTransaksiSearch(TransaksiResult);
  }, [searchTransaksi]);

  const filterBisaCheckIn = () => {
    const filtered = transaksi.filter((row) => {
      return row.status === "Sudah DP";
    });
    setTransaksiSearch(filtered);
  };

  const switchBisaCheckIn = () => {
    setIsFilterOn(!isFilterOn);
    if (!isFilterOn) {
      filterBisaCheckIn();
    } else {
      setTransaksiSearch(transaksi);
    }
  };

  const cancel = (id_reservasi) => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin membatalkan reservasi ini?"
    );

    if (confirmation) {
      instance
        .post(`/batal/${id_reservasi}`, {})
        .then((response) => {
          alert(JSON.stringify(response.data.message));
        })
        .catch((error) => {
          alert(
            "Gagal membatalkan reservasi : " +
              JSON.stringify(error.response.data.message)
          );
          console.error(
            "Gagal membatalkan reservasi: " +
              JSON.stringify(error.response.data.message)
          );
        });
    }
  };

  function onEdit(transaksi) {
    setIdReservasi(transaksi.id_reservasi);
    onOpenChange3(true);
  }

  const bayarReservasi = (id_reservasi) => {
    id_reservasi = localStorage.getItem("id_reservasi");
    instance
      .post(`/bayarLunas/${id_reservasi}`, {
        uang,
      })
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        console.log(res.data.data);
        onOpenChange(false);
        alert("Pembayaran Berhasil");
        alert("Kembalian: " + res.data.kembalian);
        pelunasan(id_reservasi);
      })
      .catch((err) => {
        console.log(err.response);
        alert(
          "Pembayaran gagal karena " + JSON.stringify(err.response.data.message)
        );
      });
  };

  const cekIn = (id_reservasi, nama) => {
    const confirmation = window.confirm(
      "Apakah anda yakin " + nama + " akan melakukan check in?"
    );
    if (confirmation) {
      instance
        .post(`/cekIn/${id_reservasi}`, {})
        .then((response) => {
          alert(JSON.stringify(response.data.message));
          getRiwayatReservasi();
        })
        .catch((error) => {
          alert(
            "Gagal check in : " + JSON.stringify(error.response.data.message)
          );
          console.error(
            "Gagal check in : " + JSON.stringify(error.response.data.message)
          );
        });
    }
  };

  const cekOut = (id_reservasi, nama) => {
    const confirmation = window.confirm(
      "Apakah anda yakin " + nama + " akan melakukan check out?"
    );
    if (confirmation) {
      instance
        .post(`/cekOut/${id_reservasi}`, {
          id_fo: JSON.parse(localStorage.getItem("user"))?.id_pegawai,
        })
        .then((response) => {
          alert(JSON.stringify(response.data.message));
          getRiwayatReservasi();
        })
        .catch((error) => {
          alert(
            "Gagal check out : " + JSON.stringify(error.response.data.message)
          );
          console.error(
            "Gagal check out : " + JSON.stringify(error.response.data.message)
          );
        });
    }
  };

  const pelunasan = (id_reservasi) => {
    instance
      .post(`/pelunasan/${id_reservasi}`, {})
      .then((response) => {
        alert(JSON.stringify(response.data.message));
        getRiwayatReservasi();
      })
      .catch((error) => {
        alert(
          "Gagal melakukan pelunasan : " +
            JSON.stringify(error.response.data.message)
        );
        console.error(
          "Gagal melakukan pelunasan : " +
            JSON.stringify(error.response.data.message)
        );
      });
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

  const tambahFasilitas = (id_reservasi) => {
    instance
      .post("/tambahLayanan", {
        id_reservasi,
        fasilitas: fasilitasInputs,
      })
      .then((res) => {
        console.log(res.data);
        alert("Reservasi berhasil ditambahkan");
        onOpenChange3(false);
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Gagal menambahkan fasilitas : " +
            JSON.stringify(err.response.data.message)
        );
      });
  };

  const handleFasilitasChange = (selected, index) => {
    const updatedInputs = [...fasilitasInputs];
    const isDuplicate = fasilitasInputs
      .slice(0, index)
      .some((item) => item.id_fasilitas == selected.currentKey);

    if (isDuplicate) {
      alert(
        "Fasilitas ini sudah dipilih sebelumnya. Pilih fasilitas yang berbeda."
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

  const pindahHalaman = (id_reservasi) => {
    localStorage.setItem("id_reservasi", id_reservasi);
    navigate("/notaLunas");
  };

  const statusColorMap = {
    "Belum DP": "warning",
    "Sudah DP": "success",
    "Check In": "primary",
    "Check Out": "secondary",
    Batal: "danger",
  };

  const renderCell = (Transaksi, columnKey) => {
    const cellValue = Transaksi[columnKey];

    switch (columnKey) {
      case "id_booking":
        return cellValue;
      case "nama_customer":
        return cellValue;
      case "tanggal_booking":
        return cellValue;
      case "tanggal_check_in":
        return cellValue;
      case "tanggal_check_out":
        return cellValue;
      case "total_harga":
        return cellValue;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[Transaksi.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "check_in":
        return (
          <div>
            {Transaksi.status === "Check In" ? (
              <Tooltip content="Check Out">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Button
                    onClick={() =>
                      cekOut(Transaksi.id_reservasi, Transaksi.customer.nama)
                    }
                    color="secondary"
                  >
                    Check Out
                  </Button>
                </span>
              </Tooltip>
            ) : Transaksi.status === "Check Out" ? (
              <Tooltip content="Lunas">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Button
                    onClick={() => {
                      setOpen(true);
                      localStorage.setItem(
                        "id_reservasi",
                        Transaksi.id_reservasi
                      );
                    }}
                    color="warning"
                  >
                    Lunas
                  </Button>
                </span>
              </Tooltip>
            ) : Transaksi.status === "Selesai" ? (
              <Tooltip content="Lihat Nota Lunas">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <LiaEyeSolid
                    onClick={() => pindahHalaman(Transaksi.id_reservasi)}
                  />
                </span>
              </Tooltip>
            ) : (
              <Tooltip content="Check In">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  {Transaksi.status === "Sudah DP" ? (
                    <Button
                      onClick={() =>
                        cekIn(Transaksi.id_reservasi, Transaksi.customer.nama)
                      }
                      color="primary"
                    >
                      Check In
                    </Button>
                  ) : (
                    <Button
                      onClick={() =>
                        cekIn(Transaksi.id_reservasi, Transaksi.customer.nama)
                      }
                      color="primary"
                      isDisabled
                    >
                      Check In
                    </Button>
                  )}
                </span>
              </Tooltip>
            )}
          </div>
        );

      case "fasilitas":
        return (
          <div>
            <Tooltip content="Tambah Fasilitas">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Button
                  color="success"
                  onClick={() => handleOpenModal(Transaksi.id_reservasi)}
                >
                  <MdAdd />
                </Button>
              </span>
            </Tooltip>
          </div>
        );

      default:
        return cellValue;
    }
  };

  return (
    <div>
      <NavBarFO />
      <div className="p-16">
        <h1 className="text-4xl font-bold text-center mb-14">
          Daftar Reservasi
        </h1>
        <div className="flex gap-6s mb-2">
          <div className="flex items-center w-1/2">
            <Input
              endContent={<MdSearch />}
              className="mb-5"
              placeholder="Search"
              value={searchTransaksi}
              onValueChange={setSearch}
            />
          </div>
          <div className="flex items-center ml-auto">
            <Switch
              color="primary"
              onValueChange={switchBisaCheckIn}
              value={isFilterOn}
              className="mr-6"
            >
              Check In
            </Switch>
          </div>

          <Modal
            placement="center"
            size="2xl"
            isOpen={isOpen3}
            onOpenChange={onOpenChange3}
            scrollBehavior="inside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  {" "}
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
                                <SelectItem
                                  key={fasilitasTambahan.id_fasilitas}
                                >
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
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
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
                      <Link color="primary" onClick={handleAddFasilitas}>
                        Tambah Fasilitas
                      </Link>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="error" onClick={onOpenChange3}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      onPress={() => tambahFasilitas(selectedReservasiId)}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <Modal
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            width="600"
            height="350"
          >
            <ModalContent>
              <ModalHeader>Pembayaran Uang Pelunasan</ModalHeader>
              <ModalBody>
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
                <Button
                  color="primary"
                  onClick={() => bayarReservasi(idReservasi)}
                >
                  Bayar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        <Table
          aria-label="Example table with custom cells"
          //   bottomContent={
          //     <div className="flex w-full justify-center">
          //       <Pagination
          //         isCompact
          //         showControls
          //         showShadow
          //         color="secondary"
          //         page={page}
          //         total={pages}
          //         onChange={(page) => setPage(page)}
          //       />
          //     </div>
          //   }
        >
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
          <TableBody
            items={TransaksiForSearch || []}
            emptyContent={"No rows to display."}
          >
            {(item) => (
              <TableRow
                key={item.id_reservasi}
                onClick={() => handleRowClick(item.id_reservasi)}
              >
                {(columnKey) => (
                  <TableCell>
                    {columnKey == "nama_customer"
                      ? item.customer.nama
                      : renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
