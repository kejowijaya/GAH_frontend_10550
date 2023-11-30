import { Input, Button, Card, Link } from "@nextui-org/react";
import { useState } from "react";
import instance from "../axios";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export function LoginCustomer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function onLogin() {
    instance
      .post("/login", { email, password })
      .then((res) => {
        console.log(res.data.customer);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.customer);
        localStorage.setItem("id_user", res.data.customer.id_customer);
        localStorage.setItem("isLoggedIn", true);
        navigate("/landing");
      })
      .catch((err) => {
        alert("Gagal login " + JSON.stringify(err.response.data.message));
        console.log(err.response.data.message);
      });
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-200 justify-center items-center">
        <div className=" mx-auto p-3 h-full items-center">
          <Card className="border-2 border-gray-300 rounded-md p-4 h-full">
            <div className="flex justify-between items-center mt-10">
              <Link as={NavLink} to="/" className="text-3xl text-black">
                <FaAngleLeft />
              </Link>
              <h1 className="text-3xl font-bold">Login</h1>
              <span></span>
            </div>
            <div className="mx-auto flex flex-col justify-center h-screen w-full px-4">
              <div className="mb-3">
                <label htmlFor="email" className="text-lg font-semibold">
                  Email
                </label>
                <Input
                  value={email}
                  onValueChange={setEmail}
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="my-3">
                <label htmlFor="password" className="text-lg font-semibold">
                  Password
                </label>
                <Input
                  value={password}
                  onValueChange={setPassword}
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <Button onClick={onLogin} className="w-full my-5" color="primary">
                Login
              </Button>
              <div className="flex justify-end">
                <Link
                  as={NavLink}
                  to="/resetPass"
                  className="text-sm text-blue-500"
                >
                  Forgot Password ?
                </Link>
              </div>
              <div className="flex justify-center mt-10">
                <h1 className="mr-1"> Belum punya akun ? </h1>
                <Link as={NavLink} to="/register" className="text-blue-500">
                  Register
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="w-2/3">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/386301950.jpg?k=afb811280ac0cb4a344bd1122c842b4b4edcfe53de644a967042b0ed1b6ee465&o=&hp=1"
          alt="Gambar"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
