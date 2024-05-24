import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem, Box, useTheme, Typography} from '@mui/material';
import { tokens } from "../../theme"; 
import { Groups, PersonAdd } from "@mui/icons-material"; 
import StatBox from "../../Components/StatBox";
import { UilBed, UilSchedule } from '@iconscout/react-unicons';
import Column from '../../Components/DoctorComponents/BarChart'
import DailyPatient from '../../Components/CasherComponents/ScatterDot'
import AppointedLists from '../Doctor/Appointment'
// import Scattered from '../../Components/LineChart'
function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Inpatient, setInPatient] = useState(0);
  const [Addmitted, setAddmitted] = useState(0);
  const [Appointment, setAppointment] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeChart, setActiveChart] = useState(<Column />);
  const [totalRegisteredPatients, setTotalRegisteredPatients]= useState(0);
  useEffect(() => {
      axios.get('http://localhost:3000/financialrecord')
          .then(response => {
              setPatients(response.data)
              setTotalRegisteredPatients(response.data.length);
          })
          .catch(error => console.log(error));
  }, []);
  useEffect(() => {
      axios.get('http://localhost:3000/')
          .then(response => {
              setPatients(response.data);
              setInPatient(response.data.length)
          })
          .catch(error => {
              console.error('Error fetching patients:', error);
          });
  }, []);
  useEffect(() => {
      axios.get('http://localhost:3000/admitted')
          .then(response => {
              setPatients(response.data);
              setAddmitted(response.data.length)
          })
          .catch(error => {
              console.error('Error fetching patients:', error);
          });
  }, []);
  useEffect(() => {
      axios.get('http://localhost:3000/Appointment')
          .then(response => {
              setPatients(response.data);
              setAppointment(response.data.length)
          })
          .catch(error => {
              console.error('Error fetching patients:', error);
          });
  }, []);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleChartClick = (chartComponent) => {
    setActiveChart(chartComponent);
    handleMenuClose();
  };
  return (
    <Box mt="20px" width='100%' height='100%'>
      <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="120px"
      gap="10px"
  >
      <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius='20px'
      >
          <StatBox
              title={totalRegisteredPatients}
              subtitle="Total Patients"
              icon={<Groups sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
      </Box>
      <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius='20px'
      >
          <StatBox
              title={Inpatient}
              subtitle="New Patients"
              icon={<PersonAdd sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
      </Box>
      <Box
          gridColumn="span 3"
          backgroundColor={colors.blueAccent[400]}
          display="flex"
          alignItems="center"
          borderRadius='20px'
          justifyContent="center"
      >
          <StatBox
              title={Addmitted}
              subtitle="Admitted Patients"
              icon={<UilBed sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
      </Box>
      <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          borderRadius='20px'
          justifyContent="center"
      >
          <StatBox
              title={Appointment}
              subtitle="Appointed Patients"
              icon={<UilSchedule sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
      </Box>
  <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            // m="5px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box ml={50}>
              <Typography
                variant="h4"
                fontWeight="600"
                color={colors.grey[100]}
              >inout Patient statistics
              </Typography>
            </Box>
              <IconButton onClick={handleMenuOpen}>
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuIcon />
                      <MenuItem onClick={() => handleChartClick(<Table />)}>Table</MenuItem>
                      <MenuItem onClick={() => handleChartClick(<Column />)}>BarChart</MenuItem>
                      <MenuItem onClick={() => handleChartClick(<LineChart />)}>LineChart</MenuItem>
                    </Menu>
          </Box>
          <Box height="250px"m="-20px 0 0 0">
            {/* <BarChart/> */}
            {activeChart} 
            {/* <Column/> */}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
          >
           predict Diagnosis  by season
          </Typography>
          {/* <Pie /> */}
          <DailyPatient/>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              > Lists of Appointed patients 
              </Typography>
            
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {/* <BarChart/> */}
            <AppointedLists/>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
          >
             diagnosis  statistics of the year, month, date and the area.
             
          </Typography>
          {/* <Pie /> */}
          {/* <Scattered/> */}
        </Box>
  </Box>
</Box>
);
};

export default DoctorDashboard;
