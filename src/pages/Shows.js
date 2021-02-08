import React, {
  useState,
  useEffect,
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
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
// redux
import {
  loadCurrentShow,
  loadShowsList,
  sortShows 
} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
// constants
import ShowTypes from '../constants/showTypes';
import Sorting from '../constants/sorting';
import useLoader from '../hooks/useLoader';
import { sortItems } from '../helpers/sortItems';

const showsService = new ShowsService();
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
  const [page, setPage] = useState(1);
  const [loadingSpinner, showSpinner, hideSpinner] = useLoader();
  const dispatch = useDispatch();
  const { shows, sorting } = useSelector((store) => store);

  const fetchShows = useCallback(
    async () => {
      showSpinner();
      let fetchResult;
      switch (props.type) {
        case ShowTypes.rated:
          fetchResult = await showsService.getTopRated(page);
          break;
        case ShowTypes.popular:
          fetchResult = await showsService.getMostPopular(page);
          break;
        case ShowTypes.trending:
          fetchResult = await showsService.getTrending(page);
          break;
        default:
          break;
      }
      
      const showsList = sortItems(fetchResult.payload.results, sorting);
      const payload = {
        items: showsList,
        totalPages: fetchResult.payload.total_pages,
      };
       
      // TODO: handle errors
      if (fetchResult.isSuccess)
      {
        dispatch(loadShowsList(payload));
      }
      hideSpinner();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.type, page]
  );

  const handleOnShowClick = (showId) => {
    dispatch(loadCurrentShow(showId));
  };

  const handleSortByChange = (event) => {
    const { value } = event.target;
    const payload = { ...sorting, field: value };
    dispatch(sortShows(payload));
  };

  const handleSortOrderChange = () => {
    let order;
    if (sorting.order === Sorting.orders.asc) {
      order = Sorting.orders.desc;
    }

    if (sorting.order === Sorting.orders.desc) {
      order = Sorting.orders.asc;
    }
    
    const payload = { ...sorting, order };
    dispatch(sortShows(payload));
  };

  const handlePagination = (e, value) => {
    setPage(value);
  };

  // fetch shows only when prop type is updated
  useEffect(() => {
    fetchShows();
  }, [props.type, page]);

  useEffect(() => {
    const list = sortItems(shows.items, sorting);
    dispatch(loadShowsList(list));
  }, [sorting.order, sorting.field]);

  return (
    <section className={classes.root}>
      <Typography variant="h2" gutterBottom>
        { props.title }
      </Typography>
      <Container maxWidth="sm" className={classes.controls}>
        <Typography variant="subtitle1" component="label">Ordenar por:</Typography>
        <Select
          id="sortSelector"
          value={sorting.field}
          onChange={handleSortByChange}
          displayEmpty
        >
          <MenuItem value={Sorting.fields.name}>Nombre</MenuItem>
          <MenuItem value={Sorting.fields.rate}>Puntuacion</MenuItem>
        </Select>
        <IconButton aria-label="ascendente-descendente" onClick={handleSortOrderChange}>
          <Tooltip title="Ascendente-Descendente">
            <ImportExportIcon />
          </Tooltip>
        </IconButton>
      </Container>

      {
        loadingSpinner ||
        <ShowsList
          shows={shows.items}
          onShowClick={handleOnShowClick}
        />
      }
      <Pagination
        count={shows.totalPages}
        onChange={handlePagination}
        page={page}
        color="primary"
        showFirstButton
        showLastButton
      />
    </section>
  )
}