import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";
import { MdPerson, MdExitToApp } from "react-icons/md";
import { useState, useEffect } from "react";

export function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedIsLoggedIn == "true");

    // localStorage.removeItem("isLoggedIn");
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <Navbar maxWidth="full" height="60px" className="px-5 bg-secondary-900">
      <NavbarBrand>
        <Link href="/landing" aria-current="page">
          <Image
            src="assets/logo2.png"
            width="50"
            style={{ borderRadius: 0 }}
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            className="text-default-50"
            href="/riwayatReservasi"
            aria-current="page"
          >
            Reservasi
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-default-50"
            href="/listRoom"
            aria-current="page"
          >
            Kamar
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-50" href="/" aria-current="page">
            Fasilitas
          </Link>
        </NavbarItem>
        <NavbarItem>
          {isLoggedIn ? (
            <Link className="px-2 pt-1" href="/profil" aria-current="page">
              <MdPerson style={{ fontSize: "24px", color: "white" }} />
            </Link>
          ) : (
            <Link href="/login" aria-current="page">
              <Button color="primary"> Login </Button>
            </Link>
          )}
        </NavbarItem>
        <NavbarItem>
          {isLoggedIn ? (
            <Link
              className="px-2 pt-1"
              href="/login"
              aria-current="page"
              onClick={handleLogout}
            >
              <MdExitToApp style={{ fontSize: "24px", color: "white" }} />
            </Link>
          ) : (
            <Link href="/loginPegawai" aria-current="page">
              <Button color="primary-100"> Login Pegawai </Button>
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
