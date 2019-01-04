import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  withStyles,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import { AddAlert, RemoveRedEye } from '@material-ui/icons';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#ececec',
    color: '#282c34'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

function ClippedDrawer(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            React-crypto
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List component="nav">
          <NavLink
            exact
            to="/cryptos"
            activeClassName={classes.selectedLink}
          >
            <ListItem button>
              <ListItemIcon>
                <RemoveRedEye />
              </ListItemIcon>
              <ListItemText primary="Cryptos" />
            </ListItem>
          </NavLink>
          <NavLink
            exact
            to="/alerts"
            activeClassName={classes.selectedLink}
          >
            <ListItem button>
              <ListItemIcon>
                <AddAlert />
              </ListItemIcon>
              <ListItemText primary="Alerts" />
            </ListItem>
          </NavLink>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

ClippedDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClippedDrawer);