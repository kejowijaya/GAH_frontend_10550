import { Input, Button, Card, Link } from "@nextui-org/react";
import { useState } from "react";
import instance from "../axios";
import { FaAngleLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [no_identitas, setNoIdentitas] = useState("");
  const [nomor_telepon, setNomorTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();

  function onRegister() {
    instance
      .post("/register", {
        email,
        password,
        nama,
        no_identitas,
        nomor_telepon,
        alamat,
      })
      .then((res) => {
        console.log(res);
        alert("Register berhasil, silahkan login");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        alert("Register gagal, silahkan coba lagi");
      });
  }

  return (
    <div className="flex h-screen">
      <div className="mx-auto p-3 items-center">
        <Card className="w-[600px] rounded-md shadow-md bg-white">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-between items-center mb-3">
                <Link as={NavLink} to="/login" className="text-3xl text-black">
                  <FaAngleLeft />
                </Link>
                <h1 className="text-2xl font-bold">Register</h1>
                <span></span>
              </div>
              <hr />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="ml-1 font-semibold">Email</p>
                <Input
                  value={email}
                  onValueChange={setEmail}
                  className="mb-5"
                  type="email"
                  placeholder="Email"
                />
              </div>

              <div>
                <p className="ml-1 font-semibold">Password</p>
                <Input
                  value={password}
                  onValueChange={setPassword}
                  className="mb-5"
                  type="password"
                  placeholder="Password"
                />
              </div>

              <div>
                <p className="ml-1 font-semibold">Nama</p>
                <Input
                  value={nama}
                  onValueChange={setNama}
                  className="mb-5"
                  type="text"
                  placeholder="Nama"
                />
              </div>

              <div>
                <p className="ml-1 font-semibold">Nomor Identitas</p>
                <Input
                  value={no_identitas}
                  onValueChange={setNoIdentitas}
                  className="mb-5"
                  type="text"
                  placeholder="Nomor Identitas"
                />
              </div>

              <div>
                <p className="ml-1 font-semibold">Nomor Telepon</p>
                <Input
                  value={nomor_telepon}
                  onValueChange={setNomorTelepon}
                  className="mb-5"
                  type="text"
                  placeholder="Nomor Telepon"
                />
              </div>

              <div>
                <p className="ml-1 font-semibold">Alamat</p>
                <Input
                  value={alamat}
                  onValueChange={setAlamat}
                  className="mb-5"
                  type="text"
                  placeholder="Alamat"
                />
              </div>
            </div>
            <Button
              onClick={onRegister}
              className="w-full mt-5"
              color="primary"
            >
              Register
            </Button>
          </div>
        </Card>
      </div>

      <div className="w-2/3">
        <img
          src="https://images7.alphacoders.com/362/362619.jpg"
          alt="Gambar"
          className="object-cover h-full"
          style={{ height: "120%" }}
        />
      </div>
    </div>
  );
}
