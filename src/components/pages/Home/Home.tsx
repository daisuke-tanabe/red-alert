import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Box, Typography, ButtonBase, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  documentId,
  DocumentReference,
} from 'firebase/firestore';
import { app, db } from '../../../../firebase.config';
import { AuthContext } from '../../../lib/AuthProvider';
import ProjectCard from '../../molecules/ProjectCard/ProjectCard';
import Header from '../../organisms/Header/Header';
import ProjectAdditionDialog from '../../organisms/ProjectAdditionDialog/ProjectAdditionDialog';

type Project = {
  id: string;
  name: string;
  url: string;
};
type MonitoringProjects = Project[];
// TODO 型が他ファイルと重複している
type AlgoliaHit = {
  objectID: string;
  name: string;
  url: string;
  isChecked: boolean;
};

const Home = () => {
  const theme = useTheme();

  // ユーザー情報
  const { user } = useContext(AuthContext);
  const uid = user && user.uid ? user.uid : '';

  // TODO userがnullの時、例えばログイン中にアプリケーションのキャッシュをクリアするとエラーが発生してログイン画面に戻れない
  // usersコレクションの該当uidを持ったドキュメントのリファレンス
  const userDocRef = doc(db, 'users', uid);
  // projectsコレクションのリファレンス
  const projectsColRef = collection(db, 'projects');

  // 監視プロジェクト
  const [monitoringProjects, setMonitoringProjects] = useState<MonitoringProjects>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // 登録するプロジェクトの状態
  const [project, setProject] = useState({ id: '', name: '', url: '' });

  const handleClickDialogToggleButton = () => setIsDialogOpen(!isDialogOpen);

  const handleClickAddButton = async (result: AlgoliaHit[]) => {
    const filteredCheckedResult = result.filter(({ isChecked }) => isChecked);
    const mappedCheckedResult = filteredCheckedResult.map(({ objectID }) => objectID);

    // projectsコレクションへのリファレンスをとってユーザーにリファレンスを追加する
    const querySnapshot = await getDocs(query(projectsColRef, where(documentId(), 'in', mappedCheckedResult)));
    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        await updateDoc(userDocRef, {
          projects: arrayUnion(doc.ref),
        });
        const newProject = {
          id: data.id,
          name: data.name,
          url: data.url,
        };
        setMonitoringProjects([...monitoringProjects, newProject]);
      }),
    );
    setIsDialogOpen(false);
  };

  // TODO 登録した直後は全部のプロジェクトが表示される問題を抱えている
  const handleClickSaveButton = async () => {
    // TODO nameが重複しないようにチェックしたほうがいいかも(セキュリティルールいき？)
    // projectsコレクションにランダムIDを付与したproject(新規登録プロジェクト)を作成する
    const projectDocRef = await addDoc(projectsColRef, project);
    // 上記で作成したドキュメントのフィールドのidにドキュメントのidを追加する
    await setDoc(projectDocRef, { id: projectDocRef.id }, { merge: true });

    // TODO nullは入らないはずなのでuidをasにしているが眠い頭のせいか間違っているかも？後で見直しが必要
    // 自身を対象にしたuserへのリファレンス、projectを参照型でuserが格納
    await updateDoc(userDocRef, {
      projects: arrayUnion(projectDocRef),
    });

    // projectsコレクションのドキュメントを全て取得する
    const querySnapshot = await getDocs(projectsColRef);
    const newProjects = querySnapshot.docs.map((doc) => {
      const { id, name, url } = doc.data();
      return { id, name, url };
    });
    setMonitoringProjects(newProjects);

    // TODO 成功したらstateの変更をするようにする
    setProject({ id: '', name: '', url: '' });
    setIsDialogOpen(false);
  };

  useEffect(() => {
    (async () => {
      // TODO nullは入らないはずなのでuidをasにしているが眠い頭のせいか間違っているかも？後で見直しが必要
      // 自身を対象にしたuserへのリファレンス
      const userSnap = await getDoc(userDocRef);
      // TODO このあたりはまだ見直し
      if (userSnap.exists()) {
        const { projects } = userSnap.data();
        const newProjects = projects.map(async (project: DocumentReference<Project>) => {
          const doc = await getDoc(project);
          return doc.data();
        });
        Promise.all(newProjects).then((result) => {
          const newProjects = result.map((data) => {
            return {
              id: data.id,
              name: data.name,
              url: data.url,
            };
          });
          setMonitoringProjects(newProjects);
        });
      }
    })();
  }, []);

  return (
    <>
      {user ? (
        <>
          <Header />

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

                {monitoringProjects.map(({ id, name }) => {
                  const props = { id, name };
                  return (
                    <Grid key={id} xs={12} sm={6}>
                      <ProjectCard {...props} />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </Box>

          <ProjectAdditionDialog
            isOpen={isDialogOpen}
            project={project}
            setProject={setProject}
            handleClickDialogToggleButton={handleClickDialogToggleButton}
            handleClickSaveButton={handleClickSaveButton}
            handleClickAddButton={handleClickAddButton}
          />
        </>
      ) : (
        <Navigate to={'/login'} />
      )}
    </>
  );
};

export default Home;
