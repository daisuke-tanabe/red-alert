import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  Stack,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import algoliaSearch from 'algoliasearch';
import theme from '../../../theme';
import BaseTextField from '../../atoms/TextField/BaseTextField';

// TODO 他コンポーネントと重複している
type Project = {
  id: string;
  name: string;
  url: string;
};
type Projects = Project[];
type ProjectSearchResult = Pick<Project, 'name' | 'url'> & {
  objectID: string;
  isChecked: boolean;
};
type ProjectsSearchResult = ProjectSearchResult[];
type AlgoliaHitResult = Pick<ProjectSearchResult, 'objectID' | 'name' | 'url'>;
type AlgoliaHitsResult = AlgoliaHitResult[];
type ProjectRegisterForm = Pick<Project, 'name' | 'url'>;
type ProjectAdditionDialogBaseProps = {
  isShow: boolean;
  toggleDialog: () => void;
  monitoringProjects: Projects;
  setProjectEntry: Dispatch<SetStateAction<ProjectRegisterForm>>;
  registerProjects: () => Promise<void>;
  registerMonitoringProjects: (objectID: string[]) => Promise<void>;
};

type ProjectCheckedSearchResult = Pick<ProjectSearchResult, 'objectID' | 'name'>;
type ProjectsCheckedSearchResult = ProjectCheckedSearchResult[];

// Connect and authenticate with your Algolia app
const client = algoliaSearch('ETOZN4CMEK', '03909355275b69f35c9e9e969936e7ae');

// Create a new index and add a record
const index = client.initIndex('test_firestore');

