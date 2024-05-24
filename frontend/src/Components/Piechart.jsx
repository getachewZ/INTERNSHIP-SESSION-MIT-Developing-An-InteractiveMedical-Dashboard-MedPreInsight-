import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const InOutPatientsChart = () => {
  const [data, setData] = useState([]);
  const [zoneFilter, setZoneFilter] = useState('all');
  const [ageGroupFilter, setAgeGroupFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, [zoneFilter, ageGroupFilter, genderFilter]);

  const fetchData = async () => {
    try {
      const [totalPatientsResponse, appointedPatientsResponse, admittedPatientsResponse, referedPatientsResponse, dischargedPatientsResponse] = await Promise.all([
        axios.get('http://localhost:3000/financialrecord'),
        axios.get('http://localhost:3000/Appointment'),
        axios.get('http://localhost:3000/admitted'),
        axios.get('http://localhost:3000/referedlists'),
        axios.get('http://localhost:3000/dischargedlist')
      ]);

      const combinedData = combineData(
        totalPatientsResponse.data,
        appointedPatientsResponse.data,
        admittedPatientsResponse.data,
        referedPatientsResponse.data,
        dischargedPatientsResponse.data
      );

      const filteredData = filterData(combinedData);

      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const combineData = (totalPatientsData, appointedPatientsData, admittedPatientsData, referedPatientsData, dischargedPatientsData) => {
    // Apply filters to each dataset
    const filteredTotalPatients = filterData(totalPatientsData);
    const filteredAppointedPatients = filterData(appointedPatientsData);
    const filteredAdmittedPatients = filterData(admittedPatientsData);
    const filteredReferedPatients = filterData(referedPatientsData);
    const filteredDischargedPatients = filterData(dischargedPatientsData);
  
    // Calculate counts for each category
    const totalPatientsCount = filteredTotalPatients.length;
    const appointedPatientsCount = filteredAppointedPatients.length;
    const admittedPatientsCount = filteredAdmittedPatients.length;
    const referedPatientsCount = filteredReferedPatients.length;
    const dischargedPatientsCount = filteredDischargedPatients.length;
  
    return [
      { name: 'Total Patients', value: totalPatientsCount },
      { name: 'Appointed Patients', value: appointedPatientsCount },
      { name: 'Admitted Patients', value: admittedPatientsCount },
      { name: 'Refered Patients', value: referedPatientsCount },
      { name: 'Discharged Patients', value: dischargedPatientsCount }
    ];
  };  
  const filterData = (data) => {
    return data.filter(patient => {
      const zoneMatch = zoneFilter === 'all' || patient.Zone === zoneFilter;
      const ageGroupMatch = ageGroupFilter === 'all' || checkAgeGroup(patient.Age, ageGroupFilter);
      const genderMatch = genderFilter === 'all' || patient.Gender === genderFilter;
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
    <Box width='100%'>
      <Box display='flex'>
        <Box>
          <label>Zone:</label>
          <select value={zoneFilter} onChange={handleZoneFilterChange}>
            <option value="all">All</option>
            <option value="central">Central</option>
            <option value="northern">Northern</option>
            <option value="western">Western</option>
            <option value="estern">Eastern</option>
            <option value="mekelle">Mekelle</option>
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
          </select>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" aspect={2}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};
export default InOutPatientsChart;