import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import NotificationsIcon from '@mui/icons-material/Notifications';
import avatarImage from '../../assets/images/avatar.jpg';

const Header = () => {
  const theme = useTheme();

  return (
    <div css={{}}>
      <Stack>
        <Toolbar
          css={{
            height: '62px',
            justifyContent: 'end',
            gap: '0 12px',
          }}
        >
          <IconButton sx={{ padding: '12px' }}>
            <NotificationsIcon sx={{ fontSize: '24px' }} />
          </IconButton>
          <IconButton>
            <Avatar src={avatarImage} sx={{ width: '32px', height: '32px' }} />
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
    </div>
  );
};

export default Header;
