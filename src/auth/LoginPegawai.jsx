import { Input, Button, Card, Link } from "@nextui-org/react";
import { useState } from "react";
import instance from "../axios";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function LoginPegawai() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onLogin() {
    instance
      .post("/loginPegawai", { email, password })
      .then((res) => {
        console.log(res.data.pegawai);
        const role = res.data.pegawai.role;
        let path = "";
        if (role === "admin") {
          path = "/kamar";
        } else if (role === "sm") {
          path = "/tarif";
        } else if (role === "General Manager" || role === "Owner") {
          path = "/laporan1";
        } else if (role === "Front Office") {
          path = "/daftarReservasi";
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.pegawai));
        navigate(path);
      })
      .catch((err) => {
        alert("Gagal login " + JSON.stringify(err.response.data.message));
        console.log(err.response.pegawai.message);
      });
  }

  return (
    <div className="w-full bg-login-bg bg-center">
      <div className="max-w-md mx-auto flex flex-col justify-center items-center h-screen ">
        <Card className="h-[400px] w-[600px] items-center px-3">
          <div className="flex justify-between w-[550px] mt-5">
            <span className="flex justify-between">
              <Link as={NavLink} to="/" className="text-3xl text-black">
                <FaAngleLeft />
              </Link>
            </span>
            <h1 className="text-2xl font-bold">Login Pegawai</h1>
            <h1> </h1>
          </div>
          <div className="mx-auto flex flex-col justify-center h-screen w-full px-4">
            <div>
              <h1 className="ml-2 font-semibold">Email</h1>
              <Input
                value={email}
                onValueChange={setEmail}
                className="mb-5"
                type="email"
                placeholder="Email"
              />
            </div>
            <div>
              <h1 className="ml-2 font-semibold">Password</h1>
              <Input
                value={password}
                onValueChange={setPassword}
                type="password"
                placeholder="Password"
              />
            </div>
            <Button onClick={onLogin} className="mt-8 w-full" color="primary">
              Login
            </Button>
            <div className="flex justify-end">
              <Link color="primary" as={NavLink} to="/resetPass">
                {" "}
                Forgot Password ?
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
