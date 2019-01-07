import React from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
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
  ListItemText,
  Hidden,
  IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
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
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  noDecoration: {
    textDecoration: 'none',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

export class ClippedDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerMobileOpen: false
    };
  }

  toggleDrawerMobile = (event) => {
    this.setState({
      isDrawerMobileOpen: !this.state.isDrawerMobileOpen
    });
  }

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              aria-label='Open drawer'
              onClick={this.toggleDrawerMobile}
              name="DrawerMobile"
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              React-crypto
            </Typography>
          </Toolbar>
        </AppBar>

        <Hidden mdUp>
          <Drawer
            variant="temporary"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={this.state.isDrawerMobileOpen}
            onClose={this.toggleDrawerMobile}
          >
          <List component="nav">
            <NavLink
              exact
              to="/cryptos"
              className={classes.noDecoration}
            >
              <ListItem button>
                <ListItemIcon>
                  <RemoveRedEye />
                </ListItemIcon>
                <ListItemText primary="Cryptos" className={classes.noDecoration}/>
              </ListItem>
            </NavLink>
            <NavLink
              exact
              to="/alerts"
              className={classes.noDecoration}
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
        </Hidden>

        <Hidden
          smDown
          implementation="css"
        >
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
          <div className={classes.toolbar} />
          <List component="nav">
            <NavLink
              exact
              to="/cryptos"
              className={classes.noDecoration}
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
              className={classes.noDecoration}
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
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
}

// ClippedDrawer.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ClippedDrawer);