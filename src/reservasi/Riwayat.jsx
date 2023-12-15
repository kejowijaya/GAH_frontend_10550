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
  Button,
} from "@nextui-org/react";
import instance from "../axios";
import { NavBar } from "../Components/NavBar";
import { MdSearch, MdCancel } from "react-icons/md";

const columns = [
  { name: "ID Booking", uid: "id_booking" },
  { name: "Tanggal Booking", uid: "tanggal_booking" },
  { name: "Tanggal Check In", uid: "tanggal_check_in" },
  { name: "Tanggal Check Out", uid: "tanggal_check_out" },
  { name: "Total Harga", uid: "total_harga" },
  { name: "Status", uid: "status" },
  { name: "Batal", uid: "batal" },
];

export function RiwayatReservasi() {
  const [transaksi, setTransaksi] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTransaksi, setSearch] = useState([]);
  const [TransaksiForSearch, setTransaksiSearch] = useState([]);

  function getRiwayatReservasi() {
    const id = localStorage.getItem("id_user");

    instance
      .get(`/riwayatTransaksi/${id}`, {})
      .then((response) => {
        setTransaksi(response.data.data);
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

  const cancel = (id_reservasi) => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin membatalkan reservasi ini?"
    );

    if (confirmation) {
      instance
        .post(`/batal/${id_reservasi}`, {})
        .then((response) => {
          alert(JSON.stringify(response.data.message));
          getRiwayatReservasi();
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

  const renderCell = (Transaksi, columnKey) => {
    const cellValue = Transaksi[columnKey];

    switch (columnKey) {
      case "id_booking":
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
      <NavBar />
      <div className="p-16">
        <h1 className="text-4xl font-bold text-center mb-10">
          Riwayat Reservasi
        </h1>
        <div className="flex justify-between mb-2">
          <Input
            endContent={<MdSearch />}
            className="mb-5 w-1/2"
            placeholder="Search"
            value={searchTransaksi}
            onValueChange={setSearch}
          />
          <Button color="primary" onClick={filterBatalData}>
            Filter Data yang Bisa Dibatalkan
          </Button>
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
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
