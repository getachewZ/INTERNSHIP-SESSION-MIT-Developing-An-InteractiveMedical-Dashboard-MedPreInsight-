import React, { useState } from 'react'
import axios from 'axios'
import { Box} from '@mui/material'
import HospitalImage from '../../imgs/casher.jpg'
import { useNavigate } from 'react-router-dom'
function CreateUser() {
  const [First_name, setFirst_Name] = useState('')
  const [Last_name, setLast_Name] = useState('')
  const [Age, setAge] = useState('')
  const [Gender, setGender] = useState('')
  const [Phone, setPhone] = useState('')
  const [Zone, setZone] = useState('')
  const [Woreda, setWoreda] = useState('')
  const [Tabiya, setTabiya] = useState('')
  const [DateTime, setDateTime] = useState('')
  const navigate = useNavigate();
  const Submit = (e)=>{
    e.preventDefault();
  
    // Get current date and time
    const currentDate = new Date();
    setDateTime(currentDate);
  
    // Extracting registration year, month (in name), week, and day of the week
    const registrationYear = currentDate.getFullYear();
    const registrationMonth = currentDate.toLocaleString('default', { month: 'long' });
    const registrationWeek = Math.ceil(currentDate.getDate() / 7); // Assuming a week starts on Sunday
    const registrationDayOfWeek = currentDate.toLocaleString('default', { weekday: 'long' });
  
    // Include DateTime and additional registration details in the post request
    axios.post('http://localhost:3000/newPatient',{
      First_name, 
      Last_name, 
      Age, 
      Gender, 
      Phone, 
      Zone, 
      Woreda, 
      Tabiya,
      DateTime: currentDate,
      RegistrationYear: registrationYear,
      RegistrationMonth: registrationMonth,
      RegistrationWeek: registrationWeek,
      RegistrationDayOfWeek: registrationDayOfWeek
    })
    .then(result=>{
      console.log(result)
      navigate('/casher/manage-patients/casher')
    })
    .catch(err=>console.log(err))
  }
  
  return (
    <Box width='100%' height='100%'>
      <p><i><b>Welcome to the reception</b></i></p>
        <form onSubmit={Submit}>
            <fieldset>
              <legend>Patient Registration</legend>
              <Box display='flex' justifyContent='space-between' m='20px'>
                <Box display="flex" flexDirection='column'>
                  <Box>
                    <label htmlFor="First_name"><b>First_name:</b></label><br/>
                    <input type="text" placeholder='Enter First_name' id='First_name' 
                      onChange={(e)=> setFirst_Name(e.target.value)} required/>
                  </Box>
                  <Box mt='20px'>
                    <label htmlFor="Last_name"><b>Last_name:</b></label><br />
                    <input type="text" placeholder='Enter Last_name' id='Last_name' 
                      onChange={(e)=> setLast_Name(e.target.value)} required/>
                  </Box>
                  <Box mt='20px'>
                    <label htmlFor="Phone"><b>Phone:</b></label><br />
                    <input type='text' placeholder='Enter Phone' id='Phone'  
                      onChange={(e)=> setPhone(e.target.value)} required/>
                  </Box>
                  <Box display='flex' flexDirection='column' mt='20px'>
                    <Box>
                      <label htmlFor="Age"><b>Age:</b></label>
                      <input type='text' placeholder='Enter Age'id='Age'
                      onChange={(e)=> setAge(e.target.value)} required  />
                    </Box>
                    <Box>
                      <label htmlFor="Gender"><b>Gender:</b></label>
                      <input type='text' placeholder='Enter Gender'id='Gender'
                      onChange={(e)=> setGender(e.target.value)} required />
                    </Box>
                  </Box>
                </Box>
                <Box display="flex" flexDirection='column'>
                  <Box >
                    <label htmlFor="Zone"><b>Zone:</b></label><br />
                    <input type='text' placeholder='Enter Zone' id='Zone' 
                      onChange={(e)=> setZone(e.target.value)} required />
                  </Box>
                  <Box mt='20px'>
                    <label htmlFor="Woreda"><b>Woreda:</b></label><br />
                    <input type='text' placeholder='Enter Woreda' id='Woreda' 
                      onChange={(e)=> setWoreda(e.target.value)} required />
                  </Box>
                  <Box mt='20px'>
                    <label htmlFor="Tabiya"><b>Tabiya:</b></label><br />
                    <input type='text' placeholder='Enter Tabiya' id='Tabiya' 
                      onChange={(e)=> setTabiya(e.target.value)} required />
                  </Box>
                  <Box mt='40px'>
                    <button className='btn btn-success'>Submit</button>
                  </Box>
                </Box>
                <Box width='500px'>
                  <img src={HospitalImage} width='100%' height='100%' alt="Hospital"/>
                </Box>
              </Box>
            </fieldset>
        </form>
    </Box>
  );
};

export default CreateUser;
