import React, { useEffect, useState } from 'react';
import { Box, Modal, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Patients() {
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3000')
      .then(result => {
        const sortedPatients = result.data.sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime));
        setPatients(sortedPatients);
        setFilteredPatients(sortedPatients);      })

      .catch(err => console.log(err));
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // If search query is empty, reset search result
      setSearchResult(null);
      return;
    }
    // Send request to backend to search for patient
    axios.get(`http://localhost:3000/search?query=${searchQuery}`)
      .then(result => {
        setSearchResult(result.data);
      })
      .catch(err => {
        console.log(err);
        setSearchResult([]);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/deleteuser/${id}`)
      .then(result => {
        console.log(result);
        setPatients(prevPatients => prevPatients.filter(patient => patient._id !== id));
      })
      .catch(err => console.log(err));
  };
  const handlePay = (patientId, patientInfo) => {
    setSelectedPatient(patientInfo);
    setOpen(true);
  };

  const handleSubmitPayment = () => {
    axios.post('http://localhost:3000/financial-record', {
      ...selectedPatient,
      amount: 100, // You can adjust the amount here
      method: paymentMethod,
    })
      .then(response => {
        console.log(response.data);
        setPatients(prevPatients => prevPatients.filter(patient => patient._id !== selectedPatient._id));
        setOpen(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <Box width='100%' height='100%'>
      <Box width='100%'>
        <h3>Patients List</h3>
        <Link to='/casher/manage-patients/reception'>Add +</Link>
        <Box right='true' top='true'>
          <input 
            type="text" 
            placeholder="Search by Name or ID" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </Box>
        <table width='100%' border='1px'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Zone</th>
              <th>Woreda</th>
              <th>Tabiya</th>
              <th>Date and Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {searchResult ? (
              searchResult.map(patient => (
                <tr key={patient._id}>
                  <td>{patient.First_name}</td>
                  <td>{patient.Last_name}</td>
                  <td>{patient.Age}</td>
                  <td>{patient.Gender}</td>
                  <td>{patient.Phone}</td>
                  <td>{patient.Zone}</td>
                  <td>{patient.Woreda}</td>
                  <td>{patient.Tabiya}</td>
                  <td>{patient.DateTime}</td>
                  <td>
                    <button onClick={() => handlePay(patient._id, patient)}>Pay</button>
                    <button onClick={() => handleDelete(patient._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              patients.map(patient => (
                <tr key={patient._id}>
                  <td>{patient.First_name}</td>
                  <td>{patient.Last_name}</td>
                  <td>{patient.Age}</td>
                  <td>{patient.Gender}</td>
                  <td>{patient.Phone}</td>
                  <td>{patient.Zone}</td>
                  <td>{patient.Woreda}</td>
                  <td>{patient.Tabiya}</td>
                  <td>{patient.DateTime}</td>
                  <td>
                    <button onClick={() => handlePay(patient._id, patient)}>Pay</button>
                    <button onClick={() => handleDelete(patient._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2>Payment Details</h2>
            <TextField
              label="Payment Method"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              fullWidth
              margin="normal"
              select
            >
              <MenuItem value="cash">Cash</MenuItem>
              <MenuItem value="check">Check</MenuItem>
              <MenuItem value="credit_card">Credit Card</MenuItem>
            </TextField>
            <Button variant="contained" onClick={handleSubmitPayment}>
              Submit Payment
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default Patients;
