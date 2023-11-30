import { NavBar } from "./Components/NavBar";
import { Card, CardHeader, Image, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import instance from "./axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [jmlDewasa, setDewasa] = useState("");
  const [jmlAnak, setAnak] = useState("");
  const navigate = useNavigate();

  function cekKamar() {
    navigate("/listRoom", {
      state: {
        checkIn: checkIn,
        checkOut: checkOut,
        jmlDewasa: jmlDewasa,
        jmlAnak: jmlAnak,
      },
    });
  }

  return (
    <>
      <NavBar />
      <div className="relative">
        <img
          src="https://images7.alphacoders.com/362/362619.jpg"
          alt="Background"
          className="w-full object-cover"
          style={{ height: "100vh" }}
        />
        <div className="absolute right-0 top-0 mx-20 mt-20 text-white">
          <Card
            className="w-[300px] h-[500px] border-none bg-background/70 isBlurred"
            shadow="sm"
          >
            <div className="mx-auto flex flex-col justify-center h-screen w-full px-6">
              <div className="my-3">
                <Input
                  type="date"
                  placeholder="Tanggal Check In"
                  value={checkIn}
                  onValueChange={(value) => setCheckIn(value)}
                />
              </div>
              <div className="my-3">
                <Input
                  type="date"
                  placeholder="Tanggal Check Out"
                  value={checkOut}
                  onValueChange={(value) => setCheckOut(value)}
                />
              </div>
              <div className="my-3">
                <Input
                  type="number"
                  placeholder="Dewasa"
                  value={jmlDewasa}
                  onValueChange={(value) => setDewasa(value)}
                />
              </div>
              <div className="my-3">
                <Input
                  type="number"
                  placeholder="Anak"
                  value={jmlAnak}
                  onValueChange={(value) => setAnak(value)}
                />
              </div>
              <Button
                onClick={cekKamar}
                className="w-full my-5 bg-gradient-to-tr from-red-500 to-yellow-500 text-white shadow-lg"
              >
                Cek Ketersediaan Kamar
              </Button>
            </div>
          </Card>
        </div>
        <div className="h-96 max-w-screen-2xl mx-auto flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-4xl uppercase font-sans mb-7">
            Welcome to Grand Atma Hotel
          </h1>
          <p
            className="text-2xl md:text-4xl font-sans mb-7 text-center"
            style={{ fontSize: "18px", fontStyle: "italic" }}
          >
            Grand Atma Hotel adalah tempat penginapan yang nyaman dan ramah di
            Yogyakarta. Dengan layanan yang memuaskan, fasilitas lengkap, dan
            lokasi strategis, hotel ini menawarkan pengalaman menginap yang tak
            terlupakan untuk wisatawan dan pelancong.
          </p>
        </div>
      </div>

      <div className=" gap-2 grid grid-cols-12 grid-rows-2 px-8">
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h4 className="text-white font-medium text-large">
              Executive Deluxe
            </h4>
            <p className="text-tiny text-white/60 uppercase font-bold">
              1 King Bed
            </p>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://dbijapkm3o6fj.cloudfront.net/resources/29181,1004,1,6,4,0,600,450/-4608-/20210503231944/deluxe-room.jpeg"
          />
        </Card>

        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h4 className="text-white font-medium text-large">Superior Room</h4>
            <p className="text-tiny text-white/60 uppercase font-bold">
              1 Double Bed / 1 Twin Bed
            </p>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://asset.kompas.com/crops/33vZ6Rt128kzOfcC_aU3fy7oo0I=/0x36:640x463/750x500/data/photo/2020/07/10/5f081b41cc76c.jpeg"
          />
        </Card>

        <Card className="col-span-12 sm:col-span-4 h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h4 className="text-white font-medium text-large">Family Room</h4>
            <p className="text-tiny text-white/60 uppercase font-bold">
              1 Double Bed and 1 Single Bed
            </p>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="https://www.discovery-hotel.com/wp-content/uploads/2019/10/DA-Family-Room-Bedroom-02.jpg"
          />
        </Card>
      </div>
    </>
  );
};
