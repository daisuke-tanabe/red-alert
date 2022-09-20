import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ButtonBase, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type ProjectCardProps = {
  id: string;
  name: string;
};

const ProjectCard = (props: ProjectCardProps) => {
  const { id, name } = props;
  const theme = useTheme();

  return (
    <Paper sx={{ height: 124 }}>
      <ButtonBase
        component={Link}
        to={`/projects/${id}`}
        sx={{
          height: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          p: 2.5,
          color: theme.palette.primary.main,
          textAlign: 'left',
        }}
      >
        <Typography sx={{ fontSize: '0.875rem' }}>{name}</Typography>
      </ButtonBase>
    </Paper>
  );
};

export default memo(ProjectCard);
