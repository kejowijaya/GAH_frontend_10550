/* eslint-disable no-case-declarations */
import { useState, useEffect } from "react";
import {
  Input,
  Select,
  SelectItem,
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
  { name: "Season", uid: "id_season" },
  { name: "Jenis Kamar", uid: "id_jenis" },
  { name: "Perubahan Tarif", uid: "perubahan_tarif" },
  { name: "Edit", uid: "update" },
  { name: "Hapus", uid: "delete" },
];

export function Tarif() {
  const [tarif, setTarif] = useState([]);
  const [idTarif, setIdTarif] = useState();
  const [idSeason, setIdSeason] = useState("");
  const [idJenisKamar, setIdJenisKamar] = useState("");
  const [perubahanTarif, setPerubahanTarif] = useState("");
  const [jenisKamar, setJenisKamar] = useState([]);
  const [season, setSeason] = useState([]);
  const [searchTarif, setSearch] = useState([]);
  const [TarifForSearch, setTarifSearch] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const updateTarif = () => {
    const idJenisKamarValue = [...idJenisKamar];
    const idSeasonValue = [...idSeason];
    const confirmation = window.confirm(
      "Apakah anda yakin ingin mengupdate data tarif?"
    );
    if (confirmation) {
      instance
        .put(
          `/tarif/${idTarif}`,
          {
            id_season: idSeasonValue[0],
            id_jenis: idJenisKamarValue[0],
            perubahan_tarif: perubahanTarif,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          getAllTarif();
          onOpenChange(false);
          setIdSeason("");
          setIdJenisKamar("");
          setPerubahanTarif("");
          alert("Berhasil mengupdate data tarif");
        })
        .catch((error) => {
          alert("Gagal mengupdate data tarif:", error);
          console.error("Gagal mengupdate data tarif:", error);
        });
    }
  };

  const deleteTarif = (id) => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin menghapus data tarif ini?"
    );

    if (confirmation) {
      instance
        .delete(`/tarif/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          getAllTarif();
        })
        .catch((error) => {
          alert("Gagal menghapus data tarif:", error);
          console.error("Gagal menghapus data tarif:", error);
        });
    }
  };

  function onEdit(tarif) {
    setIdTarif(tarif.id_tarif);
    setIdSeason(tarif.id_season.toString());
    setIdJenisKamar(tarif.id_jenis.toString());
    setPerubahanTarif(tarif.perubahan_tarif);
    onOpenChange(true);
  }

  const addTarif = () => {
    const idJenisKamarValue = [...idJenisKamar];
    const idSeasonValue = [...idSeason];
    const confirmation = window.confirm(
      "Apakah anda yakin ingin menambah data tarif?"
    );
    if (confirmation) {
      instance
        .post(
          "/tarif",
          {
            id_season: idSeasonValue[0],
            id_jenis: idJenisKamarValue[0],
            perubahan_tarif: perubahanTarif,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          getAllTarif();
          onOpenChange(false);
          alert("Berhasil menambah data tarif");
        })
        .catch((error) => {
          alert("Gagal menambah data tarif:", error.response.data.message);
          console.error("Gagal menambah data tarif:", error);
        });
    }
  };

  function getAllTarif() {
    instance
      .get("/tarif", {})
      .then((response) => {
        setTarif(response.data.data);
        setTarifSearch(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat data tarif:", error);
      });
  }

  useEffect(() => {
    getAllTarif();
  }, []);

  useEffect(() => {
    if (!searchTarif) {
      setTarifSearch(tarif);
      return;
    }
    const TarifResult = tarif.filter((row) => {
      const matchedJenis = jenisKamar.find(
        (jenisItem) => jenisItem.id_jenis === row.id_jenis
      );
      const jenisKamarValue = matchedJenis ? matchedJenis.jenis_kamar : "";
      const matchedSeason = season.find(
        (seasonItem) => seasonItem.id_season === row.id_season
      );
      const jenisSeasonValue = matchedSeason ? matchedSeason.jenis_season : "";

      return (
        jenisKamarValue
          ?.toLowerCase()
          .includes(searchTarif?.trim()?.toLowerCase()) ||
        jenisSeasonValue
          ?.toString()
          .toLowerCase()
          .includes(searchTarif?.trim()?.toLowerCase()) ||
        row.perubahan_tarif
          ?.toString()
          .toLowerCase()
          .includes(searchTarif?.trim()?.toLowerCase())
      );
    });
    setTarifSearch(TarifResult);
  }, [searchTarif]);

  useEffect(() => {
    instance
      .get("/jenis_kamar")
      .then((response) => {
        setJenisKamar(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat data jenis kamar:", error);
      });
  }, []);

  useEffect(() => {
    instance
      .get("/season", {})
      .then((response) => {
        setSeason(response.data.data);
      })
      .catch((error) => {
        console.error("Gagal memuat data season:", error);
      });
  }, []);

  const renderCell = (Tarif, columnKey) => {
    const cellValue = Tarif[columnKey];

    switch (columnKey) {
      case "id_season":
        const matchedSeason = season.find(
          (seasonItem) => seasonItem.id_season === cellValue
        );
        return matchedSeason ? matchedSeason.jenis_season : cellValue;
      case "id_jenis":
        const matchedJenis = jenisKamar.find(
          (jenisItem) => jenisItem.id_jenis === cellValue
        );
        return matchedJenis ? matchedJenis.jenis_kamar : cellValue;
      case "perubahan_tarif":
        return cellValue;
      case "update":
        return (
          <div>
            <Tooltip content="Edit Tarif">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdEdit onClick={() => onEdit(Tarif)} />
              </span>
            </Tooltip>
          </div>
        );
      case "delete":
        return (
          <div>
            <Tooltip color="danger" content="Delete Tarif">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDelete onClick={() => deleteTarif(Tarif.id_tarif)} />
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
      <div className="p-12">
        <h1 className="text-4xl font-bold text-center mb-10">
          List Tarif Season
        </h1>
        <div className="flex justify-between mb-2">
          <Input
            endContent={<MdSearch />}
            className="mb-5 w-1/2"
            placeholder="Search"
            value={searchTarif}
            onValueChange={setSearch}
          />
          <Button
            endContent={<MdAdd />}
            onPress={() => {
              setIdTarif("");
              setIdSeason("");
              setIdJenisKamar("");
              setPerubahanTarif("");
              onOpen();
            }}
            color="primary"
            className="mb-5 float-right"
          >
            Add Tarif
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
            items={TarifForSearch || []}
            emptyContent={"No rows to display."}
          >
            {(item) => (
              <TableRow key={item.id_tarif}>
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
                <ModalHeader className="flex flex-col gap-2">Tarif</ModalHeader>
                <ModalBody>
                  <h1 className="ml-2">Jenis Kamar</h1>
                  <Select
                    items={jenisKamar || []}
                    type="text"
                    label="Enter Jenis Kamar"
                    selectedKeys={idJenisKamar}
                    onSelectionChange={setIdJenisKamar}
                  >
                    {(jenisKamar) => (
                      <SelectItem key={jenisKamar.id_jenis}>
                        {jenisKamar.jenis_kamar}
                      </SelectItem>
                    )}
                  </Select>
                  <h1 className="ml-2">Season</h1>
                  <Select
                    items={season || []}
                    type="text"
                    label="Enter Season"
                    selectedKeys={idSeason}
                    onSelectionChange={setIdSeason}
                  >
                    {(season) => (
                      <SelectItem key={season.id_season}>
                        {season.jenis_season}
                      </SelectItem>
                    )}
                  </Select>
                  <h1 className="ml-2">Perubahan Tarif</h1>
                  <Input
                    value={perubahanTarif}
                    onValueChange={setPerubahanTarif}
                    type="number"
                    placeholder="Enter Perubahan Tarif"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (idTarif) {
                        updateTarif();
                      } else {
                        addTarif();
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
