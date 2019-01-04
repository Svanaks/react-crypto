import * as React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { withRouter } from 'react-router';
import { CryptoList, Alerts } from '../Layout/components/Crypto/components';


class Routes extends React.Component {
  render () {
    return (
      <Switch>
       <Route
        exact
        path="/"
        component={CryptoList}
       />
       <Route
         exact
         path="/cryptos"
         component={CryptoList}
       />
       <Route
         exact
         path="/alerts"
         component={Alerts}
       />
      </Switch>
    );
  }
}

export default withRouter(Routes);
