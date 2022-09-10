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
import { DataGrid } from '@mui/x-data-grid';
import Header from './Header';

const columns = [
  // {
  //   field: 'browser',
  //   headerName: 'Browser',
  //   width: 100,
  // },
  {
    field: 'message',
    headerName: 'Message',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    minWidth: 300,
  },
  // {
  //   field: 'level',
  //   headerName: 'Level',
  //   width: 100,
  // },
  {
    field: 'date',
    headerName: 'Date',
    minWidth: 144,
  },
  {
    field: 'path',
    headerName: 'Path',
    minWidth: 200,
    maxWidth: 300,
  },
];

const rows = [
  {
    id: '1',
    date: '2022-04-01 00:00',
    level: 'critical',
    path: '/path/to/hoge',
    browser: 'Chrome',
    message:
      ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '2',
    date: '2022-04-01 00:00',
    level: 'error',
    path: '/ja/docs/Web/Guide',
    browser: 'Chrome',
    message: 'Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '3',
    date: '2022-12-01 00:00',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: 'Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '4',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '5',
    level: 'critical',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '6',
    level: 'error',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '7',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '8',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '9',
    level: 'critical',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '10',
    level: 'error',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '11',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '12',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '13',
    level: 'critical',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '14',
    level: 'error',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '15',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '16',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '17',
    level: 'critical',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '18',
    level: 'error',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '19',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '20',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '21',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '22',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '23',
    level: 'critical',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '24',
    level: 'error',
    path: 'https://www.google.com/',
    browser: 'Chrome',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '25',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'Safari',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
  {
    id: '26',
    level: 'warning',
    path: 'https://www.google.com/',
    browser: 'IE',
    message: ' Failed prop type: The prop `md` of `Grid` can only be used together with the `item` prop.',
  },
];

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

const App = () => {
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
          <img src="/logo.png" width="24px" height="24px" />
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

      <Grid
        css={{
          flex: 1,
          // background: '#f6f7f9'
          // background: '#F4F8F9',
        }}
      >
        <main>
          <Header />

          <div style={{ display: 'flex', padding: '40px' }}>
            <div style={{ flexGrow: 1, height: '836px' }}>
              <DataGrid
                css={{
                  border: 0,
                  // backgroundColor: 'white',
                  // boxShadow:
                  //   '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
                  '.MuiDataGrid-columnHeaders': {
                    border: 0,
                  },
                  '.MuiDataGrid-columnHeader:focus': {
                    outline: 0,
                  },
                  '.MuiDataGrid-columnHeaderTitle': {
                    color: '#6C6E6E',
                    fontSize: '16px',
                  },
                  '.MuiDataGrid-cell': {
                    border: 0,
                    background: '#fff',
                    padding: '0 20px',
                  },
                  '& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight) > .MuiDataGrid-cell': {
                    whiteSpace: 'inherit',
                  },
                  '.MuiDataGrid-cellContent': {
                    fontSize: '13px',
                    display: '-webkit-box',
                    '-webkit-line-clamp': '2',
                    '-webkit-box-orient': 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.8,
                  },
                  '.MuiDataGrid-columnSeparator': {
                    display: 'none',
                  },
                }}
                rows={rows}
                columns={columns}
                headerHeight={40}
                rowHeight={64}
                pageSize={20}
                density="comfortable"
                getRowSpacing={(params) => {
                  const isCurrentLast = params.indexRelativeToCurrentPage === 19;

                  return {
                    top: 4,
                    bottom: isCurrentLast ? 0 : 4,
                  };
                }}
              />
            </div>
          </div>
        </main>
      </Grid>
    </Grid>
  );
};

export default App;
