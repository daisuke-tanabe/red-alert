import React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar, Box, Stack, Tab, Tabs, Toolbar, IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PersonIcon from '@mui/icons-material/Person';

type HeaderProps = {
  userPhoto: string;
};

const Header = (props: HeaderProps) => {
  const theme = useTheme();
  const { userPhoto } = props;

  return (
    <Stack>
      <Toolbar
        css={{
          height: '62px',
          justifyContent: 'end',
          gap: '0 12px',
        }}
      >
        <IconButton>
          <Avatar src={userPhoto} sx={{ width: '32px', height: '32px' }}>
            <PersonIcon />
          </Avatar>
        </IconButton>
      </Toolbar>

      <Toolbar>
        <Grid css={{ marginBottom: '24px' }}>
          <Grid>
            <div
              css={{
                fontSize: '32px',
                fontWeight: 'bold',
              }}
            >
              Write website name here.
            </div>
            <Stack
              direction="row"
              css={{
                alignItems: 'center',
                color: theme.palette.grey['500'],
                fontSize: '14px',
              }}
            >
              <OpenInNewIcon
                css={{
                  fontSize: '16px',
                  marginRight: '4px',
                }}
              />
              <span>https://developer.mozilla.org/en-US/docs/Web/JavaScript</span>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
      <Box css={{ padding: '0 24px' }}>
        <Tabs
          value={0}
          indicatorColor="primary"
          css={{
            borderBottom: '1px solid',
            borderColor: '#d2ccce',
          }}
        >
          <Tab label="History" />
        </Tabs>
      </Box>
    </Stack>
  );
};

export default Header;
