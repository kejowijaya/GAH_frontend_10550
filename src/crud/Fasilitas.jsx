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
  useDisclosure,
} from "@nextui-org/react";
import instance from "../axios";
import { NavBarSM } from "../Components/NavBarSM";
import { MdEdit, MdDelete, MdSearch, MdAdd } from "react-icons/md";

const columns = [
  { name: "Nama Fasilitas", uid: "nama_fasilitas" },
  { name: "Harga Fasilitas", uid: "harga" },
  { name: "Satuan Fasilitas", uid: "satuan" },
  { name: "Edit", uid: "update" },
  { name: "Hapus", uid: "delete" },
];

export function Fasilitas() {
  const [fasilitass, setFasilitass] = useState([]);
  const [idFasilitas, setIdFasilitas] = useState();
  const [namaFasilitas, setNamaFasilitas] = useState("");
  const [satuanFasilitas, setSatuanFasilitas] = useState("");
  const [hargaFasilitas, setHargaFasilitas] = useState("");
  const [searchFasilitas, setSearch] = useState([]);
  const [FasilitasForSearch, setFasilitassSearch] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const updateFasilitas = () => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin mengupdate data fasilitas?"
    );
    if (confirmation) {
      instance
        .put(
          `/fasilitas/${idFasilitas}`,
          {
            nama_fasilitas: namaFasilitas,
            satuan: satuanFasilitas,
            harga: hargaFasilitas,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          getAllFasilitas();
          onOpenChange(false);
          setNamaFasilitas("");
          setSatuanFasilitas("");
          setHargaFasilitas("");
          alert("Berhasil mengupdate data fasilitas");
        })
        .catch((error) => {
          alert(
            "Gagal mengupdate data fasilitas: " +
              JSON.stringify(error.response.data.message)
          );
          console.error("Gagal mengupdate data fasilitas:", error);
        });
    }
  };

  const deleteFasilitas = (id) => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin menghapus data fasilitas ini?"
    );

    if (confirmation) {
      instance
        .delete(`/fasilitas/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          getAllFasilitas();
        })
        .catch((error) => {
          alert(
            "Gagal menghapus data fasilitas: " +
              JSON.stringify(error.response.data.message)
          );
          console.error("Gagal menghapus data fasilitas:", error);
        });
    }
  };

  function onEdit(fasilitas) {
    setIdFasilitas(fasilitas.id_fasilitas);
    setNamaFasilitas(fasilitas.nama_fasilitas);
    setSatuanFasilitas(fasilitas.satuan);
    setHargaFasilitas(fasilitas.harga);
    onOpenChange(true);
  }

  const addFasilitas = () => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin menambahkan data fasilitas?"
    );
    if (confirmation) {
      instance
        .post(
          "/fasilitas",
          {
            nama_fasilitas: namaFasilitas,
            satuan: satuanFasilitas,
            harga: hargaFasilitas,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          getAllFasilitas();
          onOpenChange(false);
          alert("Berhasil menambah data fasilitas");
        })
        .catch((error) => {
          alert(
            "Gagal menambah data fasilitas: ",
            +JSON.stringify(error.response.data.message)
          );
          console.error("Gagal menambah data fasilitas: ", error);
        });
    }
  };

  function getAllFasilitas() {
    instance
      .get("/fasilitas", {})
      .then((response) => {
        setFasilitass(response.data.data);
        setFasilitassSearch(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        alert(
          "Gagal memuat data fasilitas: " +
            JSON.stringify(error.response.data.message)
        );
        console.error(
          "Gagal memuat data fasilitas: " +
            JSON.stringify(error.response.data.message)
        );
      });
  }

  useEffect(() => {
    getAllFasilitas();
  }, []);

  useEffect(() => {
    if (!searchFasilitas) {
      setFasilitassSearch(fasilitass);
      return;
    }
    const FasilitassResult = fasilitass.filter((row) => {
      return (
        row.id_fasilitas
          ?.toString()
          .toLowerCase()
          .includes(searchFasilitas?.trim()?.toLowerCase()) ||
        row.nama_fasilitas
          ?.toLowerCase()
          .includes(searchFasilitas?.trim()?.toLowerCase()) ||
        row.satuan
          ?.toString()
          .toLowerCase()
          .includes(searchFasilitas?.trim()?.toLowerCase()) ||
        row.harga
          ?.toString()
          .toLowerCase()
          .includes(searchFasilitas?.trim()?.toLowerCase())
      );
    });
    setFasilitassSearch(FasilitassResult);
  }, [searchFasilitas]);

  const renderCell = (Fasilitas, columnKey) => {
    const cellValue = Fasilitas[columnKey];

    switch (columnKey) {
      case "nama_fasilitas":
        return cellValue;
      case "harga":
        return cellValue;
      case "satuan":
        return cellValue;
      case "update":
        return (
          <div>
            <Tooltip content="Edit Fasilitas">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdEdit onClick={() => onEdit(Fasilitas)} />
              </span>
            </Tooltip>
          </div>
        );
      case "delete":
        return (
          <div>
            <Tooltip color="danger" content="Delete Fasilitas">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDelete
                  onClick={() => deleteFasilitas(Fasilitas.id_fasilitas)}
                />
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
      <NavBarSM />
      <div className="p-16">
        <h1 className="text-4xl font-bold text-center mb-10">
          List Fasilitas Berbayar
        </h1>
        <div className="flex justify-between mb-2">
          <Input
            endContent={<MdSearch />}
            className="mb-5 w-1/2"
            placeholder="Search"
            value={searchFasilitas}
            onValueChange={setSearch}
          />
          <Button
            endContent={<MdAdd />}
            onPress={() => {
              setIdFasilitas("");
              setNamaFasilitas("");
              setSatuanFasilitas("");
              setHargaFasilitas("");
              onOpen();
            }}
            color="primary"
            className="mb-5 float-right"
          >
            Add Fasilitas
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
            items={FasilitasForSearch || []}
            emptyContent={"No rows to display."}
          >
            {(item) => (
              <TableRow key={item.id_fasilitas}>
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
                <ModalHeader className="flex flex-col gap-2">
                  Fasilitas
                </ModalHeader>
                <ModalBody>
                  <h1 className="ml-2">Nama Fasilitas</h1>
                  <Input
                    value={namaFasilitas}
                    onValueChange={setNamaFasilitas}
                    type="text"
                    placeholder="Enter Nama Fasilitas"
                  />
                  <h1 className="ml-2">Satuan Fasilitas</h1>
                  <Input
                    value={satuanFasilitas}
                    onValueChange={setSatuanFasilitas}
                    type="text"
                    placeholder="Enter Satuan Fasilitas"
                  />
                  <h1 className="ml-2">Harga Fasilitas</h1>
                  <Input
                    value={hargaFasilitas}
                    onValueChange={setHargaFasilitas}
                    type="number"
                    placeholder="Enter Harga Fasilitas"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (idFasilitas) {
                        updateFasilitas();
                      } else {
                        addFasilitas();
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
