import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

function UpdateUser() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const { id } = useParams();
  const [temperature, setTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [HeartBeat, setHeartBeat] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [oxygenSaturation, setOxygenSaturation] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [riskFactors, setRiskFactors] = useState('');
  
  useEffect(() => {
    axios.get(`http://localhost:3000/view/${id}`)
      .then(result => {
        setPatient(result.data);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const patientInfo = {
      temperature,
      bloodPressure,
      HeartBeat,
      respiratoryRate,
      oxygenSaturation,
      symptoms,
      medicalHistory,
      riskFactors
    };

    axios.post('http://localhost:3000/PatientCheck', { ...patient, ...patientInfo })
      .then(response => {
        navigate('/nurse/dashboard')
        window.location.reload();
        console.log('Patient data saved:', response.data);
        // Clear form fields after submission
        setTemperature('');
        setBloodPressure('');
        setHeartBeat('');
        setRespiratoryRate('');
        setOxygenSaturation('');
        setSymptoms('');
        setMedicalHistory('');
        setRiskFactors('');
      })
      .catch(error => console.error('Error saving patient data:', error));
  };

  return (
    <fieldset>
      <legend>Patient History</legend>
      <Box>
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
            </tr>
          </thead>
          <tbody>
            {patient && (
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
              </tr>
            )}
          </tbody>
        </table>
      </Box>
      <fieldset>
        <legend>Patient Triage</legend>
        <Box display='flex'>
            
            <Box>
              <TextField
                label="Temperature"
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Blood Pressure"
                type="text"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Heart Beat"
                type="text"
                value={HeartBeat}
                onChange={(e) => setHeartBeat(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="respiratoryRate"
                type="text"
                value={respiratoryRate}
                onChange={(e) => setRespiratoryRate(e.target.value)}
                fullWidth
                margin="normal"
              />
              </Box>
          <form onSubmit={handleSubmit}>
          <Button type="submit" variant="contained" color="primary" bottom='true'>Submit</Button>

          </form>
        </Box>
      </fieldset>
    </fieldset>
  );
}

export default UpdateUser;