const ProjectEntryDialog = (props: ProjectAdditionDialogBaseProps) => {
  const { isShow, toggleDialog, monitoringProjects, setProjectEntry, registerProjects, registerMonitoringProjects } =
    props;
  const [tab, setTab] = useState<'search' | 'registration'>('search');
  const [form, setForm] = useState({ name: '', url: '', keyword: '' });
  const [algoliaResult, setAlgoliaResult] = useState<AlgoliaHitsResult>([]);
  const [checkedSearchResult, setCheckedSearchResult] = useState<ProjectsCheckedSearchResult>([]);
  const [searchResult, setSearchResult] = useState<ProjectsSearchResult>([]);

  const handleClickTab = (value: 'search' | 'registration') => setTab(value);
  const handleChangeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleClickApplyMonitoring = () => {
    // オブジェクトIDを配列で渡してモニタリングに登録する
    registerMonitoringProjects(checkedSearchResult.map(({ objectID }) => objectID))
      .then(() => {
        // 成功すればステートをリセットする
        setForm((prevState) => ({
          ...prevState,
          keyword: '',
        }));
        setCheckedSearchResult([]);
        toggleDialog();
      })
      .catch(() => {
        // 失敗した時の仕様は後で考える
      });
  };
  const handleClickSaveProjects = () => {
    registerProjects()
      .then(() => {
        // 成功すればステートをリセットする
        setForm((prevState) => ({ ...prevState, name: '', url: '' }));
        toggleDialog();
      })
      .catch(() => {
        // 失敗した時の仕様は後で考える
      });
  };

  const handleClickResult = (objectID: string, name: string) => {
    setCheckedSearchResult((prevState) => {
      if (prevState.some((state) => state.objectID === objectID)) {
        // 選択済みならそれを除外した配列を返す
        return prevState.filter((state) => state.objectID !== objectID);
      }
      // それ以外は選択済みリストに追加する
      return [...prevState, { objectID, name }];
    });
  };

  // 登録フォームの結果を親の状態に渡す
  // setProjectEntryを依存に含めろという警告は正しくない
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setProjectEntry({ name: form.name, url: form.url }), [form.name, form.url]);

  useEffect(() => {
    if (form.keyword === '') {
      setAlgoliaResult([]);
      return;
    }

    (async () => {
      await index
        .search<AlgoliaHitResult>(form.keyword, {
          attributesToRetrieve: ['name', 'url'],
        })
        .then((result) => {
          setAlgoliaResult(result.hits);
        });
    })();
  }, [form.keyword]);

  useEffect(() => {
    const excludeMonitoringProjects = algoliaResult.filter((result) => {
      // hit.objectIDとproject.idが一致したら結果を返却して、表示から除外するので否定するようにする
      return !monitoringProjects.some((project) => project.id === result.objectID);
    });

    const mappedAlgoliaResult = excludeMonitoringProjects.map((result) => ({
      ...result,
      isChecked: checkedSearchResult.some((state) => state.objectID === result.objectID),
    }));
    setSearchResult(mappedAlgoliaResult);
  }, [algoliaResult, checkedSearchResult, monitoringProjects]);

  return (
    <Dialog fullWidth maxWidth="sm" open={isShow} onClose={toggleDialog} fullScreen>
      <Stack sx={{ flex: 1 }}>
        <Grid container>
          <Grid xs={1.5} sx={{ alignSelf: 'center', justifyContent: 'center' }} container>
            <IconButton sx={{ width: 44, height: 44 }} onClick={toggleDialog}>
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Grid>
          <Grid xs={10.5}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ my: 3, mx: 1.5 }} />}
              sx={{ alignItems: 'center' }}
            >
              <DialogTitle component="div" sx={{ pl: 0, pr: 1.5, py: 2.9005, fontSize: '1rem' }}>
                プロジェクトを{tab === 'registration' ? '登録' : '検索'}する
              </DialogTitle>
              {tab === 'search' ? (
                <Button variant="text" onClick={() => handleClickTab('registration')}>
                  登録
                </Button>
              ) : (
                <Button variant="text" onClick={() => handleClickTab('search')}>
                  検索
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
        <Grid sx={{ flex: 1 }}>
          <DialogContent sx={{ pt: 5, px: 0, pb: 6, height: 'calc(100vh - 144px)', overflowY: 'scroll' }} dividers>
            <Grid container>
              <Grid xs={1.5} />
              <Grid xs={9}>
                {tab === 'search' ? (
                  <>
                    <Stack spacing={4}>
                      <DialogContentText>登録済みのプロジェクトから追加します。</DialogContentText>
                      <BaseTextField
                        autoComplete="off"
                        id="keyword"
                        placeholder="プロジェクトを検索"
                        onChange={handleChangeInputField}
                        value={form.keyword}
                      />
                    </Stack>
                    <List>
                      {searchResult.map((search) => {
                        const { name, objectID, isChecked } = search;
                        return (
                          <ListItem key={objectID} disablePadding>
                            <ListItemButton onClick={() => handleClickResult(objectID, name)}>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={isChecked}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{ 'aria-labelledby': objectID }}
                                />
                              </ListItemIcon>
                              <ListItemText id={objectID} primary={name} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </>
                ) : (
                  <Stack spacing={4}>
                    <DialogContentText>新規登録するプロジェクトの名前とURLを入力してください。</DialogContentText>
                    <BaseTextField
                      autoComplete="off"
                      id="name"
                      placeholder="プロジェクトの名前"
                      onChange={handleChangeInputField}
                      value={form.name}
                    />
                    <BaseTextField
                      autoComplete="off"
                      id="url"
                      placeholder="プロジェクトのURL"
                      onChange={handleChangeInputField}
                      value={form.url}
                    />
                  </Stack>
                )}
              </Grid>
              <Grid xs={1.5} />
            </Grid>
          </DialogContent>
        </Grid>
        <Grid container sx={{ py: 2 }}>
          <Grid xs={1.5} />
          <Grid xs={10.5}>
            {checkedSearchResult.length > 0 ? (
              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', mb: 2 }}>
                <div css={{ fontSize: '0.9375rem', fontWeight: 'bold', color: theme.palette.grey[500] }}>
                  ［選択中］
                </div>
                <div css={{ fontSize: '0.9375rem' }}>{checkedSearchResult.map(({ name }) => name).join('、')}</div>
              </Stack>
            ) : null}
            <DialogActions sx={{ p: 0, justifyContent: 'start' }}>
              {tab === 'search' ? (
                <Button size="large" variant="outlined" onClick={handleClickApplyMonitoring}>
                  適用する
                </Button>
              ) : (
                <Button variant="outlined" onClick={handleClickSaveProjects}>
                  保存する
                </Button>
              )}
            </DialogActions>
          </Grid>
        </Grid>
      </Stack>
    </Dialog>
  );
};

export default ProjectEntryDialog;
