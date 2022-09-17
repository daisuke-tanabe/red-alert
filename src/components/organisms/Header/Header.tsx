import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Toolbar, IconButton, ButtonBase, Typography, Stack, MenuItem, Paper, Menu } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../../../provider/AuthProvider';

type HeaderProps = {
  userPhoto: string;
};

const Header = (props: HeaderProps) => {
  const { userPhoto } = props;
  const { auth, signOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/login', { replace: true });
    });
    setAnchorEl(null);
  };

  return (
    <Paper sx={{ background: theme.palette.primary.main, height: '200px' }} square elevation={0}>
      <Toolbar variant="dense" disableGutters sx={{ px: 3 }}>
        <ButtonBase href="#dummyURL">
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <div css={{ background: 'lightgray', borderRadius: '50%', width: '24px', height: '24px' }} />
            <Typography variant="siteName">Red Alert</Typography>
          </Stack>
        </ButtonBase>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleMenu}>
          <Avatar src={userPhoto} sx={{ width: '28px', height: '28px' }}>
            <PersonIcon sx={{ width: '20px', height: '20px' }} />
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <PersonIcon sx={{ fontSize: '1rem', marginRight: 1.5 }} />
            Profile
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <LogoutIcon sx={{ fontSize: '1rem', marginRight: 1.5 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </Paper>
  );
};

export default Header;
