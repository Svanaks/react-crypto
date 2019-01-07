import * as React from 'react';
import Request from 'axios-request-handler';
import {
	withStyles,
	Card,
	CardContent,
	Typography
} from '@material-ui/core';

const styles = theme => ({
	root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
    	paddingLeft: '240px',
    }
	},
  card: {
    display: 'flex',
    width: '250px',
    margin: '5px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  content: {
    flex: '1 0 auto',
  }
});

export class CryptoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rates: []
    };
  }

  compare(a, b) {
    if (a.asset_id_quote > b.asset_id_quote) {
      return 1;
    } else if (a.asset_id_quote < b.asset_id_quote) {
      return -1;
    }
    return 0;
  }

  componentDidMount() {
    const cryptos = new Request('https://rest.coinapi.io/v1/exchangerate/USDT', {
      headers: {'X-CoinAPI-Key': '7B51E3F6-F924-4931-8A84-3FA0D90E578A'}
    });

    // cryptos.get().then(res => (console.log(res.data)));
    cryptos.poll(240000).get((response) => {
      console.log(response.data);
      const rates = response.data.rates.sort(this.compare);
      this.setState({rates})
    });
  }

  render() {
  	const { classes } = this.props;
  	const { rates } = this.state;
    return (
      <div className={classes.root}>
        {rates.map((crypto, i) => {
          return(
            <Card key={i} className={classes.card}>
				      <div className={classes.details}>
				        <CardContent className={classes.content}>
				          <Typography component="h5" variant="h5">
				            {crypto.asset_id_quote}
				          </Typography>
				          <Typography variant="subtitle1" color="textSecondary">
				            {crypto.rate}
				          </Typography>
				        </CardContent>
				      </div>
				    </Card>
          )}
        )}
      </div>
    );
  }
}

export default withStyles(styles)(CryptoList);