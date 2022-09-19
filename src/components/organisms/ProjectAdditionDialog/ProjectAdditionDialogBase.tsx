import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

type ProjectAdditionDialogBaseProps = {
  isOpen: boolean;
  handleClickDialogToggleButton: () => void;
  handleChangeProjectName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeProjectUrl: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickSaveButton: () => Promise<void>;
};

const ProjectAdditionDialogBase = (props: ProjectAdditionDialogBaseProps) => {
  const {
    isOpen,
    handleClickDialogToggleButton,
    handleChangeProjectName,
    handleChangeProjectUrl,
    handleClickSaveButton,
  } = props;

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={handleClickDialogToggleButton}>
      <Grid container sx={{ p: 4 }} rowSpacing={2}>
        <Grid xs={1} sx={{ alignSelf: 'center' }}>
          <IconButton sx={{ width: 42, height: 42 }} onClick={handleClickDialogToggleButton}>
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
  );
};

export default ProjectAdditionDialogBase;
