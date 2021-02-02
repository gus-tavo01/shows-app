import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: 5
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 160,
  },
  favBtn: {
    paddingTop: 8,    
  }
}));

export default function ShowCard(props) {
  const classes = useStyles();
  const favoriteText = 'Remove from favorites';
  const nonFavoriteText = 'Add to favorites';

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={props.imageSrc}
        title={props.title}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Rate
          </Typography>
          <Rating name="read-only" value={props.rate} readOnly precision={0.5} />
        </CardContent>
      </div>
      <div className={classes.favBtn}>
        <IconButton aria-label={props.isFavorite ? favoriteText : nonFavoriteText}>
          <Tooltip title={props.isFavorite ? favoriteText : nonFavoriteText}>
            <FavoriteIcon style={props.isFavorite ? {color: 'deeppink'} : null} />
          </Tooltip>
        </IconButton>
      </div>
    </Card>
  );
}

ShowCard.propTypes = {
  rate: PropTypes.number,
  title: PropTypes.string,
  imageSrc: PropTypes.string,
  isFavorite: PropTypes.bool
}

ShowCard.defaultProps = {
  rate: 0,
  title: '',
  imageSrc: '',
  isFavorite: false
}