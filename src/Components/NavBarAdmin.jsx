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

export function NavBarAdmin() {
  return (
    <Navbar maxWidth="full" height="60px" className="px-5 bg-secondary-100">
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
        <NavbarItem isActive>
          <Link href="/kamar" aria-current="page">
            Kamar
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/jenisKamar" aria-current="page">
            Jenis Kamar
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
