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
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  documentId,
  DocumentReference,
} from 'firebase/firestore';
import { db } from '../../../../firebase.config';
import { AuthContext } from '../../../lib/AuthProvider';
import AddButton from '../../atoms/AddButton/AddButton';
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
  // user が null なら PrivateRoute でリダイレクトでここには到達しない
  const { user } = useContext(AuthContext) as { user: User };

  // usersコレクションの該当uidを持つユーザーのドキュメントのリファレンス
  const userDocRef = doc(db, 'users', user.uid);

  // projectsコレクションのリファレンス
  const projectsColRef = collection(db, 'projects');

  // 監視プロジェクト
  const [monitoringProjects, setMonitoringProjects] = useState<MonitoringProjects>([]);

  const [isDialogActive, setIsDialogActive] = useState(false);

  // 登録するプロジェクトの状態
  const [project, setProject] = useState({ id: '', name: '', url: '' });

  const toggleDialog = () => setIsDialogActive(!isDialogActive);

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
    setIsDialogActive(false);
  };

  const handleClickSaveButton = async () => {
    // TODO nameが重複しないようにチェックしたほうがいいかも(セキュリティルールいき？)
    // projectsコレクションにランダムIDを付与したproject(新規登録プロジェクト)を作成する
    const projectDocRef = await addDoc(projectsColRef, project);
    // 上記で作成したドキュメントのフィールドのidにドキュメントのidを追加する
    await setDoc(projectDocRef, { id: projectDocRef.id }, { merge: true });

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
    setIsDialogActive(false);
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
        return doc.data();
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
                <AddButton handleClick={toggleDialog} />
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
        isOpen={isDialogActive}
        project={project}
        setProject={setProject}
        handleClickDialogToggleButton={toggleDialog}
        handleClickSaveButton={handleClickSaveButton}
        handleClickAddButton={handleClickAddButton}
      />
    </>
  );
};

export default Home;
