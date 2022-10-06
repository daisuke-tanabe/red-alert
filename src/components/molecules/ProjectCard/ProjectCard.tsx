import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import EjectIcon from '@mui/icons-material/Eject';
import { Card, CardActionArea, CardActions, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type ProjectCardProps = {
  id: string;
  name: string;
  handleClickEject: (id: string) => void;
};

const ProjectCard = (props: ProjectCardProps) => {
  const { id, name, handleClickEject } = props;
  const theme = useTheme();

  return (
    <Card sx={{ height: 128, position: 'relative' }}>
      <CardActionArea sx={{ height: '100%', px: 2, py: 1.75 }} component={Link} to={`/projects/${id}`}>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 'bold' }}>{name}</Typography>
      </CardActionArea>
      <CardActions sx={{ position: 'absolute', p: 0, bottom: 8, left: 8 }}>
        <IconButton onClick={() => handleClickEject(id)} sx={{ color: theme.palette.grey['400'] }}>
          <EjectIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default memo(ProjectCard);
