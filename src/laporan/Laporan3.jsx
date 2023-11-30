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
import { Grafik2 } from "./Grafik2";
import { NavBarGM } from "../Components/NavBarGM";

const columns = [
  { name: "No", uid: "no" },
  { name: "Jenis Kamar", uid: "jenis_kamar" },
  { name: "Grup", uid: "grup" },
  { name: "Personal", uid: "personal" },
  { name: "Total", uid: "total" },
];
export function Laporan3() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    instance
      .get("/laporan3")
      .then((response) => {
        const data = response.data.data.map((item, index) => ({
          ...item,
          no: index + 1,
        }));
        setData(data);
        const sumJumlah = data.reduce(
          (total, item) => total + parseInt(item.total, 10),
          0
        );
        setTotal(sumJumlah);
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
          LAPORAN JUMLAH TAMU
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
        <div style={{ textAlign: "right" }}>
          <p className="my-2 font-semibold">Total : {total}</p>
        </div>
        <Grafik2 />

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
