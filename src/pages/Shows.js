import React from 'react';
import ShowsList from '../components/ShowsList';
import ShowsService from '../services/shows-service';
import { loadCurrentShow, loadShowsList } from '../redux/actions';
import ShowTypes from '../constants/showTypes';
import { useDispatch, useSelector } from 'react-redux'

const showsService = new ShowsService();
const initialPage = 1;

export default function Shows(props) {
  const dispatch = useDispatch();
  const { showsList } = useSelector((store) => store);

  const fetchShows = async () => {
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
    }

    const popularShows = fetchResult.payload.results;
    // TODO: handle errors
    if (fetchResult.isSuccess)
    {
      dispatch(loadShowsList(popularShows));
    }
  }

  const handleOnShowClick = (showId) => {
    dispatch(loadCurrentShow(showId));
  }

  // fetch shows only when prop type is updated
  React.useEffect(() => {
    fetchShows();
  }, [props.type]);

  return (
    <ShowsList
      title={props.title}
      shows={showsList}
      onShowClick={handleOnShowClick}
    />
  )
}