import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from 'react-router-dom' // for routes
import Home from "./containers/Home"; // Home page
import Signin from "./containers/Signin"; // Signin page
import Signup from "./containers/Signup"; // Signup page
import PrivateRoute from './components/HOC/PrivateRoute'; // for routes
import { useDispatch,  useSelector } from 'react-redux'; // for state
import { isUserLoggedIn, getInitialData } from './actions'; // get actions
import Products from './containers/Products'; // Products page
import Orders from './containers/Orders'; // Orders page
import Category from './containers/Category'; // Category page
import Page from './containers/NewPage'; // // Page page


function App() {

  const dispatch = useDispatch() // get dispatch method
  const auth = useSelector(state => state.auth) // get state

  // componentDidMount or componentDidUpdate
  useEffect(() => {
    if(!auth.authenticated){
      dispatch(isUserLoggedIn())
    }
    if(auth.authenticated){
      dispatch(getInitialData()); // get initial data (categories and products)
    }
  }, [auth.authenticated]); // whenver authenticated update, run again

  return (
    <div className="App">
        <Switch>
          <PrivateRoute path="/" exact component={ Home }/>
          <PrivateRoute path="/page" component={ Page }/>
          <PrivateRoute path="/category" component={ Category }/>
          <PrivateRoute path="/products" component={ Products }/>
          <PrivateRoute path="/orders" component={ Orders }/> 
          <Route path="/signin" component={ Signin }/>
          <Route path="/signup" component={ Signup }/>
        </Switch>
    </div>
  );
}

export default App;
