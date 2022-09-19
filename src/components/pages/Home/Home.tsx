import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
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
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { addDoc, collection, getFirestore, getDocs, setDoc } from 'firebase/firestore';
import { app } from '../../../../firebase.config';
import { AuthContext } from '../../../provider/AuthProvider';
import Header from '../../organisms/Header/Header';

type Projects = {
  id: string;
  name: string;
  url: string;
}[];

const Home = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState({ name: '', url: '' });
  const [projects, setProjects] = useState<Projects>([]);
  const userPhoto = user && user.photoURL ? user.photoURL.replace('normal', 'bigger') : '';
  const headerProps = { userPhoto };
  const theme = useTheme();

  const handleClickAddButton = () => {
    setIsOpen(true);
  };

  const handleClickCloseButton = () => {
    setIsOpen(false);
  };

  const handleChangeProjectName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProject({
      ...project,
      name: event.target.value,
    });
  };

  const handleChangeProjectUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProject({
      ...project,
      url: event.target.value,
    });
  };

  const handleClickSaveButton = async () => {
    const db = getFirestore(app);

    // DocumentReference
    const projectsCol = collection(db, 'projects');

    // TODO nameが重複しないようにチェックしたほうがいいかも
    await addDoc(projectsCol, project).then(async (docRef) => {
      // doc(projectsCol, docRef.id);
      await setDoc(docRef, { id: docRef.id }, { merge: true });
    });

    const querySnapshot = await getDocs(projectsCol);
    const newProjects = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        name: data.name,
        url: data.url,
      };
    });
    setProjects(newProjects);

    // TODO 成功したらstateの変更をするようにする
    setProject({ name: '', url: '' });
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      const db = getFirestore(app);
      const projectsCol = collection(db, 'projects');
      const querySnapshot = await getDocs(projectsCol);
      const newProjects = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: data.id,
          name: data.name,
          url: data.url,
        };
      });
      setProjects(newProjects);
    })();
  }, []);

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

                {projects.map(({ id, name }) => (
                  <Grid key={id} xs={12} sm={6}>
                    <Paper sx={{ height: 124 }}>
                      <ButtonBase
                        component={Link}
                        to={`/projects/${id}`}
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
                  <Stack spacing={3}>
                    <DialogContentText>監視するプロジェクトの名前とURLを入力してください。</DialogContentText>
                    <TextField
                      margin="dense"
                      id="url"
                      label="プロジェクトの名前"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChangeProjectName}
                    />
                    <TextField
                      margin="dense"
                      id="url"
                      label="プロジェクトのURL"
                      type="text"
                      fullWidth
                      variant="standard"
                      onChange={handleChangeProjectUrl}
                    />
                  </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, justifyContent: 'start' }}>
                  <Button variant="outlined" onClick={handleClickSaveButton}>
                    Save
                  </Button>
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
