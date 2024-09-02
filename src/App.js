// src/App.js
import React from "react";
import "./App.css";
import DoctorProfile from "./Components/DoctorProfile";
import Filters from "./Components/Filters";

function App() {
  const doctors = [
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVTf3NQbleuH5z7n5rvobNZbWCPzDD9zRFRw&s",
      name: "Dr. Kavitha MBBS;MD",
      specialization: "Cardiologist",
      rating: 4.5,
    },
    {
      imgSrc:
        "https://png.pngtree.com/png-clipart/20230918/ourmid/pngtree-photo-men-doctor-physician-chest-smiling-png-image_10132895.png",
      name: "Dr. John Doe MBBS;MD",
      specialization: "Cardiologist",
      rating: 4.5,
    },
    {
      imgSrc:
        "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-indian-doctor-woman-smiling-at-camera-png-image_12531120.png",
      name: "Dr. Sarah Lee MBBS;MD",
      specialization: "Neurologist",
      rating: 4.7,
    },
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS72cdwWMAIFkxI40sZ6fKlOePOBSDRfTYoaQ&s",
      name: "Dr. Richard Roe MBBS;MD",
      specialization: "Orthopedic",
      rating: 4.6,
    },
    {
      imgSrc:
        "https://png.pngtree.com/png-clipart/20230926/ourmid/pngtree-male-physician-doctor-png-image_10167965.png",
      name: "Dr. Emily Clark MBBS;MD",
      specialization: "Pediatrician",
      rating: 4.8,
    },
    {
      imgSrc:
        "https://png.pngtree.com/png-clipart/20231002/original/pngtree-young-afro-professional-doctor-png-image_13227671.png",
      name: "Dr. George White MBBS;MD",
      specialization: "Dermatologist",
      rating: 4.7,
    },
    {
      imgSrc:
        "https://static.vecteezy.com/system/resources/previews/043/413/592/non_2x/doctor-woman-with-stethoscope-keeping-the-arms-crossed-on-isolated-transparent-background-png.png",
      name: "Dr. Vanmathi MBBS;MD",
      specialization: "Neurologist",
      rating: 4.4,
    },
    {
      imgSrc:
        "https://admin.healuconsultancy.com/uploads/2024/08/17b4dff5cd984e9b6157ba257545e490.png",
      name: "Dr.Samatha Tulla MBBS;MD",
      specialization: "Orthopedic",
      rating: 4.3,
    },
    {
      imgSrc:
        "https://admin.healuconsultancy.com/uploads/2024/08/d2751c5441e97df47c3c7ae0a2506c13.png",
      name: "Dr. Tayana Narendra MBBS;MD",
      specialization: "Pediatrician",
      rating: 4.6,
    },
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVTf3NQbleuH5z7n5rvobNZbWCPzDD9zRFRw&s",
      name: "Dr. Henry Williams MBBS;MD",
      specialization: "Dermatologist",
      rating: 4.5,
    },
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVTf3NQbleuH5z7n5rvobNZbWCPzDD9zRFRw&s",
      name: "Dr. Laura Bennett MBBS;MD",
      specialization: "Cardiologist",
      rating: 4.9,
    },
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVTf3NQbleuH5z7n5rvobNZbWCPzDD9zRFRw&s",
      name: "Dr. Kevin Smith MBBS;MD",
      specialization: "Neurologist",
      rating: 4.6,
    },
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVTf3NQbleuH5z7n5rvobNZbWCPzDD9zRFRw&s",
      name: "Dr. Jessica Brown MBBS;MD",
      specialization: "Orthopedic",
      rating: 4.7,
    },
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVTf3NQbleuH5z7n5rvobNZbWCPzDD9zRFRw&s",
      name: "Dr. Chris Taylor MBBS;MD",
      specialization: "Pediatrician",
      rating: 4.5,
    },
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVTf3NQbleuH5z7n5rvobNZbWCPzDD9zRFRw&s",
      name: "Dr. Anna Scott MBBS;MD",
      specialization: "Dermatologist",
      rating: 4.4,
    },
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVTf3NQbleuH5z7n5rvobNZbWCPzDD9zRFRw&s",
      name: "Dr. Mark Davis MBBS;MD",
      specialization: "Cardiologist",
      rating: 4.8,
    },
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIjISwsDTi48GPbsVbRiwUXtcCPgTKyhaGw&s",
      name: "Dr. Emily Ross MBBS;MD",
      specialization: "Neurologist",
      rating: 4.5,
    },
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlbcFlS3WAIwm2KuE3ttO8mn6vtwavlO4cuQ&s",
      name: "Dr. Alex Carter MBBS;MD",
      specialization: "Orthopedic",
      rating: 4.6,
    },
    {
      imgSrc:
        "https://www.transparentpng.com/download/doctor/male-intern-doctor-png-free-in-blue-clothes-eiDunD.png",
      name: "Dr. Olivia King MBBS;MD",
      specialization: "Pediatrician",
      rating: 4.7,
    },
    {
      imgSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVdGPm3TVoN9feIqoSYBSJwumUhJBcDQ9_SQ&s",
      name: "Dr. James Robinson MBBS;MD",
      specialization: "Dermatologist",
      rating: 4.8,
    },
  ];

  return (
    <div className="container">
      {/* Filters Section */}
      <Filters />

      {/* Doctor Profiles Section */}
      <div className="doctor-profiles">
        {doctors.map((doctor, index) => (
          <DoctorProfile key={index} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}

export default App;
