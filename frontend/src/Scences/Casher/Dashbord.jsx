import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem, Box, useTheme, Typography} from '@mui/material';
import { tokens } from "../../theme"; 
import { PersonRemove, PersonAdd, Groups, MonetizationOn } from "@mui/icons-material"; 
import StatBox from "../../Components/StatBox";
import Column from '../../Components/CasherComponents/BarChart'
import LineChart from '../../Components/Barchart'
import Table from '../../Components/CasherComponents/Table'
import Scattered from '../../Components/CasherComponents/ScatterDot'
function Dashboard() {
    const [patients, setPatients] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeChart, setActiveChart] = useState(<Column />);
    const theme = useTheme();
    const [totalAmount, setTotalAmount] = useState(0);
    const colors = tokens(theme.palette.mode);
    const [totalRegisteredPatients, setTotalRegisteredPatients] = useState(0);
    const [Inpatient, setInPatient] = useState(0);
    const [discharged, setDischarged] = useState(0);
    const [totalCosts, setTotalCosts] = useState(0);
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
    useEffect(() => {
        axios.get('http://localhost:3000/financialrecord')
            .then(response => {
                setPatients(response.data)
                setTotalRegisteredPatients(response.data.length);
                const total = response.data.reduce((acc, curr) => acc + curr.amount, 0);
                setTotalAmount(total);            
            })
            .catch(error => console.log(error));
    }, []);
    useEffect(() => {
        const fetchCosts = async () => {
          try {
            const endpoints = [
              'http://localhost:3000/dischargedlist' ||
              'http://localhost:3000/Appointment' || 
              'http://localhost:3000/admitted' ||
              'http://localhost:3000/referedlists'
            ];
            const responses = await Promise.all(endpoints.map(endpoint => axios.get(endpoints)));
            const costs = responses.flatMap(response => response.data.map(item => item.Costs));
            const totalCosts = costs.reduce((acc, cost) => acc + parseFloat(cost || 0), 0);
            setTotalCosts(totalCosts);
          } catch (error) {
            console.error('Error fetching costs:', error);
          }
        };
    
        fetchCosts();
      }, []);
      const totalMoney  = totalAmount + totalCosts;
    useEffect(() => {
        axios.get('http://localhost:3000/dischargedlist')
            .then(response => {
                setPatients(response.data);
                setDischarged(response.data.length)
            })
            .catch(error => {
                console.error('Error fetching patients:', error);
            });
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
  
    return (
        <Box mt="20px" width='100%' height='100%'>
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="120px"
                gap="10px"
            >
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" borderRadius='20px'>
                    <StatBox
                        title={totalRegisteredPatients}
                        subtitle="Total Patients"
                        icon={<Groups sx={{ color: colors.blueAccent[600], fontSize: "26px" }} />}
                    />
                </Box>
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" borderRadius='20px'>
                    <StatBox
                        title={Inpatient}
                        subtitle="New In Patients"
                        icon={<PersonAdd sx={{ color: colors.blueAccent[600], fontSize: "26px" }} />}
                    />
                </Box>
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" borderRadius='20px' justifyContent="center">
                    <StatBox
                        title={discharged}
                        subtitle="Dc Patients "
                        icon={<PersonRemove sx={{ color: colors.redAccent[600], fontSize: "26px" }} />}
                    />
                </Box>
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" borderRadius='20px' justifyContent="center">
                    <StatBox
                        title={totalMoney}
                        subtitle="total Costs "
                        icon={<MonetizationOn sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
                    />
                </Box>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gridGap="20px" mt="20px">
                <Box gridColumn="span 1">
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>Inpatient statistics</Typography>
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
                      {activeChart} 
                </Box>
                <Box gridColumn="span 1">
                    <Typography variant="h5" fontWeight="600" color={colors.blueAccent[100]} pl={10}> stastics of registaring patients</Typography>
                    <Box height="250px" mt="10px">
                        <Scattered />
                    </Box>
                </Box>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gridGap="20px" mt="50px">
                <Box gridColumn="span 1" mt={4}>
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>Patient statistics by diagnosis</Typography>
                    <Box height="250px" mt="10px">
                        <Column />
                    </Box>
                </Box>
                <Box gridColumn="span 1" mt={4}>
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>Diagnosis statistics by address</Typography>
                    <Box height="250px" mt="10px">
                        <Column />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default Dashboard;