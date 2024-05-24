import { Box, IconButton, useTheme, Avatar, Menu } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../../../theme";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Image from "./casher.jpg";
const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleNotification = () => {
    setShowNotifications(!showNotifications);
  };
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={toggleNotification}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={toggleSettings}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleProfileClick}>
          <Avatar src={Image} alt="profile Image" />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} sx={{ color: "blue" }}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ color: "blue" }}>
            Change Profile
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ color: "blue" }}>
            Dr.Thomas
          </MenuItem>
          <MenuItem onClick={handlelogout} sx={{ color: "blue" }}>
            Logout
          </MenuItem>
        </Menu>
      </Box>

      {showSettings && (
        <Box
          className="setting-panel"
          position="absolute"
          top="116px"
          right="10px"
          backgroundColor="white"
          boxShadow="0px 2px 5px rgb(0,0,0,0,1"
          padding="10px"
          border="55px"
          width="200px"
          maxHeight="500px"
          overflow="auto"
        >
          <Typography variant="h5" sx={{ color: "blue" }}>
            Settings
          </Typography>
          <Divider sx={{ my: 2 }} />
          <MenuItem sx={{ color: "blue" }}>General</MenuItem>
          <MenuItem sx={{ color: "blue" }}>Home</MenuItem>
          <MenuItem sx={{ color: "blue" }}>Search</MenuItem>
          <MenuItem sx={{ color: "blue" }}>Privacy and Security</MenuItem>
          <MenuItem sx={{ color: "blue" }}>Sync</MenuItem>
          <MenuItem sx={{ color: "blue" }}>Manage more settings</MenuItem>
          <Divider sx={{ my: 2 }} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;