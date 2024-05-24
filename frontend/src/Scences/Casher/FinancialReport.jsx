import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Financialreport() {
  const [patients, setPatients] = useState([]);
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://localhost:3000/totalpatients')
        setPatients(response.data)
      }
      catch(error){
        console.error('error of fetching Data', error)
      }
    };
    fetchData();
    return ()=>{
    }
  }, [])
  return (
    <div>
      <h1>List of Patients</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Blood Type</th>
            <th>Medical Condition</th>
            <th>Date of Addmittion</th>
            <th>Doctor</th>
            <th>Hospital</th>
            <th>Insurance Provider</th>
            <th>Billing amount</th>
            <th>Room Number</th>
            <th>Addmition Type</th>
            <th>Discharged Date</th>
            <th>Medication </th>
            <th>Test Result</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.Name}</td>
              <td>{patient.Age}</td>
              <td>{patient.Gender}</td>
              <td>{patient['Blood Type']}</td>
              <td>{patient['Medical Condition']}</td>
              <td>{patient['Date of Admission']}</td>
              <td>{patient.Doctor}</td>
              <td>{patient.Hospital}</td>
              <td>{patient['Insurance Provider']}</td>
              <td>{patient['Billing Amount']}</td>
              <td>{patient['Room Number']}</td>
              <td>{patient['Admission Type']}</td>
              <td>{patient['Discharge Date']}</td>
              <td>{patient.Medication}</td>
              <td>{patient['Test Results']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Financialreport