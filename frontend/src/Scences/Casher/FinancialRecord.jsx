import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, useTheme, TextField, MenuItem } from "@mui/material";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
function Patients() {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [filterZone, setFilterZone] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3000/financialrecord')
            .then(response => {
                const sortedPatients = response.data.sort((a, b) => new Date(b.DateTime) - new Date(a.DateTime));
                setPatients(sortedPatients);
                setFilteredPatients(sortedPatients);
            })
            .catch(error => {
                console.error('Error fetching patients:', error);
            });
    }, []);

    useEffect(() => {
        // Filter patients based on selected criteria
        let filteredData = patients.filter(patient => {
            if (filterZone && patient.Zone !== filterZone) return false;
            return true;
        });

        setFilteredPatients(filteredData);
    }, [patients, filterZone]);
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
    return (
        <Box width='100%' height='100%'>
            <Box width='100%'>
                <Typography variant="h5" gutterBottom>Patients List</Typography>
                <Box display="flex" mb={2}>
                    <TextField
                        select
                        label="Zone"
                        value={filterZone}
                        onChange={(e) => setFilterZone(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ mr: 2, width: 200 }}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="central">central</MenuItem>
                        <MenuItem value="mekelle">mekelle</MenuItem>
                        <MenuItem value="western">western</MenuItem>
                        {/* Add options for Zone */}
                    </TextField>
                    <div>
          <input 
            type="text" 
            placeholder="Search by Name or ID" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
                    {/* Add similar text fields for Woreda and Tabiya */}
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Zone</TableCell>
                            <TableCell>Woreda</TableCell>
                            <TableCell>Tabiya</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Date And Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResult?
                        (searchResult, filteredPatients.map(patient => (
                            <TableRow key={patient._id}>
                                <TableCell>{patient.First_name}</TableCell>
                                <TableCell>{patient.Last_name}</TableCell>
                                <TableCell>{patient.Age}</TableCell>
                                <TableCell>{patient.Gender}</TableCell>
                                <TableCell>{patient.Phone}</TableCell>
                                <TableCell>{patient.Zone}</TableCell>
                                <TableCell>{patient.Woreda}</TableCell>
                                <TableCell>{patient.Tabiya}</TableCell>
                                <TableCell>{patient.amount}</TableCell>
                                <TableCell>{patient.DateTime}</TableCell>
                            </TableRow>
                        ))):
                        (
                            patients, filteredPatients.map(patient => (
                                <TableRow key={patient._id}>
                                    <TableCell>{patient.First_name}</TableCell>
                                    <TableCell>{patient.Last_name}</TableCell>
                                    <TableCell>{patient.Age}</TableCell>
                                    <TableCell>{patient.Gender}</TableCell>
                                    <TableCell>{patient.Phone}</TableCell>
                                    <TableCell>{patient.Zone}</TableCell>
                                    <TableCell>{patient.Woreda}</TableCell>
                                    <TableCell>{patient.Tabiya}</TableCell>
                                    <TableCell>{patient.amount}</TableCell>
                                    <TableCell>{patient.DateTime}</TableCell>
                                </TableRow>))  
                        )}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
}
export default Patients;