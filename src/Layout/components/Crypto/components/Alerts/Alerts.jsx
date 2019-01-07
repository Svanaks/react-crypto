import * as React from 'react';
import Fab from '@material-ui/core/Fab';

// REFACTO THIS SHIT
import AddIcon from '@material-ui/icons/Add';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Delete from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
	withStyles,
	Card,
	CardContent,
	Typography
} from '@material-ui/core';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    alignSelf: 'flex-end'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    [theme.breakpoints.up('md')]: {
    	paddingLeft: '250px',
    }
	},
	alignLeft: {
		textAlign: 'left'
	},
	card: {
    display: 'flex',
    width: '100%',
    margin: '5px'
  },
  cardContainer: {
  	display: 'flex',
  	flexDirection: 'row',
  	flexWrap: 'wrap'
  },
  flex: {
  	display: 'flex'
  },
  formControl: {
    minWidth: 120,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  details: {
  	display: 'flex',
  	justifyContent: 'space-between',
  	flexGrow: 1
  }
});

export class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	    open: false,
	    limit: '',
	    treshold: '',
	    cryptoTag: '',
	    alerts: []
	  };

    this.handleChange = this.handleChange.bind(this);
    this.createAlert = this.createAlert.bind(this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDeleteAlert = i => {
  	const alerts = this.state.alerts.filter((_,idx) => idx !== i);
  	this.setState({alerts});

  	// Delete from localStorage
  }

  createAlert = event => {
  	event.preventDefault();
  	const alert = {
  		cryptoTag: this.state.cryptoTag,
  		treshold: this.state.treshold,
  		limit: this.state.limit
  	}
  	console.log(alert);
  	const alerts = this.state.alerts.concat([alert]);

  	// Split code here (storeNewAlert)
  	localStorage.setItem('alerts', JSON.stringify(alerts));

  	this.setState({
  		open: false,
	    limit: '',
	    treshold: '',
	    cryptoTag: '',
	    alerts
  	})
  };

	componentDidMount() {
    const alerts = JSON.parse(localStorage.getItem('alerts'));
   	alerts && this.setState({alerts});
  }

  render() {
  	const { classes } = this.props;
  	const { alerts, cryptoTag, limit, treshold } = this.state;

    return (
      <div className={classes.root}>
      	<Typography variant="subtitle1" color="textSecondary" className={classes.alignLeft}>
          Alerts
        </Typography>
        <div className={classes.cardContainer}>
	        {alerts.map((alert, i) => {
	          return(
	            <Card key={i} className={classes.card}>
					      <div className={classes.details}>
					        <CardContent className={classes.content}>
					          <Typography component="h5" variant="h5">
					            {alert.cryptoTag}
					          </Typography>
					          <Typography variant="subtitle1" color="textSecondary" className={classes.flex}>
					            {alert.limit === 'up' ? <ArrowDropUp /> : <ArrowDropDown />}
					            {alert.treshold}
					          </Typography>
					        </CardContent>

					        <div className={classes.controls}>
					          <IconButton aria-label="Delete">
					            <Delete onClick={this.handleDeleteAlert.bind(this, i)}/>
					          </IconButton>
					        </div>
					      </div>
					    </Card>
	          )}
        	)} 
        </div>

        <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.handleClickOpen}>
	        <AddIcon />
	      </Fab>
	      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Alerts</DialogTitle>
          <form onSubmit={this.createAlert}>
	          <DialogContent>
	            <DialogContentText>
	              To add a new alert, please fill the following information.
	            </DialogContentText>
	            <TextField
	              autoFocus
	              margin="dense"
	              id="name"
	              value={cryptoTag}
	              onChange={this.handleChange}
	              label="Crypto tag (ex: BTC)"
	              type="text"
	              fullWidth
	              name="cryptoTag"
	            />
	            <TextField
	              value={treshold}
	              margin="dense"
	              id="name"
	              label="Alert treshold"
	              onChange={this.handleChange}
	              type="number"
	              fullWidth
	              name="treshold"
	            />
	            <FormControl className={classes.formControl} fullWidth>
		            <InputLabel htmlFor="limit-simple">Limit</InputLabel>
		           	<Select
			            value={limit}
			            onChange={this.handleChange}
			            label="Limit"
			            inputProps={{
			              name: 'limit',
			              id: 'limit-simple',
			            }}
			            fullWidth
			          >
			            <MenuItem value={'up'}>Up</MenuItem>
			            <MenuItem value={'down'}>Down</MenuItem>
		          	</Select>
		          </FormControl>
	          </DialogContent>
	          <DialogActions>
	            <Button onClick={this.handleClose} color="primary">
	              Cancel
	            </Button>
	            <Button type="submit" color="primary">
	              Create alert
	            </Button>
	          </DialogActions>
          </form> 
        </Dialog>
      </div>
    );
  }
}

Alerts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Alerts);