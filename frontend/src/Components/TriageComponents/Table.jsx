// import React, {useState, useEffect}from 'react';
// import axios from 'axios';
// import { Box } from '@mui/material';
// const TableGraph = () => {
//   const [data, setData] = useState([]);
//   const [zoneFilter, setZoneFilter] = useState('all');
//   const [ageGroupFilter, setAgeGroupFilter] = useState('all');
//   const [genderFilter, setGenderFilter] = useState('all');

//   useEffect(() => {
//     fetchData();
//   }, [zoneFilter, ageGroupFilter, genderFilter]);
//   const fetchData = async () => {
//     try {
//       const newPatientsResponse = await axios.get('http://localhost:3000/');
//       const totalPatientsResponse = await axios.get('http://localhost:3000/financialrecord');
//       const appointedPatientsResponse = await axios.get('http://localhost:3000/Appointment');
//       const addmittedPatientsResponse = await axios.get('http://localhost:3000/admitted');
//       const newPatientsData = newPatientsResponse.data; // Add day of the week
//       const appointedPatientsData = appointedPatientsResponse.data; // Add day of the week
//       const addmittedPatientsData = addmittedPatientsResponse.data; // Add day of the week
//       const totalPatientsData = totalPatientsResponse.data; // Add day of the week
//       const filteredNewPatients = filterData(newPatientsData, zoneFilter, ageGroupFilter, genderFilter);
//       const filteredAppointedPatients = filterData(appointedPatientsData, zoneFilter, ageGroupFilter, genderFilter);
//       const filteredAddmittedPatients = filterData(addmittedPatientsData, zoneFilter, ageGroupFilter, genderFilter);
//       const filteredTotalPatients = filterData(totalPatientsData, zoneFilter, ageGroupFilter, genderFilter);
//       const combinedData = combineData(filteredNewPatients, filteredAppointedPatients, filteredAddmittedPatients, filteredTotalPatients);
//       setData(combinedData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const filterData = (data, zone, ageGroup, gender) => {
//     return data.filter(patient => {
//       const zoneMatch = zone === 'all' || patient.Zone === zone;
//       const ageGroupMatch = ageGroup === 'all' || checkAgeGroup(patient.Age, ageGroup);
//       const genderMatch = gender === 'all' || patient.Gender === gender;
//       return zoneMatch && ageGroupMatch && genderMatch;
//     });
//   };  
//   const checkAgeGroup = (age, ageGroup) => {
//     switch (ageGroup) {
//       case 'child':
//         return age < 18;
//       case 'adult':
//         return age >= 18 && age < 65;
//       case 'senior':
//         return age >= 65;
//       default:
//         return true; // Return true for 'all' option
//     }
//   };

//   // Function to combine and aggregate data from newPatients and AppointedPatients collections
//   const combineData = (newPatientsData, appointedPatientsData, addmittedPatientsData, totalPatientsData) => {
//     const combinedData = []; 
//     // Create a map to store counts for each month
//     const monthlyCounts = {};

//     // Aggregate newPatients data by month
//     newPatientsData.forEach(patient => {
//       const month = new Date(patient.date).getMonth() + 1; // Assuming there's a 'date' field in the patient object
//       monthlyCounts[month] = monthlyCounts[month] || { newPatients: 0, AppointedPatients: 0, addmittedPatients: 0, totalPatients:0};
//       monthlyCounts[month].newPatients++;
//     });
//     // Aggregate AppointedPatients data by month
//     appointedPatientsData.forEach(patient => {
//       const month = new Date(patient.date).getMonth() + 1; // Assuming there's a 'date' field in the patient object
//       monthlyCounts[month] = monthlyCounts[month] || { newPatients: 0, AppointedPatients: 0, addmittedPatients: 0, totalPatients:0};
//       monthlyCounts[month].AppointedPatients++;
//     });
//     addmittedPatientsData.forEach(patient => {
//       const month = new Date(patient.date).getMonth() + 1; // Assuming there's a 'date' field in the patient object
//       monthlyCounts[month] = monthlyCounts[month] || { newPatients: 0, AppointedPatients: 0, addmittedPatients: 0, totalPatients:0};
//       monthlyCounts[month].addmittedPatients++;
//     });
    
//     totalPatientsData.forEach(patient => {
//       const month = new Date(patient.date).getMonth() + 1; // Assuming there's a 'date' field in the patient object
//       monthlyCounts[month] = monthlyCounts[month] || { newPatients: 0, AppointedPatients: 0, addmittedPatients: 0, totalPatients:0};
//       monthlyCounts[month].totalPatients++;
//     });

//     // Convert monthly counts to an array of objects
//     Object.keys(monthlyCounts).forEach(month => {
//       combinedData.push({
//         name: `Month ${month}`,
//         newPatients: monthlyCounts[month].newPatients || 0,
//         AppointedPatients: monthlyCounts[month].AppointedPatients || 0,
//         addmittedPatients: monthlyCounts[month].addmittedPatients || 0,
//         totalPatients: monthlyCounts[month].totalPatients || 0,
//       });
//     });

//     return combinedData;
//   };
//   const handleZoneFilterChange = (e) => {
//     setZoneFilter(e.target.value);
//   };

