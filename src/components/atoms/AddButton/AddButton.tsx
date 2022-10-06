import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
  handleClick: () => void;
};

const AddButton = (props: Props) => {
  const { handleClick } = props;
  const theme = useTheme();

  return (
    <ButtonBase
      sx={{
        width: 40,
        height: 40,
        color: theme.palette.primary.main,
        background: 'white',
        borderRadius: '50%',
        boxShadow: theme.shadows['1'],
      }}
      onClick={handleClick}
    >
      <AddIcon />
    </ButtonBase>
  );
};

export default AddButton;
