import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  Stack,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  ListItemButton,
  Typography,
} from '@mui/material';
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
  const [hasCheckedSearchResult, setHasCheckedSearchResult] = useState(false);

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
  useEffect(() => {
    setHasCheckedSearchResult(checkedSearchResult.length > 0);
    // checkedSearchResult.lengthを依存に含めろという警告は正しくない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isShow}
      onClose={toggleDialog}
      scroll="paper"
      PaperProps={{
        elevation: 0,
        sx: { m: 0, maxHeight: '100%', borderRadius: 0 },
      }}
    >
      <DialogTitle component="div" sx={{ p: 2 }}>
        <Stack direction="row" sx={{ alignItems: 'center' }} spacing={1}>
          <IconButton sx={{ width: 44, height: 44 }} onClick={toggleDialog}>
            <CloseIcon fontSize="medium" />
          </IconButton>
          <Typography fontWeight="bold" fontSize="1.125rem">
            プロジェクトを{tab === 'registration' ? '登録' : '検索'}する
          </Typography>
          <Button
            variant="text"
            sx={{ fontWeight: 'bold' }}
            onClick={() => handleClickTab(tab === 'search' ? 'registration' : 'search')}
          >
            {tab === 'search' ? '登録' : '検索'}
          </Button>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 4, height: '100vh' }} dividers>
        {tab === 'search' ? (
          <>
            <Stack spacing={3}>
              <DialogContentText fontSize="0.875rem">登録済みのプロジェクトから追加します。</DialogContentText>
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
                  <ListItem key={objectID} disablePadding disableGutters dense>
                    <ListItemButton onClick={() => handleClickResult(objectID, name)} dense>
                      <ListItemIcon sx={{ minWidth: 38 }}>
                        <Checkbox
                          size="small"
                          edge="start"
                          checked={isChecked}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': objectID }}
                        />
                      </ListItemIcon>
                      <ListItemText id={objectID} primary={name} primaryTypographyProps={{ fontSize: '0.875rem' }} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </>
        ) : (
          <Stack spacing={3}>
            <DialogContentText fontSize="0.875rem">
              新規登録するプロジェクトの名前とURLを入力してください。
            </DialogContentText>
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
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 0, alignItems: 'start', flexDirection: 'column' }}>
        {tab === 'search' && hasCheckedSearchResult ? (
          <Stack direction="row" sx={{ mt: 2, mb: -0.5, width: '100%' }}>
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <Typography component="span" color={theme.palette.grey[500]} fontSize="0.875rem" fontWeight="bold">
                ［選択中］
              </Typography>
              <Typography component="span" fontSize="0.875rem">
                {checkedSearchResult.map(({ name }) => name).join('、')}
              </Typography>
            </Typography>
          </Stack>
        ) : null}
        <Button
          sx={{ my: 3, px: 4, py: 2, fontWeight: 'bold' }}
          variant="contained"
          disabled={tab === 'search' ? !hasCheckedSearchResult : form.name === '' || form.url === ''}
          disableElevation
          onClick={tab === 'search' ? handleClickApplyMonitoring : handleClickSaveProjects}
        >
          {tab === 'search' ? 'プロジェクトを追加' : 'プロジェクトを保存'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectEntryDialog;
