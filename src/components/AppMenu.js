import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useHistory, useLocation } from 'react-router-dom';
import StarsIcon from '@material-ui/icons/Stars';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

const items = [
  {
    text: 'Mas populares',
    path: '/mas-populares',
    icon: <StarsIcon />,
  },
  {
    text: 'Mejor valorados',
    path: '/mejor-valorados',
    icon: <ThumbsUpIcon />,
  },
  {
    text: 'Viendo ahora',
    path: '/viendo-ahora',
    icon: <VisibilityIcon />,
  },
];
export default function AppMenu() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOnClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleOnClose = () => {
    setAnchorEl(null);
  }
  const handleOnItemClick = (item) => {
    handleOnClose();
    history.push(item.path);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            <Link to="/" className={classes.link}>Shows App</Link>
          </Typography>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit" aria-label="menu"
            onClick={handleOnClick}
          >
            <MenuIcon />
          </IconButton>

          <Drawer anchor="right" open={open} onClose={handleOnClose}>
            <List>
              {
                items.map((item, i) => (
                  <ListItem 
                    onClick={() => handleOnItemClick(item)}
                    button
                    key={i}
                    selected={item.path === location.pathname}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text}/>
              </ListItem>
                ))
              }
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}