// import { useState } from "react";
// import 'react-pro-sidebar/dist/css/styles.css'
// import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
// import { Box, IconButton, Typography, useTheme} from '@mui/material';
// import { Link } from "react-router-dom";
// import { tokens } from "../../theme";
// import {MenuOutlined,
//   DashboardCustomize, Groups,
//   HelpOutline, OutlinedFlag, Update} from '@mui/icons-material';
// import { UilStethoscopeAlt, UilFlask } from '@iconscout/react-unicons';
// const Item = ({ title, to, icon, selected, setSelected }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (
//     <MenuItem
//       active={selected === title}
//       style={{
//         color: colors.blueAccent[600],
//       }}
//       onClick={() => setSelected(title)}
//       icon={icon}
//     >
//       <Typography>{title}</Typography>
//       <Link to={to} />
//     </MenuItem>
//   );
// };
// const SideBar = ()=>{
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [selected, setSelected] = useState('Dashboard');

//   return (
//     <Box sx={{
//       '& .pro-sidebar-inner':{
//         background: `${colors.primary[400]} !important`
//       },
//       '& .pro-icon-wrapper':{
//         backgroundColor: 'transparent !important'
//       },
//       '& .pro-inner-item':{
//         padding: '5px 35px 5px 20px !important'
//       },
//       '& .pro-inner-item:hover':{
//         color:'#868dfb !important'
//       },
//       '& .pro-menu-item.active':{
//         color: '#68707a !important'
//       },
//     }}>
//       <ProSidebar collapsed = {isCollapsed}>
//         <Menu iconShape = 'square'>
//           <MenuItem 
//           onClick={()=>setIsCollapsed(!isCollapsed)}
//           icon={isCollapsed? <MenuOutlined/>: undefined}
//           >
//             {!isCollapsed && (
//               <Box
//               display='flex'
//               justifyContent='space-between'
//               alignItems= 'center'
//               ml='15px' >
//                 <IconButton onClick={()=>setIsCollapsed(!isCollapsed)}>
//                   <MenuOutlined/>
//                 </IconButton>
//               </Box>
//             )}
//           </MenuItem>
//           <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            
//             <Item
              
//               title="Dashboard"
//               to="/Dashboard"
//               icon={<DashboardCustomize />}
//               selected={selected}
//               setSelected={setSelected}
//             />
            
//             <Item
//               title=" Manage Patients"
//               to="/Patients"
//               icon={<Groups />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Doctors"
//               to="/Doctors"
//               icon={<UilStethoscopeAlt />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Predictions"
//               to="/predictions"
//               icon={<Update  />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="Reports"
//               to="/Reports"
//               icon={<OutlinedFlag />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//             <Item
//               title="FAQ Page"
//               to="/faq"
//               icon={<HelpOutline />}
//               selected={selected}
//               setSelected={setSelected}
//             />
//           </Box>
//         </Menu>
//       </ProSidebar >
//     </Box>
//   );
// };
// export default SideBar;
//////////////////
import React, { useState } from "react";
import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { MenuOutlined, DashboardCustomize, Groups, PersonAddAlt1Outlined, HelpOutline, OutlinedFlag, Update } from '@mui/icons-material';
import { UilStethoscopeAlt } from '@iconscout/react-unicons';
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.blueAccent[600],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link to={to}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

const SubItem = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.blueAccent[600],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link to={to}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  return (
    <Box sx={{
      '& .pro-sidebar-inner': {
        background: `${colors.primary[500]} !important`
      },
      '& .pro-icon-wrapper': {
        backgroundColor: 'transparent !important'
      },
      '& .pro-inner-item': {
        padding: '5px 35px 5px 20px !important'
      },
      '& .pro-inner-item:hover': {
        color: '#868dfb !important'
      },
      '& .pro-menu-item.active': {
        color: '#68707a !important'
      },
    }}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          <MenuItem 
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined/> : undefined}
          >
            {!isCollapsed && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='15px' 
              >
                <Typography>
                  Doctor
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined/>
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="dashboard"
              icon={<DashboardCustomize />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu title="Manage Patients" icon={<Groups />}>
              <SubItem
                title="New Patient"
                to="new-patients"
                icon={<PersonAddAlt1Outlined />}
                selected={selected}
                setSelected={setSelected}
              />
              <SubItem
                title="Appointment"
                to="Appointed-patients"
                icon={<PersonAddAlt1Outlined />}
                selected={selected}
                setSelected={setSelected}
              />
              <SubItem
                title="Admitted Patients"
                to="admitted-patients"
                icon={<PersonAddAlt1Outlined />}
                selected={selected}
                setSelected={setSelected}
              />
              <SubItem
                title="Referal"
                to="refered-patients"
                icon={<PersonAddAlt1Outlined />}
                selected={selected}
                setSelected={setSelected}
              />
              <SubItem
                title="Discharged"
                to="discharged-patients"
                icon={<PersonAddAlt1Outlined />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
             <Item
              title="Predictions"
              to="predictions"
              icon={<Update  />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reports"
              to="reports"
              icon={<OutlinedFlag />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="faqs"
              icon={<HelpOutline />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SideBar;
