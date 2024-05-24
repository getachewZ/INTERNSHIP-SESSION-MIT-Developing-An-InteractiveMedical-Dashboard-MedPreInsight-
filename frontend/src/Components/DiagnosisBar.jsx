import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ViewPatients() {
  const [patient, setPatient] = useState(null);
  const { id } = useParams();
  const [diagnosisData, setDiagnosisData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dischargedResponse = await axios.get('http://localhost:3000/dischargedlist');
        const referredResponse = await axios.get('http://localhost:3000/referedlists');
        const appointmentResponse = await axios.get('http://localhost:3000/Appointment');
        const admittedResponse = await axios.get('http://localhost:3000/admitted');
        const dischargedPatients = dischargedResponse.data;
        const referredPatients = referredResponse.data;
        const appointmentPatients = appointmentResponse.data;
        const admittedPatients = admittedResponse.data;
        const allPatients = [...dischargedPatients, ...referredPatients, ...appointmentPatients, ...admittedPatients];
        const diagnosisCounts = groupByDiagnosis(allPatients);
        setDiagnosisData(diagnosisCounts);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    fetchData();
  }, []);
  const groupByDiagnosis = (patients) => {
    const groupedPatients = {};
    patients.forEach(patient => {
      const diagnosis = patient.Diagnosis;
      if (!groupedPatients[diagnosis]) {
        groupedPatients[diagnosis] = [];
      }
      groupedPatients[diagnosis].push(patient);
    });
    return Object.keys(groupedPatients).map(diagnosis => ({
      diagnosis: diagnosis,
      count: groupedPatients[diagnosis].length,
    }));
  };
  // Rest of your component code...
  return (
    <BarChart width={600} height={300} data={diagnosisData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="diagnosis" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#8884d8" />
  </BarChart>
  );
}
export default ViewPatients;