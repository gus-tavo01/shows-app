import React from 'react';
// mui components
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
// components
import ShowCard from './ShowCard';

import { imageApiBaseUrl } from '../constants/api';
import formatRate from '../helpers/formatRate';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 700,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

  }
});

export default function ShowsList (props) {
  const classes = useStyles();
  // TODO
  // replace by store sortBy value
  const [sortBy, setSortBy] = React.useState('name');

  const handleOnSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return <section className={classes.root}>
    <Typography variant="h2" gutterBottom>
      { props.title }
    </Typography>
    <Container maxWidth="sm" className={classes.controls}>
    <Typography variant="subtitle1" component="label">Ordenar por:</Typography>
      <Select
        id="sortSelector"
        value={sortBy}
        onChange={handleOnSortChange}
        displayEmpty
      >
        <MenuItem value="name">Nombre</MenuItem>
        <MenuItem value="rate">Puntuacion</MenuItem>
      </Select>
      <IconButton aria-label="ascendente-descendente">
        <Tooltip title="Ascendente-Descendente">
          <ImportExportIcon />
        </Tooltip>
      </IconButton>
    </Container>
    <CssBaseline />
    <Container maxWidth="sm">
      {
        props.shows.map ((show) => (
          <ShowCard
            key={show.id}
            id={show.id}
            title={show.name}
            rate={formatRate(show.vote_average)}
            imageSrc={imageApiBaseUrl + show.poster_path}
            onItemClick={() => props.onShowClick(show.id)}
          />
        ))
      }
    </Container>
  </section>;
}

ShowsList.defaultProps = {
  shows: [],
  title: 'Shows list section',
  onShowClick: () => {}
}