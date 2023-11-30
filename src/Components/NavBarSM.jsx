import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";
import { MdExitToApp } from "react-icons/md";

export function NavBarSM() {
  return (
    <Navbar maxWidth="full" height="60px" className="px-5 bg-secondary-100">
      <NavbarBrand>
        <Link href="/landing" aria-current="page">
          <Image src="assets/logo.png" width="50" style={{ borderRadius: 0 }} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/tarif" aria-current="page">
            Tarif
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/season" aria-current="page">
            Season
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/fasilitas" aria-current="page">
            Fasilitas
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/customerGrup" aria-current="page">
            Customer
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/riwayatReservasiGrup" aria-current="page">
            Reservasi
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/listRoom" aria-current="page">
            Kamar Tersedia
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/loginPegawai" aria-current="page">
            <Button color="primary">
              {" "}
              Logout <MdExitToApp />{" "}
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
