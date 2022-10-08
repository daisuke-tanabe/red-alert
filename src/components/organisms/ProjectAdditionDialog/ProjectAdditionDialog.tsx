import React, { useEffect, useState } from 'react';
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
  InputBase,
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

type Project = {
  id: string;
  name: string;
  url: string;
};
type ProjectAdditionDialogBaseProps = {
  isShow: boolean;
  toggleDialog: () => void;
  // TODO 型はあとで直す
  monitoringProjects: Project[];
  // TODO 型はあとで直す
  setProjectEntry: any;
  handleClickSaveButton: () => Promise<void>;
  handleClickAddButton: (result: AlgoliaHit[]) => Promise<void>;
};

type AlgoliaHit = {
  objectID: string;
  name: string;
  url: string;
  isChecked: boolean;
};

// Connect and authenticate with your Algolia app
const client = algoliaSearch('ETOZN4CMEK', '03909355275b69f35c9e9e969936e7ae');

// Create a new index and add a record
const index = client.initIndex('test_firestore');

const ProjectAdditionDialog = (props: ProjectAdditionDialogBaseProps) => {
  const { isShow, toggleDialog, monitoringProjects, setProjectEntry, handleClickSaveButton, handleClickAddButton } =
    props;
  const [tab, setTab] = useState<'search' | 'register'>('search');
  const [form, setForm] = useState({ name: '', url: '', keyword: '' });
  const [searchResult, setSearchResult] = useState<AlgoliaHit[]>([]);

  const handleClickTab = (value: 'search' | 'register') => setTab(value);
  const handleChangeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // setProjectEntryを依存に含めろという警告は正しくない
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setProjectEntry({ name: form.name, url: form.url }), [form.name, form.url]);

  useEffect(() => {
    if (form.keyword === '') {
      setSearchResult([]);
      return;
    }

    (async () => {
      await index
        .search<AlgoliaHit>(form.keyword, {
          attributesToRetrieve: ['name', 'url'],
        })
        .then((result) => {
          const filteredResult = result.hits.filter((hit) => {
            // hit.objectIDとproject.idが一致したら結果を返却して、表示から除外するので否定するようにする
            return !monitoringProjects.some((project) => hit.objectID === project.id);
          });
          const newHits = filteredResult.map((hit) => ({
            ...hit,
            isChecked: false,
          }));
          setSearchResult(newHits);
        });
    })();
    // monitoringProjectsを依存に含めろという警告は正しくない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.keyword]);

  const handleClickListButton = (id: string) => {
    const newSearchResult = searchResult.map((result) => {
      return result.objectID !== id ? result : { ...result, isChecked: !result.isChecked };
    });
    setSearchResult(newSearchResult);
  };

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
                プロジェクトを{tab === 'register' ? '登録' : '検索'}する
              </DialogTitle>
              {tab === 'search' ? (
                <Button variant="text" onClick={() => handleClickTab('register')}>
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
                {tab === 'register' ? (
                  <>
                    <DialogContentText sx={{ mb: 4 }}>
                      新規登録するプロジェクトの名前とURLを入力してください。
                    </DialogContentText>
                    <InputBase
                      autoComplete="off"
                      id="name"
                      placeholder="プロジェクトの名前"
                      type="text"
                      fullWidth
                      sx={{
                        px: 1.5,
                        py: 1,
                        fontSize: '0.875rem',
                        border: '1px solid rgba(0, 0, 0, 0.23)',
                        borderRadius: 1,
                        mb: 3,
                      }}
                      onChange={handleChangeInputField}
                      value={form.name}
                    />
                    <InputBase
                      autoComplete="off"
                      id="url"
                      placeholder="プロジェクトのURL"
                      type="text"
                      fullWidth
                      sx={{
                        px: 1.5,
                        py: 1,
                        fontSize: '0.875rem',
                        border: '1px solid rgba(0, 0, 0, 0.23)',
                        borderRadius: 1,
                      }}
                      onChange={handleChangeInputField}
                      value={form.url}
                    />
                  </>
                ) : (
                  <>
                    <DialogContentText sx={{ mb: 4 }}>登録済みのプロジェクトから追加します。</DialogContentText>
                    <InputBase
                      autoComplete="off"
                      id="keyword"
                      placeholder="プロジェクトを検索"
                      type="text"
                      fullWidth
                      sx={{
                        px: 1.5,
                        py: 1,
                        fontSize: '0.875rem',
                        border: '1px solid rgba(0, 0, 0, 0.23)',
                        borderRadius: 1,
                      }}
                      onChange={handleChangeInputField}
                      value={form.keyword}
                    />
                    <List>
                      {searchResult.map((search) => {
                        const { name, objectID, isChecked } = search;
                        return (
                          <ListItem key={objectID} disablePadding>
                            <ListItemButton onClick={() => handleClickListButton(objectID)}>
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
                )}
              </Grid>
              <Grid xs={1.5} />
            </Grid>
          </DialogContent>
        </Grid>
        <Grid container>
          <Grid xs={1.5} />
          <Grid xs={10.5}>
            <DialogActions sx={{ px: 0, py: 2.2195, justifyContent: 'start' }}>
              {tab === 'register' ? (
                <Button variant="outlined" onClick={handleClickSaveButton}>
                  保存する
                </Button>
              ) : (
                <Button variant="outlined" onClick={() => handleClickAddButton(searchResult)}>
                  追加する
                </Button>
              )}
            </DialogActions>
          </Grid>
        </Grid>
      </Stack>
    </Dialog>
  );
};

export default ProjectAdditionDialog;
