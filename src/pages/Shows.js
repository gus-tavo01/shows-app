import React, { 
  useEffect,
  useState,
  useCallback
} from 'react';
import ShowsList from '../components/ShowsList';
import ShowsService from '../services/shows-service';
// mui components
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

import { loadCurrentShow, loadShowsList } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import ShowTypes from '../constants/showTypes';
import useLoader from '../hooks/useLoader';

const showsService = new ShowsService();
const initialPage = 1;
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
    width: '100%',
    marginBottom: 10
  }
});

export default function Shows(props) {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState('name');
  const [loadingSpinner, showSpinner, hideSpinner] = useLoader();

  const handleOnSortChange = useCallback(
    (event) => setSortBy(event.target.value),
    []
  );
  
  const dispatch = useDispatch();
  const { showsList } = useSelector((store) => store);

  const fetchShows = useCallback(
    async () => {
      showSpinner();
      let fetchResult;
      switch (props.type) {
        case ShowTypes.rated:
          fetchResult = await showsService.getTopRated(initialPage);
          break;
        case ShowTypes.popular:
          fetchResult = await showsService.getMostPopular(initialPage);
          break;
        case ShowTypes.trending:
          fetchResult = await showsService.getTrending(initialPage);
          break;
        default:
          break;
      }

      const popularShows = fetchResult.payload.results;
      // TODO: handle errors
      if (fetchResult.isSuccess)
      {
        dispatch(loadShowsList(popularShows));
      }      
      hideSpinner();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  );

  const handleOnShowClick = (showId) => {
    dispatch(loadCurrentShow(showId));
  }

  // fetch shows only when prop type is updated
  useEffect(() => {
    fetchShows();
  }, [props.type, fetchShows]);

  return (
    <section className={classes.root}>
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

      {
        loadingSpinner ||
        <ShowsList
          shows={showsList}
          onShowClick={handleOnShowClick}
        />
      }
    </section>
  )
}