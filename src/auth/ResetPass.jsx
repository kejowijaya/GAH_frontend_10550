import { Input, Button, Card, Link } from "@nextui-org/react";
import { useState } from "react";
import instance from "../axios";
import { FaAngleLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function ResetPass() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onChangePass() {
    const confirmation = window.confirm(
      "Apakah anda yakin ingin mengubah password?"
    );
    if (confirmation) {
      instance
        .post(`/changePassword/${email}`, {
          password,
        })
        .then((res) => {
          console.log(res.data.data);
          window.location.href = "/";
          alert("Berhasil mengubah password");
        })
        .catch((err) => {
          alert(
            "Gagal mengubah password " +
              JSON.stringify(err.response.data.message)
          );
          console.log(err.response.data.message);
        });
    }
  }

  return (
    <div className="w-full bg-login-bg bg-center">
      <div className="max-w-md mx-auto flex flex-col justify-center items-center h-screen ">
        <Card className="h-[400px] w-[600px] items-center px-3">
          <div className="flex justify-between w-[550px] mt-5">
            <span className="flex justify-between">
              <Link as={NavLink} to="/login" className="text-3xl text-black">
                <FaAngleLeft />
              </Link>
            </span>
            <h1 className="text-2xl font-bold ">Reset Password</h1>
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
                label="Email"
              />
            </div>
            <div>
              <h1 className="ml-2 font-semibold">New Password</h1>
              <Input
                value={password}
                onValueChange={setPassword}
                type="password"
                label="Password"
              />
            </div>
            <Button
              onClick={onChangePass}
              className="mt-8 w-full"
              color="primary"
            >
              Change Password
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
