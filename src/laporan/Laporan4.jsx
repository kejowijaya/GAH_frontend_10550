import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import instance from "../axios";
import { NavBarGM } from "../Components/NavBarGM";

const columns = [
  { name: "No", uid: "no" },
  { name: "Nama Customer", uid: "nama" },
  { name: "Jumlah Reservasi", uid: "jumlah_reservasi" },
  { name: "Total Pembayaran", uid: "total_pembayaran" },
];
export function Laporan4() {
  const [data, setData] = useState([]);

  useEffect(() => {
    instance
      .get("/laporan4")
      .then((response) => {
        const data = response.data.data.map((item, index) => ({
          ...item,
          no: index + 1,
        }));
        setData(data);
        console.log(data);
      })
      .catch((err) => {
        alert(
          "Gagal memuat data: " + JSON.stringify(err.response.data.message)
        );
        console.error(
          "Gagal memuat data: " + JSON.stringify(err.response.data.message)
        );
      });
  }, []);

  const renderCell = (data, columnKey) => {
    const cellValue = data[columnKey];

    switch (data) {
      case "no":
        return cellValue;
      case "bulan":
        return cellValue;
      case "personal":
        return cellValue;
      case "grup":
        return cellValue;
      case "total":
        return cellValue;

      default:
        return cellValue;
    }
  };
  return (
    <div>
      <NavBarGM />
      <div className="p-16">
        <h1 className="text-3xl font-bold text-center mb-10">
          LAPORAN 5 CUSTOMER RESERVASI TERBANYAK
        </h1>
        <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={data} emptyContent={"No rows to display."}>
            {(item, index) => (
              <TableRow key={item.no}>
                {columns.map((column) => (
                  <TableCell key={column.uid}>
                    {renderCell(item, column.uid)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div style={{ textAlign: "center" }}>
          <Button
            className="my-4"
            color="primary"
            onClick={() => window.print()}
          >
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
