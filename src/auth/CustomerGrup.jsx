import {
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import instance from "../axios";
import { NavBarSM } from "../Components/NavBarSM";
import { MdSearch } from "react-icons/md";

const columns = [
  { name: "ID Customer", uid: "id_customer" },
  { name: "No Identitas", uid: "no_identitas" },
  { name: "Nama Institusi", uid: "nama_institusi" },
  { name: "Nama", uid: "nama" },
  { name: "Alamat", uid: "alamat" },
  { name: "Nomor Telepon", uid: "nomor_telepon" },
  { name: "Email", uid: "email" },
  //{ name: "Actions", uid: "actions" },
];

export function Grup() {
  const [customerGrup, setCustomerGrup] = useState([]);
  const [searchCustomerGrup, setSearch] = useState([]);
  const [CustomerForSearch, setCustomerSearch] = useState([]);

  useEffect(() => {
    instance
      .get("/customerGrup")
      .then((response) => {
        setCustomerGrup(response.data.data);
        setCustomerSearch(response.data.data);
        console.log(response.data.data);
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

  useEffect(() => {
    if (!searchCustomerGrup) {
      setCustomerSearch(customerGrup);
      return;
    }
    const result = customerGrup.filter((row) => {
      return (
        row.id_customer
          ?.toString()
          .toLowerCase()
          .includes(searchCustomerGrup?.trim()?.toLowerCase()) ||
        row.nama
          ?.toLowerCase()
          .includes(searchCustomerGrup?.trim()?.toLowerCase()) ||
        row.nama_institusi
          ?.toString()
          .toLowerCase()
          .includes(searchCustomerGrup?.trim()?.toLowerCase()) ||
        row.email
          ?.toString()
          .toLowerCase()
          .includes(searchCustomerGrup?.trim()?.toLowerCase())
      );
    });
    setCustomerSearch(result);
  }, [searchCustomerGrup]);

  const renderCell = (customer, columnKey) => {
    const cellValue = customer[columnKey];

    switch (columnKey) {
      case "id_customer":
        return cellValue;
      case "nomor_identitas":
        return cellValue;
      case "nama_institusi":
        return cellValue;
      case "nama":
        return cellValue;
      case "alamat":
        return cellValue;
      case "nomor_telepon":
        return cellValue;
      case "email":
        return cellValue;

      default:
        return cellValue;
    }
  };

  return (
    <div>
      <NavBarSM />
      <div className="p-16">
        <h1 className="text-4xl font-bold text-center mb-10">
          List Customer Group
        </h1>
        <div className="flex justify-between mb-2">
          <Input
            endContent={<MdSearch />}
            className="mb-5 w-1/2"
            placeholder="Search"
            value={searchCustomerGrup}
            onValueChange={setSearch}
          />
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
            items={CustomerForSearch || []}
            emptyContent={"No rows to display."}
          >
            {(item) => (
              <TableRow key={item.id_customer}>
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
