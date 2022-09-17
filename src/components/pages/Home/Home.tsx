import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Typography,
  Dialog,
  Button,
  ButtonBase,
  Paper,
  Container,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { AuthContext } from '../../../provider/AuthProvider';
import Header from '../../organisms/Header/Header';

const data = {
  projects: [
    {
      id: '1234',
      name: 'The New York Times',
    },
    {
      id: '2345',
      name: '日本語混じり確認用ダミーサイト',
    },
    {
      id: '3456',
      name: 'abcdefgあいうえおABCDEFGカキクケコ',
    },
  ],
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const userPhoto = user && user.photoURL ? user.photoURL.replace('normal', 'bigger') : '';
  const headerProps = { userPhoto };
  const theme = useTheme();

  const handleClickAddButton = () => {
    setIsOpen(true);
  };

  const handleClickCloseButton = () => {
    setIsOpen(false);
  };

  return (
    <>
      {user ? (
        <>
          <Header {...headerProps} />

          <Box sx={{ flexGrow: 1, px: 3, mt: -9 }}>
            <Container maxWidth="sm" disableGutters>
              <Grid container spacing={3}>
                <Grid xs={12}>
                  <Typography sx={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold', mb: 1 }}>
                    プロジェクトを監視
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonBase
                      sx={{
                        width: 40,
                        height: 40,
                        color: theme.palette.primary.main,
                        background: 'white',
                        borderRadius: '50%',
                        boxShadow: theme.shadows['1'],
                      }}
                      onClick={handleClickAddButton}
                    >
                      <AddIcon />
                    </ButtonBase>
                  </Box>
                </Grid>

                {data.projects.map(({ id, name }) => (
                  <Grid key={id} xs={12} sm={6}>
                    <Paper sx={{ height: 124 }}>
                      <ButtonBase
                        sx={{
                          height: '100%',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          width: '100%',
                          p: 2.5,
                          color: theme.palette.primary.main,
                          textAlign: 'left',
                        }}
                      >
                        <Typography sx={{ fontSize: '0.875rem' }}>{name}</Typography>
                      </ButtonBase>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClickCloseButton}>
            <Grid container sx={{ p: 4 }} rowSpacing={2}>
              <Grid xs={1} sx={{ alignSelf: 'center' }}>
                <IconButton sx={{ width: 42, height: 42 }} onClick={handleClickCloseButton}>
                  <CloseIcon fontSize="medium" />
                </IconButton>
              </Grid>
              <Grid xs={11}>
                <DialogTitle>監視するプロジェクトの追加</DialogTitle>
              </Grid>
              <Grid xs={1} />
              <Grid xs={11}>
                <DialogContent sx={{ pb: 4 }}>
                  <DialogContentText sx={{ mb: 2 }}>監視するプロジェクトのURLを入力してください。</DialogContentText>
                  <TextField
                    margin="dense"
                    id="url"
                    label="プロジェクトのURLを入力します"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions sx={{ px: 3, justifyContent: 'start' }}>
                  <Button variant="outlined">Save</Button>
                </DialogActions>
              </Grid>
            </Grid>
          </Dialog>
        </>
      ) : (
        <Navigate to={'/login'} />
      )}
    </>
  );
};

export default Home;
