import React, { useEffect, useState } from 'react';
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie,} from 'recharts';
import axios from 'axios';
import { Box } from '@mui/material';
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
      const inpatientsResponse = await axios.get('http://localhost:3000/');
      const outpatientsResponse = await axios.get('http://localhost:3000/dischargedlist');

      const inpatientsData = inpatientsResponse.data;
      const outpatientsData = outpatientsResponse.data;

      const filteredInpatients = filterData(inpatientsData, zoneFilter, ageGroupFilter, genderFilter);
      const filteredOutpatients = filterData(outpatientsData, zoneFilter, ageGroupFilter, genderFilter);
      console.log('Filtered inpatients:', filteredInpatients);
      console.log('Filtered outpatients:', filteredOutpatients);
      const combinedData = combineData(filteredInpatients, filteredOutpatients);

      setData(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  // Function to combine and aggregate data from inpatients and outpatients collections
const combineData = (inpatientsData, outpatientsData) => {
  const combinedData = [];
  
  // Create a map to store counts for each month
  const monthlyCounts = {};

  // Aggregate inpatients data by month
  inpatientsData.forEach(patient => {
    const month = new Date(patient.date).getMonth() + 1; // Assuming there's a 'date' field in the patient object
    monthlyCounts[month] = monthlyCounts[month] || { inpatients: 0, outpatients: 0 };
    monthlyCounts[month].inpatients++;
  });

  // Aggregate outpatients data by month
  outpatientsData.forEach(patient => {
    const month = new Date(patient.date).getMonth() + 1; // Assuming there's a 'date' field in the patient object
    monthlyCounts[month] = monthlyCounts[month] || { inpatients: 0, outpatients: 0 };
    monthlyCounts[month].outpatients++;
  });

  // Convert monthly counts to an array of objects
  Object.keys(monthlyCounts).forEach(month => {
    combinedData.push({
      name: `Month ${month}`,
      inpatients: monthlyCounts[month].inpatients || 0,
      outpatients: monthlyCounts[month].outpatients || 0,
    });
  });

  return combinedData;
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
    <Box>
      <label>Zone:</label>
      <select value={zoneFilter} onChange={handleZoneFilterChange}>
        <option value="all">All</option>
        <option value="central">central</option>
        <option value="northern">Northern</option>
        <option value="western">western</option>
        <option value="estern">estern</option>
        <option value="mekelle">mekelle</option>
        {/* Add more options for zones */}
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
  <ResponsiveContainer width="100%" aspect={2}>
    <PieChart>
      <Pie data={data} dataKey="inpatients" nameKey="name" fill="#8884d8" label />
      <Pie data={data} dataKey="outpatients" nameKey="name" fill="#82ca9d" label />
      <Tooltip />
      <Legend />
    </PieChart>
    </ResponsiveContainer>
    </Box>
  );
}
export default InOutPatientsChart