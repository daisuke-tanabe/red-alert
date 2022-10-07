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
    <Card sx={{ height: 148, position: 'relative' }}>
      <CardActionArea
        sx={{
          alignItems: 'normal',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          p: 2,
        }}
        component={Link}
        to={`/projects/${id}`}
      >
        <Typography
          variant="cardTitle"
          component="div"
          sx={{
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': '3',
            overflow: 'hidden',
          }}
        >
          {name}
        </Typography>
        <Typography variant="cardText" color={theme.palette.grey['400']} component="div">
          {id}
        </Typography>
      </CardActionArea>
      <CardActions sx={{ position: 'absolute', p: 0, bottom: 10, right: 10 }}>
        <IconButton onClick={() => handleClickEject(id)} sx={{ color: theme.palette.grey['400'] }}>
          <EjectIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default memo(ProjectCard);
