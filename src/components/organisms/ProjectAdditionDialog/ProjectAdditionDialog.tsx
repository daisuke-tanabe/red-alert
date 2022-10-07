import React, { useState } from 'react';
import { Hit } from '@algolia/client-search';
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
  isOpen: boolean;
  project: Project;
  setProject: any;
  handleClickDialogToggleButton: () => void;
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
  const { isOpen, project, setProject, handleClickDialogToggleButton, handleClickSaveButton, handleClickAddButton } =
    props;
  const [mode, setMode] = useState<'search' | 'register'>('search');
  const [searchResult, setSearchResult] = useState<AlgoliaHit[]>([]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setProject({
      ...project,
      [id]: value,
    });
  };

  const handleClickSearchSwitchButton = () => {
    setMode('search');
  };

  const handleClickRegisterSwitchButton = () => {
    setMode('register');
  };

  const handleClickListButton = (id: string) => {
    const newSearchResult = searchResult.map((result) => {
      return result.objectID !== id ? result : { ...result, isChecked: !result.isChecked };
    });
    console.log(newSearchResult);
    setSearchResult(newSearchResult);
  };

  const handleChangeSearchKeyword = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setSearchResult([]);
      return;
    }

    // Search the index and print the results
    await index
      .search<AlgoliaHit>(event.target.value, {
        attributesToRetrieve: ['objectID', 'name', 'url'],
      })
      .then((result) => {
        const newHits = result.hits.map((hit) => ({
          ...hit,
          isChecked: false,
        }));
        setSearchResult(newHits);
      });
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClickDialogToggleButton} fullScreen>
      <Stack sx={{ flex: 1 }}>
        <Grid container>
          <Grid xs={1.5} sx={{ alignSelf: 'center', justifyContent: 'center' }} container>
            <IconButton sx={{ width: 44, height: 44 }} onClick={handleClickDialogToggleButton}>
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
                プロジェクトを{mode === 'register' ? '登録' : '検索'}する
              </DialogTitle>
              {mode === 'search' ? (
                <Button variant="text" onClick={handleClickRegisterSwitchButton}>
                  登録
                </Button>
              ) : (
                <Button variant="text" onClick={handleClickSearchSwitchButton}>
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
                {mode === 'register' ? (
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
                      onChange={handleChangeInput}
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
                      onChange={handleChangeInput}
                    />
                  </>
                ) : (
                  <>
                    <DialogContentText sx={{ mb: 4 }}>登録済みのプロジェクトから追加します。</DialogContentText>
                    <InputBase
                      autoComplete="off"
                      id="search"
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
                      onChange={handleChangeSearchKeyword}
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
              {mode === 'register' ? (
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
