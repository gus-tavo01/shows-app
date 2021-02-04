import React from 'react';
// mui
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
import ShowCard from '../components/ShowCard';
// service
import ShowsService from '../services/shows-service';

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

const shows = [
  {
    title: 'First show',
    rate: 3.6,
  },
  {
    title: 'Second show',
  },
  {
    title: 'Third show for my ticky siamese cat.',
  },
  {
    title: 'Yayis show siamese cat.',
  }
]

export default function ShowsList (props) {
  const classes = useStyles();
  const [sortBy, setSortBy] = React.useState('name');

  const handleOnSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return <section className={classes.root}>
    <Typography variant="h2" gutterBottom>
      { props.type } shows.
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
        shows.map ((show) => <ShowCard imageSrc="" title={show.title} rate={show.rate} />)
      }
    </Container>
  </section>;
}