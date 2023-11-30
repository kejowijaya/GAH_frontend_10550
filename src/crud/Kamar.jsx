/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Select,
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
} from "@nextui-org/react";
import instance from "../axios";
import { MdAdd, MdEdit, MdDelete, MdSearch } from "react-icons/md";
import { NavBarAdmin } from "../Components/NavBarAdmin";

const columns = [
  { name: "No Kamar", uid: "nomor_kamar" },
  { name: "Jenis Kamar", uid: "id_jenis" },
  { name: "Edit", uid: "update" },
  { name: "Hapus", uid: "delete" },
];

export function Kamar() {
  const [rooms, setRooms] = useState([]);
  const [nomor_kamar, setNomorKamar] = useState();
  const [id_jenis, setIdJenisKamar] = useState("");
  const [jenis_kamar, setJenisKamar] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchKamar, setSearch] = useState([]);
  const [roomsForSearch, setRoomsSearch] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  function getAllRooms() {
    instance
      .get("/kamar", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRooms(response.data.data);
        setRoomsSearch(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal mendapatkan data kamar:", error);
      });
  }

  const addRoom = () => {
    const idJenisKamarValue = [...id_jenis];
    const confirmation = window.confirm(
      "Apakah anda yakin ingin menambahkan data kamar?"
    );

    if (confirmation) {
      instance
        .post(
          "/kamar",
          {
            nomor_kamar: nomor_kamar,
            id_jenis: idJenisKamarValue[0],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          getAllRooms();
          onOpenChange(false);
          alert("Berhasil menambahkan data kamar");
        })
        .catch((error) => {
          alert(
            "gagal menambahkan data kamar: " +
              JSON.stringify(error.response.data.message)
          );
          console.error("Gagal menambahkan data kamar:", error);
        });
    }
  };

  const updateRoom = () => {
    const idJenisKamarValue = [...id_jenis];
    const confirmation = window.confirm(
      "Apakah anda yakin ingin mengupdate data kamar?"
    );
    if (confirmation) {
      instance
        .put(
          `/kamar/${nomor_kamar}`,
          {
            nomor_kamar: nomor_kamar,
            id_jenis: idJenisKamarValue[0],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          getAllRooms();
          onOpenChange(false);
          setNomorKamar("");
          setIdJenisKamar("");
        })
        .catch((error) => {
          alert(
            "Gagal mengupdate data kamar: " +
              JSON.stringify(error.response.data.message)
          );
          console.error("Gagal mengupdate data kamar:", error);
        });
    }
  };

  function onEdit(kamar) {
    setIsEditMode(true);
    setNomorKamar(kamar.nomor_kamar);
    setIdJenisKamar(new Set([kamar.id_jenis.toString()]));
    onOpenChange(true);
  }

  const deleteRoom = (id) => {
    const confirmation = window.confirm(
      "Apakah Anda yakin ingin menghapus kamar ini?"
    );

    if (confirmation) {
      instance
        .delete(`/kamar/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          getAllRooms();
        })
        .catch((error) => {
          alert(
            "Gagal menghapus data kamar: " +
              JSON.stringify(error.response.data.message)
          );
          console.error("Gagal menghapus data kamar:", error);
        });
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  useEffect(() => {
    instance
      .get("/kamar")
      .then((response) => {
        const jenisKamarDariResponse = response.data.data.map(
          (item) => item.jenis_kamar
        );

        const uniqueJenisKamar = [
          ...new Map(
            jenisKamarDariResponse.map((item) => [item.id_jenis, item])
          ).values(),
        ];

        setJenisKamar(uniqueJenisKamar);
      })
      .catch((error) => {
        console.error("Gagal memuat data kamar:", error);
      });
  }, []);

  useEffect(() => {
    if (!searchKamar) {
      setRoomsSearch(rooms);
      return;
    }
    const roomsResult = rooms.filter((row) => {
      const matchedJenis = jenis_kamar.find(
        (jenisItem) => jenisItem.id_jenis === row.id_jenis
      );
      const jenisKamarValue = matchedJenis ? matchedJenis.jenis_kamar : "";

      return (
        row.nomor_kamar
          ?.toString()
          .toLowerCase()
          .includes(searchKamar?.trim()?.toLowerCase()) ||
        jenisKamarValue
          ?.toString()
          .toLowerCase()
          .includes(searchKamar?.trim()?.toLowerCase())
      );
    });
    setRoomsSearch(roomsResult);
  }, [searchKamar]);

  const renderCell = (kamar, columnKey) => {
    const cellValue = kamar[columnKey];

    switch (columnKey) {
      case "nomor_kamar":
        return cellValue;
      case "id_jenis":
        const matchedJenis = jenis_kamar.find(
          (jenisItem) => jenisItem.id_jenis === cellValue
        );
        return matchedJenis ? matchedJenis.jenis_kamar : cellValue;
      case "update":
        return (
          <div>
            <Tooltip content="Edit kamar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdEdit onClick={() => onEdit(kamar)} />
              </span>
            </Tooltip>
          </div>
        );
      case "delete":
        return (
          <div>
            <Tooltip color="danger" content="Delete kamar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDelete onClick={() => deleteRoom(kamar.nomor_kamar)} />
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
      <NavBarAdmin />
      <div className="p-12">
        <h1 className="text-5xl font-bold text-center mb-20">List Kamar</h1>
        <div className="flex justify-between mb-2">
          <Input
            endContent={<MdSearch />}
            className="mb-7 w-1/2"
            placeholder="Search"
            value={searchKamar}
            onValueChange={setSearch}
          />
          <Button
            endContent={<MdAdd />}
            onPress={() => {
              setNomorKamar("");
              setIdJenisKamar("");
              setIsEditMode(false);
              onOpen();
            }}
            color="primary"
            className="mb-5 float-right"
          >
            Add Room
          </Button>
        </div>
        <Table cellPadding="" className="">
          <TableHeader columns={columns} className="">
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
            items={roomsForSearch || []}
            emptyContent={"No rows to display."}
          >
            {(item) => (
              <TableRow cellPadding="20" key={item.nomor_kamar}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Room</ModalHeader>
                <ModalBody>
                  <h1 className="ml-2">Nomor Kamar</h1>
                  <Input
                    type="text"
                    value={nomor_kamar}
                    onChange={(event) => setNomorKamar(event.target.value)}
                    placeholder="Enter Nomor Kamar"
                    disabled={isEditMode}
                  />
                  <h1 className="ml-2">Jenis Kamar</h1>
                  <Select
                    items={jenis_kamar || []}
                    type="text"
                    placeholder="Enter Jenis Kamar"
                    selectedKeys={id_jenis}
                    onSelectionChange={setIdJenisKamar}
                  >
                    {jenis_kamar.map((item) => (
                      <SelectItem key={item.id_jenis} value={item.id_jenis}>
                        {item.jenis_kamar}
                      </SelectItem>
                    ))}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (isEditMode) {
                        updateRoom();
                      } else {
                        addRoom();
                      }
                    }}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
