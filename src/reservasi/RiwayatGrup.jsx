import { useState, useEffect } from "react";
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
} from "@nextui-org/react";
import instance from "../axios";
import { NavBarFO } from "../Components/NavBarFO";
import { MdSearch, MdCancel, MdOutlinePayment } from "react-icons/md";
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
  { name: "Tanda Terima", uid: "bayar" },
  { name: "Batal", uid: "batal" },
];

export function RiwayatReservasiGrup() {
  const [transaksi, setTransaksi] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [idReservasi, setIdReservasi] = useState();
  const [totalHarga, setTotalHarga] = useState();
  const [uang, setUang] = useState(0);
  const [searchTransaksi, setSearch] = useState([]);
  const [TransaksiForSearch, setTransaksiSearch] = useState([]);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const navigate = useNavigate();

  function getRiwayatReservasi() {
    instance
      .get("/reservasiGrup", {})
      .then((response) => {
        setTransaksi(response.data.data);
        setCustomer(response.data.data.customer);
        setTransaksiSearch(response.data.data);
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

  const filterBatalData = () => {
    const filtered = transaksi.filter((row) => {
      return row.status === "Belum DP" || row.status === "Sudah DP";
    });
    setTransaksiSearch(filtered);
  };

  const switchBatalData = () => {
    setIsFilterOn(!isFilterOn);
    if (!isFilterOn) {
      filterBatalData();
    } else {
      setTransaksiSearch(transaksi);
    }
  };

  const filterBelumBayar = () => {
    const filtered = transaksi.filter((row) => {
      return row.status === "Belum DP";
    });
    setTransaksiSearch(filtered);
  };

  const switchBelumBayar = () => {
    setIsFilterOn(!isFilterOn);
    if (!isFilterOn) {
      filterBelumBayar();
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
    setTotalHarga(transaksi.total_harga);
    onOpenChange(true);
  }

  const bayarReservasi = (id_reservasi) => {
    instance
      .post(`/bayar/${id_reservasi}`, {
        uang,
      })
      .then((res) => {
        console.log(JSON.stringify(res, null, 2));
        console.log(res.data.data);
        onOpenChange(false);
        alert("Pembayaran Berhasil");
      })
      .catch((err) => {
        console.log(err.response);
        alert(
          "Pembayaran gagal karena " + JSON.stringify(err.response.data.message)
        );
      });
  };

  const pindahHalaman = (id_reservasi) => {
    localStorage.setItem("id_reservasi", id_reservasi);
    navigate("/tandaTerimaPersonal");
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
        return cellValue;
      case "bayar":
        return (
          <div>
            <Tooltip content="Tanda Terima">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <LiaEyeSolid
                  onClick={() => pindahHalaman(Transaksi.id_reservasi)}
                />
              </span>
            </Tooltip>
          </div>
        );
      case "batal":
        return (
          <div>
            <Tooltip content="Batalkan Reservasi">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdCancel onClick={() => cancel(Transaksi.id_reservasi)} />
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
          Daftar Reservasi Grup
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
              onValueChange={switchBelumBayar}
              value={isFilterOn}
              className="mr-6"
            >
              Filter Belum Bayar DP
            </Switch>
            <Switch
              color="primary"
              onValueChange={switchBatalData}
              value={isFilterOn}
            >
              Filter Bisa Dibatalkan
            </Switch>
          </div>

          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Bayar Reservasi</ModalHeader>
                  <ModalBody>
                    <h2 className="text-xl font-bold mb-2">
                      Total Harga {transaksi.total_harga}
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
                    <Button auto color="error" onPress={onClose}>
                      Tidak
                    </Button>
                    <Button
                      auto
                      color="success"
                      onPress={bayarReservasi(idReservasi)}
                    >
                      Ya
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <Table aria-label="Example table with custom cells">
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
              <TableRow key={item.id_reservasi}>
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
