import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from './containers/SignIn/SignIn';
import Client from './containers/Client/Client';
import Search from './containers/Client/Search/Search';
import SearchTokens from './containers/Client/SearchTokens/SearchToken';
import Reviews from './containers/Restaurant/Reviews/Reviews';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <div className="Container">
        <Switch>
          <Route exact path="/" component={SignIn}></Route>
          <Route exact path="/client" component={Client}></Route>
          <Route exact path="/client/search" component={Search}></Route>
          <Route path="/client/search/:name/:addr" component={SearchTokens}></Route>
          <Route path="/restaurant/reviews/:name/:addr" component={Reviews}></Route>
          
        </Switch>
      </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
