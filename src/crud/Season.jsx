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
  { name: "Nama Season", uid: "nama_season" },
  { name: "Tanggal Mulai", uid: "tanggal_mulai" },
  { name: "Tanggal Selesai", uid: "tanggal_selesai" },
  { name: "Jenis Season", uid: "jenis_season" },
  { name: "Edit", uid: "update" },
  { name: "Hapus", uid: "delete" },
];

export function Season() {
  const [season, setSeason] = useState([]);
  const [idSeason, setIdSeason] = useState();
  const [namaSeason, setNamaSeason] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [jenisSeason, setJenisSeason] = useState("");
  const [searchSeason, setSearch] = useState([]);
  const [SeasonForSearch, setSeasonSearch] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const updateSeason = () => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin mengupdate data season?"
    );
    if (confirmation) {
      instance
        .put(
          `/season/${idSeason}`,
          {
            nama_season: namaSeason,
            tanggal_mulai: tanggalMulai,
            tanggal_selesai: tanggalSelesai,
            jenis_season: jenisSeason,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          getAllSeason();
          onOpenChange(false);
          setNamaSeason("");
          setTanggalMulai("");
          setTanggalSelesai("");
          setJenisSeason("");
          alert("Berhasil mengupdate data season");
        })
        .catch((error) => {
          alert(
            "Gagal mengupdate data season: " +
              JSON.stringify(error.response.data.message)
          );
          console.error("Gagal mengupdate data season:", error);
        });
    }
  };

  const deleteSeason = (id) => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin menghapus data season ini?"
    );

    if (confirmation) {
      instance
        .delete(`/season/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          getAllSeason();
        })
        .catch((error) => {
          alert(
            "Gagal menghapus data season: " +
              JSON.stringify(error.response.data.message)
          );
          console.error("Gagal menghapus data season:", error);
        });
    }
  };

  function onEdit(season) {
    setIdSeason(season.id_season);
    setNamaSeason(season.nama_season);
    setTanggalMulai(season.tanggal_mulai);
    setTanggalSelesai(season.tanggal_selesai);
    setJenisSeason(season.jenis_season);
    onOpenChange(true);
  }

  const addSeason = () => {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin menambah data season?"
    );
    if (confirmation) {
      instance
        .post(
          "/season",
          {
            nama_season: namaSeason,
            tanggal_mulai: tanggalMulai,
            tanggal_selesai: tanggalSelesai,
            jenis_season: jenisSeason,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          getAllSeason();
          onOpenChange(false);
          alert("Berhasil menambah data season");
        })
        .catch((error) => {
          alert(
            "Gagal menambah data season: " +
              JSON.stringify(error.response.data.message)
          );
          console.error("Gagal menambah data season:", error);
        });
    }
  };

  function getAllSeason() {
    instance
      .get("/season", {})
      .then((response) => {
        setSeason(response.data.data);
        setSeasonSearch(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error(
          "Gagal memuat data season: " +
            JSON.stringify(error.response.data.message)
        );
      });
  }

  useEffect(() => {
    getAllSeason();
  }, []);

  useEffect(() => {
    if (!searchSeason) {
      setSeasonSearch(season);
      return;
    }
    const SeasonResult = season.filter((row) => {
      return (
        row.id_season
          ?.toString()
          .toLowerCase()
          .includes(searchSeason?.trim()?.toLowerCase()) ||
        row.nama_season
          ?.toLowerCase()
          .includes(searchSeason?.trim()?.toLowerCase()) ||
        row.tanggal_mulai
          ?.toString()
          .toLowerCase()
          .includes(searchSeason?.trim()?.toLowerCase()) ||
        row.tanggal_selesai
          ?.toString()
          .toLowerCase()
          .includes(searchSeason?.trim()?.toLowerCase()) ||
        row.jenis_season
          ?.toString()
          .toLowerCase()
          .includes(searchSeason?.trim()?.toLowerCase())
      );
    });
    setSeasonSearch(SeasonResult);
  }, [searchSeason]);

  const renderCell = (Season, columnKey) => {
    const cellValue = Season[columnKey];

    switch (columnKey) {
      case "nama_season":
        return cellValue;
      case "tanggal_mulai":
        return cellValue;
      case "tanggal_selesai":
        return cellValue;
      case "jenis_season":
        return cellValue;
      case "update":
        return (
          <div>
            <Tooltip content="Edit Season">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <MdEdit onClick={() => onEdit(Season)} />
              </span>
            </Tooltip>
          </div>
        );
      case "delete":
        return (
          <div>
            <Tooltip color="danger" content="Delete Season">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDelete onClick={() => deleteSeason(Season.id_season)} />
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
        <h1 className="text-4xl font-bold text-center mb-10">List Season</h1>
        <div className="flex justify-between mb-2">
          <Input
            endContent={<MdSearch />}
            className="mb-5 w-1/2"
            placeholder="Search"
            value={searchSeason}
            onValueChange={setSearch}
          />
          <Button
            endContent={<MdAdd />}
            onPress={() => {
              setIdSeason("");
              setNamaSeason("");
              setTanggalMulai("");
              setTanggalSelesai("");
              setJenisSeason("");
              onOpen();
            }}
            color="primary"
            className="mb-5 float-right"
          >
            Add Season
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
            items={SeasonForSearch || []}
            emptyContent={"No rows to display."}
          >
            {(item) => (
              <TableRow key={item.id_season}>
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
                  Season
                </ModalHeader>
                <ModalBody>
                  <h1 className="ml-2">Nama Season</h1>
                  <Input
                    value={namaSeason}
                    onValueChange={setNamaSeason}
                    type="text"
                    placeholder="Enter Nama Season"
                  />
                  <h1 className="ml-2">Tanggal Mulai</h1>
                  <Input
                    value={tanggalMulai}
                    onValueChange={setTanggalMulai}
                    type="date"
                  />
                  <h1 className="ml-2">Tanggal Selesai</h1>
                  <Input
                    value={tanggalSelesai}
                    onValueChange={setTanggalSelesai}
                    type="date"
                    placeholder="Enter Tanggal Selesai"
                  />
                  <h1 className="ml-2">Jenis Season</h1>
                  <Input
                    value={jenisSeason}
                    onValueChange={setJenisSeason}
                    type="text"
                    placeholder="Enter Jenis Season"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      if (idSeason) {
                        updateSeason();
                      } else {
                        addSeason();
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
