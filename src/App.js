import React, { useEffect } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import People from './containers/People';
import Details from './components/PeopleInfo/Details';
import Auth from './containers/Auth/Auth';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import Logout from './containers/Auth/Logout/Logout';


const App = props => {

  const { onTryAutoSignup } = props;
  useEffect(()=>{
    
    onTryAutoSignup()
  },[onTryAutoSignup])



  return (
    <div>

      <Switch>
      
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/details/:id"  exact component={Details} />
        <Route path="/"  component={People} />
 
         <Redirect to='/' /> 
      </Switch>

    </div>)


};


const mapDisptchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps, mapDisptchToProps)(App));
