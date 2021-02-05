import React, { useEffect } from "react";
// mui components
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import { useParams } from 'react-router-dom';
import { loadCurrentShow } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux'
import ShowsService from '../services/shows-service';
import { imageApiBaseUrl } from '../constants/api';

const showsService = new ShowsService();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  poster: {
    width: 240,
    padding: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  details: {
    display: 'flex',
    marginBottom: 10,
    alignItems: 'center',
  },
}));

export default function ShowDetails (props) {
  const classes = useStyles();
  const { id } = useParams();
  const { currentShow } = useSelector((store) => store);
  const dispatch = useDispatch();

  const fetchShow = async () => {
    const showDetailsResponse = await showsService.getDetails(id);
    const showDetails = showDetailsResponse.payload;

    if(showDetailsResponse.isSuccess) {
      // save show on store
      dispatch(loadCurrentShow(showDetails));
    }
  }

  useEffect(() => {
    // fetch show details
    fetchShow();
  }, [id]);

  return <section className={classes.root}>
    <div className={classes.details}>
      <img 
        className={classes.poster}
        src={imageApiBaseUrl + currentShow.poster_path}
      />
      <div>
        <Typography variant="h4" component="h2">
          {currentShow.name}
        </Typography>
        <p>
          {currentShow.overview}
        </p>
      </div>
    </div>
    
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="status-content"
        id="status-header"
      >
        <Typography className={classes.heading}>Estado</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {currentShow.status}
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="genre-content"
        id="genre-header"
      >
        <Typography className={classes.heading}>Genero</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <ul>
          {
            currentShow.genres ? currentShow.genres.map((g) => g.name).join(', ')
            : null
          }
          </ul>
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="seasons-content"
        id="seasons-header"
      >
        <Typography className={classes.heading}>Temporadas</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {currentShow.number_of_seasons}
        </Typography>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="episodes-content"
        id="episodes-header"
      >
        <Typography className={classes.heading}>Episodios</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {currentShow.number_of_episodes}
        </Typography>
      </AccordionDetails>
    </Accordion>
  </section>;
}