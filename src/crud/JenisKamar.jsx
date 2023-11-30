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
import { NavBarAdmin } from "../Components/NavBarAdmin";
import { MdEdit, MdDelete, MdSearch, MdAdd } from "react-icons/md";

const columns = [
  { name: "Jenis Kamar", uid: "jenis_kamar" },
  { name: "Tipe Ranjang", uid: "tipe_ranjang" },
  { name: "Fasilitas", uid: "fasilitas" },
  { name: "Harga", uid: "harga" },
  { name: "Luas Kamar", uid: "luas_kamar" },
  { name: "Kapasitas", uid: "kapasitas" },
  { name: "Edit", uid: "update" },
  { name: "Hapus", uid: "delete" },
];

export function JenisKamar() {
  const [jenisKamars, setJenisKamars] = useState([]);
  const [idJenisKamar, setIdJenisKamar] = useState();
  const [namaJenisKamar, setNamaJenisKamar] = useState("");
  const [tipeRanjang, setTipeRanjang] = useState("");
  const [fasilitas, setFasilitas] = useState("");
  const [hargaJenisKamar, setHargaJenisKamar] = useState("");
  const [luasKamar, setLuasKamar] = useState("");
  const [kapasitas, setKapasitas] = useState("");
  const [searchJenisKamar, setSearch] = useState([]);
  const [JenisKamarForSearch, setJenisKamarsSearch] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const updateJenisKamar = () => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin mengupdate data jenis Kamar?"
    );
    if (confirmation) {
      instance
        .put(
          `/jenisKamar/${idJenisKamar}`,
          {
            jenis_kamar: namaJenisKamar,
            tipe_ranjang: tipeRanjang,
            fasilitas: fasilitas,
            harga: hargaJenisKamar,
            luas_kamar: luasKamar,
            kapasitas: kapasitas,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          getAllJenisKamar();
          onOpenChange(false);
          setNamaJenisKamar("");
          setTipeRanjang("");
          setFasilitas("");
          setHargaJenisKamar("");
          setLuasKamar("");
          setKapasitas("");
          alert("Berhasil mengupdate data jenis kamar");
        })
        .catch((error) => {
          alert(
            "Gagal mengupdate data jenisKamar: " +
              JSON.stringify(error.response.data.message)
          );
          console.error("Gagal mengupdate data jenisKamar:", error);
        });
    }
  };

  const deleteJenisKamar = (id) => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin menghapus data jenis Kamar ini?"
    );

    if (confirmation) {
      instance
        .delete(`/jenisKamar/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          getAllJenisKamar();
        })
        .catch((error) => {
          alert(
            "Gagal menghapus data jenisKamar: " +
              JSON.stringify(error.response.data.message)
          );
          console.error("Gagal menghapus data jenisKamar:", error);
        });
    }
  };

  function onEdit(jenisKamar) {
    setIdJenisKamar(jenisKamar.id_jenis);
    setNamaJenisKamar(jenisKamar.jenis_kamar);
    setTipeRanjang(jenisKamar.tipe_ranjang);
    setFasilitas(jenisKamar.fasilitas);
    setHargaJenisKamar(jenisKamar.harga);
    setLuasKamar(jenisKamar.luas_kamar);
    setKapasitas(jenisKamar.kapasitas);
    onOpenChange(true);
  }

  const addJenisKamar = () => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin menambahkan data jenisKamar?"
    );
    if (confirmation) {
      instance
        .post(
          "/jenisKamar",
          {
            jenis_kamar: namaJenisKamar,
            tipe_ranjang: tipeRanjang,
            fasilitas: fasilitas,
            harga: hargaJenisKamar,
            luas_kamar: luasKamar,
            kapasitas: kapasitas,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          getAllJenisKamar();
          onOpenChange(false);
          alert("Berhasil menambah data jenisKamar");
        })
        .catch((error) => {
          alert(
            "Gagal menambah data jenisKamar: ",
            +JSON.stringify(error.response.data.message)
          );
          console.error("Gagal menambah data jenisKamar: ", error);
        });
    }
  };

  function getAllJenisKamar() {
    instance
      .get("/jenisKamar", {})
      .then((response) => {
        setJenisKamars(response.data.data);
        setJenisKamarsSearch(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        alert(
          "Gagal memuat data jenisKamar: " +
            JSON.stringify(error.response.data.message)
        );
        console.error(
          "Gagal memuat data jenisKamar: " +
            JSON.stringify(error.response.data.message)
        );
      });
  }

  useEffect(() => {
    getAllJenisKamar();
  }, []);

  useEffect(() => {
    if (!searchJenisKamar) {
      setJenisKamarsSearch(jenisKamars);
      return;
    }
    const JenisKamarsResult = jenisKamars.filter((row) => {
      return (
        row.id_jenis
          ?.toString()
          .toLowerCase()
          .includes(searchJenisKamar?.trim()?.toLowerCase()) ||
        row.jenis_kamar
          ?.toLowerCase()
          .includes(searchJenisKamar?.trim()?.toLowerCase()) ||
        row.tipe_ranjang
          ?.toString()
          .toLowerCase()
          .includes(searchJenisKamar?.trim()?.toLowerCase()) ||
        row.fasilita
          ?.toString()
          .toLowerCase()
          .includes(searchJenisKamar?.trim()?.toLowerCase())
      );
    });
    setJenisKamarsSearch(JenisKamarsResult);
  }, [searchJenisKamar]);

  const renderCell = (JenisKamar, columnKey) => {
    const cellValue = JenisKamar[columnKey];

    switch (columnKey) {
      case "jenis_kamar":
        return cellValue;
      case "tipe_ranjang":
        return cellValue;
      case "fasilitas":
        return cellValue;
      case "harga":
        return cellValue;
      case "luas_kamar":
        return cellValue;
      case "kapasitas":
        return cellValue;
      case "update":
        return (
          <div>
            <Tooltip content="Edit Jenis Kamar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdEdit onClick={() => onEdit(JenisKamar)} />
              </span>
            </Tooltip>
          </div>
        );
      case "delete":
        return (
          <div>
            <Tooltip color="danger" content="Delete Jenis Kamar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDelete
                  onClick={() => deleteJenisKamar(JenisKamar.id_fasilitas)}
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
      <NavBarAdmin />
      <div className="p-16">
        <h1 className="text-4xl font-bold text-center mb-10">
          List Jenis Kamar
        </h1>
        <div className="flex justify-between mb-2">
          <Input
            endContent={<MdSearch />}
            className="mb-5 w-1/2"
            placeholder="Search"
            value={searchJenisKamar}
            onValueChange={setSearch}
          />
          <Button
            endContent={<MdAdd />}
            onPress={() => {
              setIdJenisKamar("");
              setNamaJenisKamar("");
              setTipeRanjang("");
              setFasilitas("");
              setLuasKamar("");
              setKapasitas("");
              setHargaJenisKamar("");
              onOpen();
            }}
            color="primary"
            className="mb-5 float-right"
          >
            Add Jenis Kamar
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
            items={JenisKamarForSearch || []}
            emptyContent={"No rows to display."}
          >
            {(item) => (
              <TableRow key={item.id_jenis}>
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
                  Jenis Kamar
                </ModalHeader>
                <ModalBody>
                  <h1 className="ml-2">Jenis Kamar</h1>
                  <Input
                    value={namaJenisKamar}
                    onValueChange={setNamaJenisKamar}
                    type="text"
                    placeholder="Enter Nama Jenis Kamar"
                  />
                  <h1 className="ml-2">Tipe Ranjang</h1>
                  <Input
                    value={tipeRanjang}
                    onValueChange={setTipeRanjang}
                    type="text"
                    placeholder="Enter Tipe Ranjang"
                  />
                  <h1 className="ml-2">Fasilitas Kamar</h1>
                  <Input
                    value={fasilitas}
                    onValueChange={setFasilitas}
                    type="text"
                    placeholder="Enter Fasilitas"
                  />
                  <h1 className="ml-2">Fasilitas Kamar</h1>
                  <Input
                    value={fasilitas}
                    onValueChange={setFasilitas}
                    type="text"
                    placeholder="Enter Fasilitas"
                  />
                  <h1 className="ml-2">Fasilitas Kamar</h1>
                  <Input
                    value={fasilitas}
                    onValueChange={setFasilitas}
                    type="text"
                    placeholder="Enter Fasilitas"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (idJenisKamar) {
                        updateJenisKamar();
                      } else {
                        addJenisKamar();
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
