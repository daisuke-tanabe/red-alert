import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Divider, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  sidebarStyles,
  sidebarHeadStyle,
  sidebarHeadTextStyle,
  listItemButtonStyle,
  listItemTextStyle,
  listItemIcon,
  listItemIconSome,
  dividerStyle,
} from './SidebarStyles';
import LogoImage from '../../../assets/images/logo.webp';

const Sidebar = () => {
  const theme = useTheme();
  const isMdAndOver = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div
      css={[
        sidebarStyles,
        {
          width: `${isMdAndOver ? '232' : '64'}px`,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration[isMdAndOver ? 'enteringScreen' : 'leavingScreen'],
          }),
        },
      ]}
    >
      <div css={sidebarHeadStyle}>
        <img src={LogoImage} width="24px" height="24px" alt="Red Alert" />
        <div
          css={[
            sidebarHeadTextStyle,
            {
              marginLeft: isMdAndOver ? '12px' : 'auto',
              opacity: isMdAndOver ? 1 : 0,
            },
          ]}
        >
          Red Alert
        </div>
      </div>
      <Divider css={dividerStyle} />
      <List>
        {[...Array(5)].map((_, index) => (
          <ListItem key={`list item ${index}`} disablePadding>
            <ListItemButton css={listItemButtonStyle}>
              <ListItemIcon css={[listItemIcon, { marginRight: isMdAndOver ? '12px' : 'auto' }]}>
                {index < 2 ? <BookmarkIcon css={listItemIconSome} /> : <BookmarkBorderIcon css={listItemIconSome} />}
              </ListItemIcon>
              <ListItemText
                primary={`list item ${index}`}
                css={[listItemTextStyle, { opacity: isMdAndOver ? 1 : 0 }]}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider css={dividerStyle} />
      <List>
        <ListItem disablePadding>
          <ListItemButton css={listItemButtonStyle}>
            <ListItemIcon css={[listItemIcon, { marginRight: isMdAndOver ? '12px' : 'auto' }]}>
              <SettingsIcon css={listItemIconSome} />
            </ListItemIcon>
            <ListItemText primary={`Settings`} css={[listItemTextStyle, { opacity: isMdAndOver ? 1 : 0 }]} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
