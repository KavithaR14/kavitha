// src/components/Filters.js
import React from "react";
import "../App.css"; // Assuming your CSS is in App.css

const Filters = () => (
  <div className="filters">
    <label htmlFor="gender">Gender:</label>
    <select id="gender">
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>

    <label htmlFor="location">Location:</label>
    <select id="location">
      <option value="Chennai">Chennai</option>
      <option value="Bangalore">Bangalore</option>
    </select>

    <label htmlFor="specialization">Specialization:</label>
    <select id="specialization">
      <option value="Cardiology">Cardiology</option>
      <option value="Orthopedics">Orthopedics</option>
      <option value="Neurology">Neurology</option>
      <option value="Pediatrics">Pediatrics</option>
      <option value="Dermatology">Dermatology</option>
    </select>

    <label htmlFor="experience">Experience:</label>
    <select id="experience">
      <option value="1">1 year</option>
      <option value="2">2 years</option>
    </select>
  </div>
);

export default Filters;
