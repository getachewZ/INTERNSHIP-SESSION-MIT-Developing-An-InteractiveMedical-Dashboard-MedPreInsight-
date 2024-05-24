import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import AdminPage from './Pages/AdminPage';
import { useAuth } from './contexts/AuthContext';
import UserPage from './Pages/DoctorPage';
import TriagePage from './Pages/TriagePage';
import CasherPage from './Pages/CasherPage';
import { CssBaseline,ThemeProvider } from '@mui/material';
import Prediction from './Scences/Admin/Prediction'
import { ColorModeContext, useMode} from './theme';
const App = () => {
  const [theme, colorMode] = useMode();
  const { isAuthenticated, userData } = useAuth();
  const renderNavigate = () => {
    if (userData.role === 'admin') {
      return <Navigate to="/admin" />;
    } else if (userData.role === 'doctor') {
      return <Navigate to="/doctor" />;
    }
    else if (userData.role === 'nurse') {
      return <Navigate to="/nurse" />;
    }
    else if (userData.role === 'casher') {
      return <Navigate to="/casher" />;
    }
    else if (userData.role === 'laboratory') {
      return <Navigate to="/laboratory" />;
    }
    else if (userData.role === 'pharmacy') {
      return <Navigate to="/pharmacy" />;
    }
     else {
      return <Navigate to="/" />;
    }
  };
  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Router>
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Register /> : renderNavigate()} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : renderNavigate()} />
        <Route path="/admin/*" element={isAuthenticated && userData.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/doctor/*" element={isAuthenticated && userData.role === 'doctor' ? <UserPage /> : <Navigate to="/login" />} />
        <Route path="/nurse/*" element={isAuthenticated && userData.role === 'nurse' ? <TriagePage /> : <Navigate to="/login" />} />
        <Route path="/casher/*" element={isAuthenticated && userData.role === 'casher' ? <CasherPage /> : <Navigate to="/login" />} />
        {/* <Route path='/Predictions' element = {<Prediction/>}/> */}
      </Routes>
    </Router>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
};
export default App;