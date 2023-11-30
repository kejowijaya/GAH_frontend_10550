import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { MdExitToApp } from "react-icons/md";

export function NavBarFO() {
  return (
    <div>
      <Navbar maxWidth="full" height="60px" className="px-5 bg-secondary-100">
        <NavbarBrand>
          <Link href="/landing" aria-current="page">
            <Image
              src="assets/logo.png"
              width="50"
              style={{ borderRadius: 0 }}
            />
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="/daftarReservasi" aria-current="page">
              Daftar Reservasi
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/loginPegawai" aria-current="page">
              <Button color="primary" variant="flat">
                {" "}
                Logout <MdExitToApp />{" "}
              </Button>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <style jsx global>{`
        @media print {
          .navbar,
          .navbar-brand,
          .navbar-content,
          .navbar-item {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
