import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Divider, useMediaQuery } from '@mui/material';
import LogoImage from '../../../assets/images/logo.webp';

const openedDrawerStyle = (theme: Theme) => ({
  width: '232px',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedDrawerStyle = (theme: Theme) => ({
  width: `64px`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const openedOrClosed = (isMdAndOver: boolean) => (isMdAndOver ? openedDrawerStyle : closedDrawerStyle);

const createDrawerStyle = (theme: Theme, isMdAndOver: boolean) => ({
  whiteSpace: 'nowrap',
  ...openedOrClosed(isMdAndOver)(theme),
  '& .MuiDrawer-paper': openedOrClosed(isMdAndOver)(theme),
});

const createIconStyle = (isMdAndOver: boolean) => ({
  minWidth: '20px',
  marginRight: isMdAndOver ? '12px' : 'auto',
});

const createTextStyle = (isMdAndOver: boolean) => ({
  opacity: isMdAndOver ? 1 : 0,
});

const Sidebar = () => {
  const theme = useTheme();
  const isMdAndOver = useMediaQuery(theme.breakpoints.up('md'));
  const drawerStyle = createDrawerStyle(theme, isMdAndOver);
  const iconStyle = createIconStyle(isMdAndOver);
  const textStyle = createTextStyle(isMdAndOver);

  return (
    <Grid container>
      <Grid
        xs="auto"
        sx={drawerStyle}
        css={{
          // 'backgroundImage': 'linear-gradient(to bottom, #086096, #076498, #08679a, #096b9c, #0c6e9e)'
          // backgroundImage: 'linear-gradient(to bottom, #b4140e, #b8121c, #bb1128, #bd1433, #be183e)'
          // background: '#2C3144',
          backgroundImage:
            'linear-gradient(to bottom, #bb1037, #c00f39, #c40f3a, #c90e3c, #ce0d3e, #d2193c, #d62339, #da2b37, #dc3c2f, #dd4a27, #dd571e, #dc6414)',
          // backgroundImage: 'linear-gradient(to bottom, #bb1037, #c00f39, #c40f3a, #c90e3c, #ce0d3e, #d1113f, #d41541, #d71842, #d91f43, #db2444, #dc2946, #de2e47)',
          // background: '#a40518',
          boxShadow: '-1px 1px 10px rgb(0 0 0 / 20%) inset',
        }}
      >
        <Box
          css={{
            alignItems: 'center',
            display: 'flex',
            padding: '0 20px',
            height: '62px',
          }}
        >
          <img src={LogoImage} width="24px" height="24px" />
          <div
            css={{
              fontWeight: 'bold',
              marginLeft: isMdAndOver ? '12px' : 'auto',
              color: 'white',
              fontSize: '20px',
              opacity: isMdAndOver ? 1 : 0,
            }}
          >
            Red Alert
          </div>
        </Box>
        <Divider css={{ borderColor: 'rgba(255,255,255, 0.4)' }} />
        <Box>
          <List>
            {[...Array(5)].map((_, index) => (
              <ListItem key={`list item ${index}`} disablePadding>
                <ListItemButton css={{ padding: '16px 23px' }}>
                  <ListItemIcon css={iconStyle}>
                    {index < 2 ? (
                      <BookmarkIcon css={{ fontSize: '18px', fill: 'white' }} />
                    ) : (
                      <BookmarkBorderIcon css={{ fontSize: '18px', fill: 'white' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={`list item ${index}`}
                    primaryTypographyProps={{ fontSize: 14, color: 'white' }}
                    css={textStyle}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider css={{ borderColor: 'rgba(255,255,255, 0.4)' }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton css={{ padding: '16px 23px' }}>
              <ListItemIcon css={iconStyle}>
                <SettingsIcon css={{ fontSize: '18px', fill: 'white' }} />
              </ListItemIcon>
              <ListItemText
                primary={`Settings`}
                primaryTypographyProps={{ fontSize: 14, color: 'white' }}
                css={textStyle}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default Sidebar;