//   const handleAgeGroupFilterChange = (e) => {
//     setAgeGroupFilter(e.target.value);
//   };

//   const handleGenderFilterChange = (e) => {
//     setGenderFilter(e.target.value);
//   };
//   return (
//     <Box width='100%'>
//       <Box display='flex'>
//       <Box>
//         <label>Zone:</label>
//         <select value={zoneFilter} onChange={handleZoneFilterChange}>
//           <option value="all">All</option>
//           <option value="central">central</option>
//           <option value="northern">Northern</option>
//           <option value="western">western</option>
//           <option value="estern">estern</option>
//           <option value="mekelle">mekelle</option>

//           {/* Add more options for zones */}
//         </select>
//       </Box>
//       <Box>
//         <label>Age Group:</label>
//         <select value={ageGroupFilter} onChange={handleAgeGroupFilterChange}>
//           <option value="all">All</option>
//           <option value="child">Child</option>
//           <option value="adult">Adult</option>
//           <option value="senior">Senior</option>
//         </select>
//       </Box>
//       <Box>
//         <label>Gender:</label>
//         <select value={genderFilter} onChange={handleGenderFilterChange}>
//           <option value="all">All</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           {/* Add more options for gender */}
//         </select>
//       </Box>
//       </Box>
//     <Box mt={4}>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>NEwPatients</th>
//             <th>AppointedPatients</th>
//             <th>AdmittedPatients</th>
//             <th>TotalPatient</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((entry, index) => (
//             <tr key={index}>
//               <td>number of patients</td>
//               <td>{entry.newPatients}</td>
//               <td>{entry.AppointedPatients}</td>
//               <td>{entry.addmittedPatients}</td>
//               <td>{entry.totalPatients}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </Box>
//     </Box>
//   );
// };
// export default TableGraph;
////////////////////
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { BorderAll } from '@mui/icons-material';

const TableGraph = () => {
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

      const newPatientsData = newPatientsResponse.data;
      const appointedPatientsData = appointedPatientsResponse.data;
      const addmittedPatientsData = addmittedPatientsResponse.data;
      const totalPatientsData = totalPatientsResponse.data;

      const filteredNewPatients = filterData(newPatientsData, zoneFilter, ageGroupFilter, genderFilter);
      const filteredAppointedPatients = filterData(appointedPatientsData, zoneFilter, ageGroupFilter, genderFilter);
      const filteredAddmittedPatients = filterData(addmittedPatientsData, zoneFilter, ageGroupFilter, genderFilter);
      const filteredTotalPatients = filterData(totalPatientsData, zoneFilter, ageGroupFilter, genderFilter);

      const combinedData = combineData(filteredNewPatients, filteredAppointedPatients, filteredAddmittedPatients, filteredTotalPatients);
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
        return true;
    }
  };

  const combineData = (newPatientsData, appointedPatientsData, addmittedPatientsData, totalPatientsData) => {
    const combinedData = [];
    const monthlyCounts = {};

    newPatientsData.forEach(patient => {
      const month = new Date(patient.date).getMonth() + 1;
      monthlyCounts[month] = monthlyCounts[month] || { newPatients: 0, AppointedPatients: 0, addmittedPatients: 0, totalPatients: 0 };
      monthlyCounts[month].newPatients++;
    });

    appointedPatientsData.forEach(patient => {
      const month = new Date(patient.date).getMonth() + 1;
      monthlyCounts[month] = monthlyCounts[month] || { newPatients: 0, AppointedPatients: 0, addmittedPatients: 0, totalPatients: 0 };
      monthlyCounts[month].AppointedPatients++;
    });

    addmittedPatientsData.forEach(patient => {
      const month = new Date(patient.date).getMonth() + 1;
      monthlyCounts[month] = monthlyCounts[month] || { newPatients: 0, AppointedPatients: 0, addmittedPatients: 0, totalPatients: 0 };
      monthlyCounts[month].addmittedPatients++;
    });

    totalPatientsData.forEach(patient => {
      const month = new Date(patient.date).getMonth() + 1;
      monthlyCounts[month] = monthlyCounts[month] || { newPatients: 0, AppointedPatients: 0, addmittedPatients: 0, totalPatients: 0 };
      monthlyCounts[month].totalPatients++;
    });

    Object.keys(monthlyCounts).forEach(month => {
      combinedData.push({
        month: `Month ${month}`,
        ...monthlyCounts[month],
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
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <label>Zone:</label>
          <select value={zoneFilter} onChange={handleZoneFilterChange}>
            <option value="all">All</option>
            <option value="central">Central</option>
            <option value="northern">Northern</option>
            <option value="western">Western</option>
            <option value="eastern">Eastern</option>
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
      <Box mt={4}>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Number of Patients</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index}>
                <td>{entry.month}</td>
                <td>
                  <p>New Patients: {entry.newPatients}</p>
                  <p>Appointed Patients: {entry.AppointedPatients}</p>
                  <p>Admitted Patients: {entry.addmittedPatients}</p>
                  <p>Total Patients: {entry.totalPatients}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default TableGraph;
