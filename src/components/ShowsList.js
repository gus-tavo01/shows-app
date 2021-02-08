import React from 'react';
import Container from '@material-ui/core/Container';
import ShowCard from './ShowCard';

import { imageApiBaseUrl } from '../constants/api';
import formatRate from '../helpers/formatRate';

export default function ShowsList (props) {
  return <Container maxWidth="sm">
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
  </Container>;
}

ShowsList.defaultProps = {
  shows: [],
  onShowClick: () => {}
}