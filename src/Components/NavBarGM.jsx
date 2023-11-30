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

export function NavBarGM() {
  return (
    <Navbar maxWidth="full" height="60px" className="px-5 bg-secondary-100">
      <NavbarBrand>
        <Link href="/landing" aria-current="page">
          <Image src="assets/logo.png" width="50" style={{ borderRadius: 0 }} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button color="secondary" variant="shadow">
                Laporan
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem>
                <Link href="/laporan1" color="foreground" aria-current="page">
                  Customer Baru per Bulan
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/laporan2" color="foreground" aria-current="page">
                  Pendapatan Bulanan
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/laporan3" color="foreground" aria-current="page">
                  Jumlah Tamu per Jenis Kamar
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/laporan4" color="foreground" aria-current="page">
                  5 Customer Dengan Reservasi Terbanyak
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
  );
}
