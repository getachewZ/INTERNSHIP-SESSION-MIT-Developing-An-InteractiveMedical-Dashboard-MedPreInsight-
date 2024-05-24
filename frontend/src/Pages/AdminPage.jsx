import { Box, IconButton, useTheme, Divider, MenuItem, Avatar, Menu, Typography} from "@mui/material";
import {useContext, useState} from 'react';
import { ColorModeContext, tokens } from "../theme";
import InputBase from "@mui/material/InputBase";
import {LightModeOutlined, SettingsOutlined, DarkModeOutlined, NotificationsOutlined} from '@mui/icons-material';
import { UilEnvelopeAdd } from '@iconscout/react-unicons'
import SearchIcon from '@mui/icons-material/Search';
import Image from'../imgs/doctor.png';
import Logo from '../imgs/logo.jpg'
import FaqRequests from '../Scences/Reports/FaqsForm'
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import SideBar from "../Scences/Admin/Sidebar";
import ReportPage from '../Scences/Reports/ReportForm'
import PatientDashboard from '../Scences/Admin/PatientDashboard'
import PerformanceDashboard from '../Scences/Admin/PerformanceDashboard'
import Prediction from '../Scences/Admin/Prediction'
import RandomForest from "../Scences/Admin/ml/Random/RandomForest";
import Number from "../Scences/Admin/ml/Prediction/Predictions";
import SVM from "../Scences/Admin/ml/Super/SVM";
import AppointmentDashboard from '../Scences/Doctor/SetAppointment'
import PredictionPage from '../Scences/Admin/PredictionPage'
import Store from '../Scences/Admin/Store'
const Topbar = ()=> {
  const { logout } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMailing, setShowMailing] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  const toggleNotification = () => {
    setShowNotifications(!showNotifications);
  };
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const toggleMailing=()=>{
    setShowMailing(!showMailing);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    await logout();
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Box display='flex' justifyContent='space-between' p={2}>
      <Box display='flex' justifyContent='start'>
        <Avatar src= {Logo}/>
      </Box>
      <Box display='flex' justifyContent='end'>
      <Box 
      backgroundColor = {colors.primary[400]}
      borderRadius='3px'>
        <InputBase sx = {{m:2, flex:1 }} placeholder = 'Search'/>
        <IconButton type="button" >
        <SearchIcon />
      </IconButton>
      </Box>
      <Box display='flex'>
      <Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark'?(<DarkModeOutlined/>): (<LightModeOutlined/>)}
        </IconButton>
        <Link to='/notifications'>
        <IconButton onClick={toggleNotification}>
          <NotificationsOutlined/>
        </IconButton>
        </Link>
        <Link to='/messaging'>
        <IconButton onClick={toggleMailing}>
          <UilEnvelopeAdd />
        </IconButton>
        </Link>
        <IconButton onClick={toggleSettings}>
        <SettingsOutlined />
        </IconButton>
        <IconButton onClick={handleProfileClick}>
          <Avatar src={Image} alt="profile Image" />
        </IconButton>
        </Box>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Change Account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
      {showNotifications && (
        <Box
          className="notification-panel"
          position="absolute"
          top="56px"
          right="10px"
          backgroundColor="white"
          boxShadow="0px 2px 5px rgba(0,0,0,0.1)"
          padding="10px"
          width="300px"
          maxHeight="500px"
          overflow="auto"
        >
          {/* Render notifications here */}
          <Typography variant="h5" sx={{ color: "blue" }}>
            Notifications
          </Typography>
          <Divider sx={{ my: 2 }} />
          <MenuItem sx={{ color: "blue" }}>
            {" "}
            New Emergency 2 minute ago
          </MenuItem>
          <MenuItem sx={{ color: "blue" }}>New sergery 30 minutes ago</MenuItem>
          <MenuItem sx={{ color: "blue" }}>
            New Appointment 50 minutes ago
          </MenuItem>
        </Box>
      )}
      {showMailing &&(
        <Box
        className="notification-panel"
          position="absolute"
          top="56px"
          right="10px"
          backgroundColor={colors.primary[400]}
          boxShadow="0px 2px 5px rgba(0,0,0,0.1)"
          padding="10px"
          width="100%"
          maxHeight="100%"
          overflow="auto"
        >
          this is the reporting form are you reporting to whole user or to admin only?
        </Box>
      )}
      </Box>
    </Box>
    <Box display = 'flex'>
      <SideBar/>
      <Routes>
        <Route path="/" element = {<Navigate to='patients'/>}/>
        <Route path="patients" element = {<PatientDashboard/>}/>
        <Route path="performance" element = {<PerformanceDashboard/>}/>
        <Route path="pmt" element = {<AppointmentDashboard/>}/>
        <Route path="predictions/" element = {<PredictionPage/>}/>
        <Route path="predictions/diabeticprediction/" element = {<Prediction/>}/>
        <Route path="predictions/trendprediction/" element = {<Store/>}/>
        <Route path="/predictions/diabeticprediction/prediction" element = {<Number/>}/>
        <Route path="/predictions/diabeticprediction/Random" element = {<RandomForest/>}/>
        <Route path="/predictions/diabeticprediction/Super" element = {<SVM/>}/>
        <Route path="reports" element = {<ReportPage/>}/>
        <Route path="faqs" element = {<FaqRequests/>}/>
      </Routes>
    </Box>
    </Box>
  ) 
};
export default Topbar