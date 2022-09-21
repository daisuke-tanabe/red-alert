import React, { useState } from 'react';
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
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

type ProjectAdditionDialogBaseProps = {
  isOpen: boolean;
  handleClickDialogToggleButton: () => void;
  handleChangeProjectName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeProjectUrl: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickSaveButton: () => Promise<void>;
};

const ProjectAdditionDialog = (props: ProjectAdditionDialogBaseProps) => {
  const {
    isOpen,
    handleClickDialogToggleButton,
    handleChangeProjectName,
    handleChangeProjectUrl,
    handleClickSaveButton,
  } = props;
  const [mode, setMode] = useState<'search' | 'register'>('search');

  const handleClickSearchSwitchButton = () => {
    setMode('search');
  };

  const handleClickRegisterSwitchButton = () => {
    setMode('register');
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClickDialogToggleButton}>
      <Grid container>
        <Grid xs={1.5} sx={{ alignSelf: 'center', justifyContent: 'center' }} container>
          <IconButton sx={{ width: 44, height: 44 }} onClick={handleClickDialogToggleButton}>
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Grid>
        <Grid xs={10.5}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ my: 3, mx: 2 }} />}
            sx={{ alignItems: 'center' }}
          >
            <DialogTitle sx={{ pl: 0, pr: 1.5, py: 2.5 }}>
              プロジェクトを{mode === 'register' ? '登録' : '検索'}する
            </DialogTitle>
            <Button variant={mode === 'search' ? 'outlined' : 'text'} onClick={handleClickSearchSwitchButton}>
              検索
            </Button>
            <Button variant={mode === 'register' ? 'outlined' : 'text'} onClick={handleClickRegisterSwitchButton}>
              登録
            </Button>
          </Stack>
        </Grid>
        <DialogContent sx={{ pt: 5, px: 0, pb: 6 }} dividers>
          <Grid container>
            <Grid xs={1.5} />
            <Grid xs={9}>
              {mode === 'register' ? (
                <>
                  <DialogContentText sx={{ mb: 4 }}>
                    新規登録するプロジェクトの名前とURLを入力してください。
                  </DialogContentText>
                  <InputBase
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
                    onChange={handleChangeProjectName}
                  />
                  <InputBase
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
                    onChange={handleChangeProjectUrl}
                  />
                </>
              ) : (
                <>
                  <DialogContentText sx={{ mb: 4 }}>登録済みのプロジェクトから検索して追加します。</DialogContentText>
                  <InputBase
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
                  />
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
          <DialogActions sx={{ px: 0, py: 2.5, justifyContent: 'start' }}>
            <Button variant="outlined" onClick={handleClickSaveButton}>
              保存する
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default ProjectAdditionDialog;
