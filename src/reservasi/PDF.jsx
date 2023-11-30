import React from "react";
import { PDFViewer } from "@react-pdf-viewer/core"; // Gantilah dengan pustaka PDF viewer yang Anda gunakan
import Resume from "./Resume"; // Sesuaikan dengan path komponen Resume

const MyPDFViewer = () => {
  // Contoh data reservation dan customer
  const reservationData = {
    id: "12345",
    checkInDate: "2023-01-01",
    checkOutDate: "2023-01-05",
    numGuests: 2,
    roomType: "Deluxe Room",
  };

  const customerData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    address: "123 Main St, Cityville",
  };

  return (
    <PDFViewer width="100%" height="500px">
      <Resume reservation={reservationData} customer={customerData} />
    </PDFViewer>
  );
};

export default MyPDFViewer;
