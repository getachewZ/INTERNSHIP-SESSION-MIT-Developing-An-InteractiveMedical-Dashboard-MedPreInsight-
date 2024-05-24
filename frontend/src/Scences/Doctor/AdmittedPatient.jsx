import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
function Patients() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3000/admitted') 
      .then(result => setPatients(result.data))
      .catch(err => console.log(err));
  }, []);
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // If search query is empty, reset search result
      setSearchResult(null);
      return;
    }
    // Send request to backend to search for patient
    axios.get(`http://localhost:3000/financialrecord/search?query=${searchQuery}`)
      .then(result => {
        setSearchResult(result.data);
      })
      .catch(err => {
        console.log(err);
        setSearchResult([]);
      });
  };
  // onClick={() => handleDelete(patient._id)}
   return (
    <Box width='100%' height='100%'>
      <Box width='100%'>
        <h3>Patients List</h3>
        <div>
          <input 
            type="text" 
            placeholder="Search by Name or ID" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
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
                  <td>
                  <Link to={`/view/${patient._id}`}>view</Link>
                  <button >Delete</button>
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
                  <td>
                  <Link to={`/doctor/new-patients/view/${patient._id}`}>view</Link>
                  <button >Delete</button>
                </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
export default Patients;
