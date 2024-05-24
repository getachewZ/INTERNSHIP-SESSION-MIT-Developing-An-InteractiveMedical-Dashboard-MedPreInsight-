import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
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
      const newPatientsResponse = await axios.get('http://localhost:3000/');
      const totalPatientsResponse = await axios.get('http://localhost:3000/financialrecord');
      const appointedPatientsResponse = await axios.get('http://localhost:3000/Appointment');
      const addmittedPatientsResponse = await axios.get('http://localhost:3000/admitted');
      const referedPatientsResponse = await axios.get('http://localhost:3000/referedlists')
      const dischardgedPatientsResponse = await axios.get('http://localhost:3000/dischargedlist')
      const newPatientsData = addDayOfWeek(newPatientsResponse.data); // Add day of the week
      const appointedPatientsData = addDayOfWeek(appointedPatientsResponse.data); // Add day of the week
      const addmittedPatientsData = addDayOfWeek(addmittedPatientsResponse.data); // Add day of the week
      const totalPatientsData = addDayOfWeek(totalPatientsResponse.data); // Add day of the week
      const referedPatientsData = addDayOfWeek(referedPatientsResponse.data);
      const dischargedPatientsData = addDayOfWeek(dischardgedPatientsResponse.data)
      const filteredNewPatients = filterData(newPatientsData, zoneFilter, ageGroupFilter, genderFilter);
      const filteredAppointedPatients = filterData(appointedPatientsData, zoneFilter, ageGroupFilter, genderFilter);
      const filteredAddmittedPatients = filterData(addmittedPatientsData, zoneFilter, ageGroupFilter, genderFilter);
      const filteredTotalPatients = filterData(totalPatientsData, zoneFilter, ageGroupFilter, genderFilter);;
      const filteredReferedPatients = filterData(referedPatientsData, zoneFilter, ageGroupFilter, genderFilter)
      const filteredDischargedPatients = filterData(dischargedPatientsData, zoneFilter, ageGroupFilter, genderFilter);
      const combinedData = combineData(filteredNewPatients, filteredAppointedPatients, filteredAddmittedPatients, filteredReferedPatients, filteredDischargedPatients, filteredTotalPatients);
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

  // Function to add day of the week to each data object
  const addDayOfWeek = (data) => {
    return data.map(item => {
      const date = new Date(item.date);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      return { ...item, dayOfWeek };
    });
  };

  // Function to combine and aggregate data from newPatients, appointedPatients, addmittedPatients, and totalPatients collections
  const combineData = (newPatientsData, appointedPatientsData, addmittedPatientsData, referedPatientsData, dischargedPatientsData, totalPatientsData, ) => {
    const combinedData = [];
    
    // Create a map to store counts for each day of the week
    const dailyCounts = {};

    // Aggregate newPatients data by day of the week
    newPatientsData.forEach(patient => {
      const dayOfWeek = patient.dayOfWeek;
      dailyCounts[dayOfWeek] = dailyCounts[dayOfWeek] || { newPatients: 0, appointedPatients: 0, addmittedPatients: 0,
       referedPatients:0, dischargedPatients:0, totalPatients: 0};
      dailyCounts[dayOfWeek].newPatients++;
    });

    // Aggregate appointedPatients data by day of the week
    appointedPatientsData.forEach(patient => {
      const dayOfWeek = patient.dayOfWeek;
      dailyCounts[dayOfWeek] = dailyCounts[dayOfWeek] || { newPatients: 0, appointedPatients: 0, addmittedPatients: 0, 
        referedPatients:0, dischargedPatients:0, totalPatients: 0};
      dailyCounts[dayOfWeek].appointedPatients++;
    });

    // Aggregate addmittedPatients data by day of the week
    addmittedPatientsData.forEach(patient => {
      const dayOfWeek = patient.dayOfWeek;
      dailyCounts[dayOfWeek] = dailyCounts[dayOfWeek] || { newPatients: 0, appointedPatients: 0, addmittedPatients: 0,
         referedPatients:0, dischargedPatients:0, totalPatients: 0};
      dailyCounts[dayOfWeek].addmittedPatients++;
    });
    referedPatientsData.forEach(patient => {
      const dayOfWeek = patient.dayOfWeek;
      dailyCounts[dayOfWeek] = dailyCounts[dayOfWeek] || { newPatients: 0, appointedPatients: 0, addmittedPatients: 0, 
        referedPatients:0, dischargedPatients:0, totalPatients: 0};
      dailyCounts[dayOfWeek].referedPatients++;
    });
    dischargedPatientsData.forEach(patient => {
      const dayOfWeek = patient.dayOfWeek;
      dailyCounts[dayOfWeek] = dailyCounts[dayOfWeek] || { newPatients: 0, appointedPatients: 0, addmittedPatients: 0, 
        referedPatients:0, dischargedPatients:0, totalPatients: 0};
      dailyCounts[dayOfWeek].dischargedPatients++;
    });
    // Aggregate totalPatients data by day of the week
    totalPatientsData.forEach(patient => {
      const dayOfWeek = patient.dayOfWeek;
      dailyCounts[dayOfWeek] = dailyCounts[dayOfWeek] || { newPatients: 0, appointedPatients: 0, addmittedPatients: 0, 
        referedPatients:0, dischargedPatients:0, totalPatients: 0};
      dailyCounts[dayOfWeek].totalPatients++;
    });

    // Convert daily counts to an array of objects
    Object.keys(dailyCounts).forEach(dayOfWeek => {
      combinedData.push({
        name: dayOfWeek,
        newPatients: dailyCounts[dayOfWeek].newPatients || 0,
        appointedPatients: dailyCounts[dayOfWeek].appointedPatients || 0,
        addmittedPatients: dailyCounts[dayOfWeek].addmittedPatients || 0,
        referedPatients: dailyCounts[dayOfWeek].referedPatients || 0,
        dischargedPatients: dailyCounts[dayOfWeek].dischargedPatients || 0,
        totalPatients: dailyCounts[dayOfWeek].totalPatients || 0,
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
      <Box display='flex'>
        <Box>
          <label>Zone:</label>
          <select value={zoneFilter} onChange={handleZoneFilterChange}>
            <option value="all">All</option>
            <option value="central">Central</option>
            <option value="northern">Northern</option>
            <option value="western">Western</option>
            <option value="estern">Estern</option>
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
        <BarChart
          data={data}
          margin={{
            right: 30,
            // left: 20,
            bottom: 35,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalPatients" fill="#089388" />
          <Bar dataKey="newPatients" fill="#8884d8" />
          <Bar dataKey='addmittedPatients' fill='#4d1487'/>
          <Bar dataKey="appointedPatients" fill="#82ca9d" />
          <Bar dataKey='referedPatients' fill='#32ed78'/>
          <Bar dataKey='dischargedPatients' fill='#9d0e77'/>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default InOutPatientsChart;
