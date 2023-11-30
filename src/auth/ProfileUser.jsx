import { useState, useEffect } from "react";
import instance from "../axios";
import { FaAngleLeft } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import {
  Card,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { NavBar } from "../Components/NavBar";
import { MdEdit } from "react-icons/md";

export function ProfileUser() {
  const [users, setUsers] = useState([]);
  const [id_user, setIdUser] = useState();
  const [no_identitas, setNoIdentitas] = useState("");
  const [nama, setNama] = useState("");
  const [nomor_telepon, setNomorTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [jenis_tamu, setJenisTamu] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const idUser = localStorage.getItem("id_user");

    instance
      .get(`/customer/${idUser}`, {})
      .then((res) => {
        console.log(res.data.data);
        setUsers(res.data.data);
        setEmail(res.data.data.email);
        setAlamat(res.data.data.alamat);
        setNama(res.data.data.nama);
        setNoIdentitas(res.data.data.no_identitas);
        setNomorTelepon(res.data.data.nomor_telepon);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const updateProfile = () => {
    const idUser = localStorage.getItem("id_user");
    const confirmation = window.confirm(
      "Apakah anda yakin ingin mengupdate data customer?"
    );

    if (confirmation) {
      instance
        .put(`/customer/${idUser}`, {
          nama: nama,
          no_identitas: no_identitas,
          nomor_telepon: nomor_telepon,
          alamat: alamat,
          email: email,
          password: password,
          jenis_tamu: "personal",
        })
        .then((res) => {
          setUsers(res.data.data);
          onOpenChange(false);
          alert("Berhasil mengupdate data customer");
        })
        .catch((err) => {
          alert("Gagal mengupdate data customer: " + err);
          console.log(err.response.data.message);
        });
    } else {
      alert("Pembaruan profil dibatalkan.");
      onOpenChange(false);
    }
  };

  const onEdit = () => {
    setIdUser(users.id_customer);
    setNama(users.nama);
    setNoIdentitas(users.no_identitas);
    setNomorTelepon(users.nomor_telepon);
    setAlamat(users.alamat);
    setEmail(users.email);
    setPassword(users.password);
    setJenisTamu(users.jenis_tamu);
    onOpenChange(true);
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-screen bg-login-bg">
        <Card className=" w-[500px]">
          <div className="flex items-center justify-between mt-7">
            <span className="flex justify-start ml-4">
              <Link as={NavLink} to="/" className="text-3xl text-black">
                <FaAngleLeft />
              </Link>
            </span>
            <h1 className="text-2xl mr-4 font-bold flex items-center justify-center flex-grow">
              Profil
            </h1>
            <span className="flex justify-start mr-4">
              <button onClick={() => onEdit()} className="text-3xl text-black">
                <MdEdit />
              </button>
            </span>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <p className="text-lg font-semibold">Email : </p>
              <p>{email}</p>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold">Nama :</p>
              <p>{nama}</p>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold">No Identitas :</p>
              <p>{no_identitas}</p>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold">Nomor Telefon :</p>
              <p>{nomor_telepon}</p>
            </div>

            <div className="mb-4">
              <p className="text-lg font-semibold">Alamat :</p>
              <p>{alamat}</p>
            </div>
          </div>
        </Card>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Profil
                </ModalHeader>
                <ModalBody>
                  <h1 className="ml-2">Nama</h1>
                  <Input
                    type="text"
                    value={nama}
                    onChange={(event) => setNama(event.target.value)}
                    placeholder="Enter Nama"
                  />
                  <h1 className="ml-2">Nomor Identitas</h1>
                  <Input
                    type="text"
                    value={no_identitas}
                    onChange={(event) => setNoIdentitas(event.target.value)}
                    placeholder="Enter Nomor Identitas"
                  />
                  <h1 className="ml-2">Nomor Telepon</h1>
                  <Input
                    type="text"
                    value={nomor_telepon}
                    onChange={(event) => setNomorTelepon(event.target.value)}
                    placeholder="Enter Nomor Telepon"
                  />
                  <h1 className="ml-2">Alamat</h1>
                  <Input
                    type="text"
                    value={alamat}
                    onChange={(event) => setAlamat(event.target.value)}
                    placeholder="Enter Alamat"
                  />
                  <h1 className="ml-2">Email</h1>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter Email"
                  />
                  <h1 className="ml-2">Password</h1>
                  <Input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter Password"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      updateProfile();
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
