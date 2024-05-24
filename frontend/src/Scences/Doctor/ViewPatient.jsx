import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import Appointment from './SetAppointment';
function ViewPatients() {
  const [patient, setPatient] = useState(null);
  const { id } = useParams();
  const [temperature, setTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [HeartBeat, setHeartBeat] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [oxygenSaturation, setOxygenSaturation] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [Diagnosis, setDiagnosis] = useState('');
  const [Costs, setCosts] = useState('')
  const [riskFactors, setRiskFactors] = useState('');
  useEffect(() => {
    axios.get(`http://localhost:3000/patientView/${id}`)
      .then(result => {
        setPatient(result.data);
      })
      .catch(error => console.error(error));
  }, [id]);
  const handleSubmit = (e, status) => {
    e.preventDefault();
    const patientInfo = {
      temperature,
      bloodPressure,
      HeartBeat,
      respiratoryRate,
      oxygenSaturation,
      symptoms,
      medicalHistory,
      riskFactors,
      Diagnosis,
      Costs,
      status,
    };
    let endpoint;
    if (status === 'toRefer') {
      endpoint = 'http://localhost:3000/referedlist';
    } else if (status === 'toDischarge') {
      endpoint = 'http://localhost:3000/dischargedlist';
    } else if (status === 'toAppoint') {
      endpoint = 'http://localhost:3000/Appointmentlist';
      <Appointment/>
    } else if (status === 'toAdmit') {
      endpoint = 'http://localhost:3000/addmittedlist';
    }
    axios.post(endpoint, { ...patient, ...patientInfo })
      .then(response => {
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
        setDiagnosis('')
        setCosts('')
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
              <th>Temprature</th>
              <th>Bloodpressure</th>
              <th>Hearthbeat</th>
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
                <td>{patient.temperature}</td>
                <td>{patient.bloodPressure}</td>
                <td>{patient.symptoms}</td>
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
              label="Pulse Rate"
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
            <TextField
              label="oxygenSaturation"
              type="text"
              value={oxygenSaturation}
              onChange={(e) => setOxygenSaturation(e.target.value)}
              fullWidth
              margin="normal"
            />
            </Box>
            <Box>
            
            {/* Add similar input fields for pulse rate, respiratory rate, oxygen saturation, etc. */}
            <TextField
              label="Symptoms"
              multiline
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Medical History"
              multiline
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Diagnosis Type"
              multiline
              value={Diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Risk Factors"
              multiline
              value={riskFactors}
              onChange={(e) => setRiskFactors(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="tratment Costs "
              multiline
              value={Costs}
              onChange={(e) => setCosts(e.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>
          <Box >
          <form onSubmit={handleSubmit}>
          <Box display='flex' flexDirection='column' mt={10} p={10}>
            <Button onClick={(e) => handleSubmit(e, 'toDischarge')} variant="contained" color="primary">To Discharge</Button>
            <Button onClick={(e) => handleSubmit(e, 'toRefer')} variant="contained" color="primary">To Refer</Button>
            <Button onClick={(e) => handleSubmit(e, 'toAppoint')} variant="contained" color="primary">To Appoint</Button>
            <Button onClick={(e) => handleSubmit(e, 'toAdmit')} variant="contained" color="primary">To Admit</Button>
          </Box>
          </form>
          </Box>
        </Box>
      </fieldset>
    </fieldset>
  );
}
export default ViewPatients;