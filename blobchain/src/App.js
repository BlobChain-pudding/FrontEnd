import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from './containers/SignIn/SignIn';
import User from './containers/User/User';
import Search from './containers/User/Search/Search';
import SearchTokens from './containers/User/SearchTokens/SearchToken';
import Reviews from './containers/Restaurant/Reviews/Reviews';
import Restaurant from './containers/Restaurant/Restaurant';
import Requests from './containers/User/Requests/Requests';
import Reservations from './containers/User/Reservations/Reservations';
import CreateTokens from './containers/Restaurant/CreateTokens/CreateTokens';
import RestaurantRequests from './containers/Restaurant/Requests/RestaurantRequests';
import RestaurantReservations from './containers/Restaurant/Reservations/RestaurantReservations';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <div className="Container">
        <Switch>
          <Route exact path="/" component={SignIn}></Route>
          <Route exact path="/user" component={User}></Route>
          <Route exact path="/user/search" component={Search}></Route>
          <Route path="/user/search/:name/:addr" component={SearchTokens}></Route>
          <Route path="/user/requests/:name" component={Requests}></Route>
          <Route path="/user/reservations/:name" component={Reservations}></Route>
          <Route path="/restaurant/reviews/:name/:addr" component={Reviews}></Route>
          <Route path="/restaurant/requests/:name" component={RestaurantRequests}></Route>
          <Route path="/restaurant/reservations/:name" component={RestaurantReservations}></Route>
          <Route exact path="/restaurant" component={Restaurant}></Route>
          <Route exact path="/restaurant/createTokens" component={CreateTokens}></Route>
        </Switch>
      </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
