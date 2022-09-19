import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography, ButtonBase, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { addDoc, collection, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { AuthContext } from '../../../provider/AuthProvider';
import ProjectCardBase from '../../molecules/ProjectCard/ProjectCardBase';
import Header from '../../organisms/Header/Header';
import ProjectAdditionDialogBase from '../../organisms/ProjectAdditionDialog/ProjectAdditionDialogBase';

type Projects = {
  id: string;
  name: string;
  url: string;
}[];

const Home = () => {
  const { user } = useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [project, setProject] = useState({ name: '', url: '' });
  const [projects, setProjects] = useState<Projects>([]);
  const userPhoto = user && user.photoURL ? user.photoURL.replace('normal', 'bigger') : '';
  const headerProps = { userPhoto };
  const theme = useTheme();

  // 読み取りが相当増加するのでレンダーリングを最適化してから導入する必要あり
  // onSnapshot(collection(db, "projects"), (querySnapshot) => {
  //   const newProjects = querySnapshot.docs.map((doc) => {
  //     const data = doc.data();
  //     return {
  //       id: data.id,
  //       name: data.name,
  //       url: data.url,
  //     };
  //   });
  //   console.log('onSnapshot:', newProjects);
  // });

  const handleClickDialogToggleButton = () => setIsDialogOpen(!isDialogOpen);

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
    setIsDialogOpen(false);
  };

  useEffect(() => {
    (async () => {
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
                      onClick={handleClickDialogToggleButton}
                    >
                      <AddIcon />
                    </ButtonBase>
                  </Box>
                </Grid>

                {projects.map(({ id, name }) => {
                  const props = { id, name };
                  return (
                    <Grid key={id} xs={12} sm={6}>
                      <ProjectCardBase {...props} />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </Box>

          <ProjectAdditionDialogBase
            isOpen={isDialogOpen}
            handleClickDialogToggleButton={handleClickDialogToggleButton}
            handleChangeProjectName={handleChangeProjectName}
            handleChangeProjectUrl={handleChangeProjectUrl}
            handleClickSaveButton={handleClickSaveButton}
          />
        </>
      ) : (
        <Navigate to={'/login'} />
      )}
    </>
  );
};

export default Home;
