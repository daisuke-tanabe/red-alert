import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { type User } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  documentId,
  arrayRemove,
  DocumentReference,
} from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { AuthContext } from '../../../lib/AuthProvider';
import AddIconButton from '../../atoms/AddIconButton/AddIconButton';
import ProjectCard from '../../molecules/ProjectCard/ProjectCard';
import Header from '../../organisms/Header/Header';
import ProjectEntryDialog from '../../organisms/ProjectEntryDialog/ProjectEntryDialog';

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
// TODO 型が他ファイルと重複している
type CheckedSearchResult = string[];

const Home = () => {
  // user が null なら PrivateRoute でリダイレクトでここには到達しない
  const { user } = useContext(AuthContext) as { user: User };

  // usersコレクションの該当uidを持つユーザーのドキュメントのリファレンス
  const userDocRef = doc(db, 'users', user.uid);

  // projectsコレクションのリファレンス
  const projectsColRef = collection(db, 'projects');

  // 監視中のプロジェクト
  const [monitoringProjects, setMonitoringProjects] = useState<MonitoringProjects>([]);

  const [isShowDialog, setIsShowDialog] = useState(false);

  // 登録するプロジェクト
  const [projectEntry, setProjectEntry] = useState({ name: '', url: '' });

  const toggleDialog = () => setIsShowDialog((prevState) => !prevState);

  const ejectProject = async (id: string) => {
    const projectsDocRef = doc(db, 'projects', id);
    // プロジェクトの参照を削除してステートからも削除する
    await updateDoc(userDocRef, { projects: arrayRemove(projectsDocRef) });
    setMonitoringProjects(monitoringProjects.filter(({ id: _id }) => _id !== id));
  };

  const registerMonitoringProjects = async (checkedSearchResult: CheckedSearchResult) => {
    // projectsコレクションへのリファレンスをとってユーザーにリファレンスを追加する
    const querySnapshot = await getDocs(query(projectsColRef, where(documentId(), 'in', checkedSearchResult)));
    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        await updateDoc(userDocRef, {
          projects: arrayUnion(doc.ref),
        });
        const newProject = {
          id: doc.id,
          name: data.name,
          url: data.url,
        };
        setMonitoringProjects((prevState) => [...prevState, newProject]);
      }),
    );
  };

  const registerProjects = async () => {
    // TODO nameが重複しないようにチェックしたほうがいいかも(セキュリティルールいき？)
    // projectsコレクションにランダムIDを付与したproject(新規登録プロジェクト)を作成する
    const projectDocRef = await addDoc(projectsColRef, {
      name: projectEntry.name,
      url: projectEntry.url,
    });
    // 自身を対象にしたuserへのリファレンス、projectを参照型でuserが格納
    await updateDoc(userDocRef, {
      projects: arrayUnion(projectDocRef),
    }).then(() => {
      setMonitoringProjects([
        ...monitoringProjects,
        {
          id: projectDocRef.id,
          name: projectEntry.name,
          url: projectEntry.url,
        },
      ]);
    });
  };

  useEffect(() => {
    (async () => {
      // ユーザーのスナップショット
      const userSnap = await getDoc(userDocRef);
      if (!userSnap.exists()) return;
      // TODO withConverterでの型定義が課題
      const { projects } = userSnap.data();
      const promises: Promise<Project>[] = projects.map(async (project: DocumentReference<Project>) => {
        const doc = await getDoc(project);
        const data = doc.data();
        // TODO withConverterでの型定義が課題
        return {
          id: doc.id,
          name: data?.name,
          url: data?.url,
        };
      });
      setMonitoringProjects(await Promise.all(promises));
    })();
  }, []);

  return (
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
                <AddIconButton handleClick={toggleDialog} />
              </Box>
            </Grid>

            {monitoringProjects.map(({ id, name }) => {
              const props = { id, name, handleClickEject: ejectProject };
              return (
                <Grid key={id} xs={12} sm={6}>
                  <ProjectCard {...props} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <ProjectEntryDialog
        isShow={isShowDialog}
        toggleDialog={toggleDialog}
        monitoringProjects={monitoringProjects}
        setProjectEntry={setProjectEntry}
        registerProjects={registerProjects}
        registerMonitoringProjects={registerMonitoringProjects}
      />
    </>
  );
};

export default Home;
