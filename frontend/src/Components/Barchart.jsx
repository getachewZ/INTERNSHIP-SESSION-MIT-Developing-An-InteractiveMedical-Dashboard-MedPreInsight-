import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';
function PatientsStatistics() {
    const [financialRecords, setFinancialRecords] = useState([]);
    const [statisticsData, setStatisticsData] = useState([]);
    const [zoneFilter, setZoneFilter] = useState('all');
    const [ageGroupFilter, setAgeGroupFilter] = useState('all');
    const [genderFilter, setGenderFilter] = useState('all');
    useEffect(() => {
      fetchData();
    }, [zoneFilter, ageGroupFilter, genderFilter]);
  
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/financialrecord');
            const totalPatientsData = response.data;
            const filteredTotalpatients = filterData(totalPatientsData, zoneFilter, ageGroupFilter, genderFilter);
            setFinancialRecords(filteredTotalpatients);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const filterData = (data, zone, ageGroup, gender) => {
      return data.filter(patient => {
        const zoneMatch = zone === 'all' || patient.Zone === zone;
        const ageGroupMatch = ageGroup === 'all' || checkAgeGroup(patient.Age, ageGroup);
        const genderMatch = gender === 'all' || patient.Gender === gender;
        return zoneMatch && ageGroupMatch && genderMatch;
      });
    };  
    const checkAgeGroup = (age, ageGroup) => {
      switch (ageGroup) {
        case 'child':
          return age < 18;
        case 'adult':
          return age >= 18 && age < 65;
        case 'senior':
          return age >= 65;
        default:
          return true; // Return true for 'all' option
      }
    };
    useEffect(() => {
        // Group financial records by registration date
        const groupedRecords = financialRecords.reduce((groups, record) => {
            const key = `${record.RegistrationYear}-${record.RegistrationMonth}-${record.RegistrationDayOfWeek}`;
            if (!groups[key]) {
                groups[key] = { date: key, Numer_of_patient: 0 };
            }
            groups[key].Numer_of_patient++;
            return groups;
        }, {});
        const statistics = Object.values(groupedRecords);
        setStatisticsData(statistics);
    }, [financialRecords]);

    const handleZoneFilterChange = (e) => {
      setZoneFilter(e.target.value);
    };
    
    const handleAgeGroupFilterChange = (e) => {
      setAgeGroupFilter(e.target.value);
    };
    
    const handleGenderFilterChange = (e) => {
      setGenderFilter(e.target.value);
    };
  return (
    <Box >
    <Box display='flex'>
    <Box>
        <label>Zone:</label>
        <select value={zoneFilter} onChange={handleZoneFilterChange}>
          <option value="all">All</option>
          <option value="central">central</option>
          <option value="northern">Northern</option>
          <option value="western">western</option>
          <option value="estern">estern</option>
          <option value="mekelle">mekelle</option>
        </select>
      </Box>
      <Box>
        <label>Age Group:</label>
        <select value={ageGroupFilter} onChange={handleAgeGroupFilterChange}>
          <option value="all">All</option>
          <option value="child">Child</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
      </Box>
      <Box>
        <label>Gender:</label>
        <select value={genderFilter} onChange={handleGenderFilterChange}>
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          {/* Add more options for gender */}
        </select>
      </Box>
      </Box>
      <Box>
    <ResponsiveContainer width='100%' height={300}>
        <BarChart width={600} height={300} data={statisticsData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" label={{ value: 'Day of the Week', position: 'insideBottom', offset: -10 }} />
            <YAxis label={{ value: 'Number of Patients', angle: -90, position: 'insideLeft',  offset:0}} />
            <Tooltip />
            <Legend />
            <Bar type="monotone" dataKey="Numer_of_patient" stroke="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
</Box>
</Box>
);
}

export default PatientsStatistics;
