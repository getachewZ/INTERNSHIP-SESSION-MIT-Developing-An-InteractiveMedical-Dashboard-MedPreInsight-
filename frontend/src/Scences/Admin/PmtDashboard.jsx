import React, { useState } from 'react';
const AdmissionPage = () => {
  // Initialize room state with room availability and patient info
  const [rooms, setRooms] = useState(Array(400).fill({ available: true, patient: null }));
  const [selectedRoom, setSelectedRoom] = useState(""); // State to store the selected room number
  const [patientName, setPatientName] = useState(""); // State to store the patient name
  // Function to admit a patient to a room
  const admitPatient = () => {
    if (selectedRoom && patientName) {
      const roomNumber = parseInt(selectedRoom);
      const updatedRooms = [...rooms];
      updatedRooms[roomNumber - 1] = { available: false, patient: patientName }; // Mark the room as occupied and assign patient name
      setRooms(updatedRooms);
      setSelectedRoom(""); // Reset selected room after admitting patient
      setPatientName(""); // Reset patient name after admitting patient
    }
  };
  // Function to release a patient from a room
  const releasePatient = (roomNumber) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomNumber - 1] = { available: true, patient: null }; // Mark the room as available and remove patient info
    setRooms(updatedRooms);
  };
  // Generate an array of available rooms for the dropdown
  const availableRooms = rooms.reduce((acc, room, index) => {
    if (room.available) {
      acc.push(index + 1); // Room numbers are 1-indexed
    }
    return acc;
  }, []);

  return (
    <div>
      <h1>Admission Page</h1>
      <h2>Admit Patient</h2>
      <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
        <option value="">Select Room</option>
        {availableRooms.map((roomNumber) => (
          <option key={roomNumber} value={roomNumber}><button>{roomNumber}</button></option>
        ))}
      </select>
      <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Patient Name" />
      <button onClick={admitPatient}>Admit Patient</button>

      <h2>Admitted Patients</h2>
      <ul>
        {rooms.map((room, index) => (
          !room.available && (
            <li key={index + 1}>
              Patient: {room.patient} | Room: {index + 1}
              <button onClick={() => releasePatient(index + 1)}>Release Room</button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default AdmissionPage;
