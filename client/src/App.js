import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';

import Alert from './components/layout/Alert'
import Navbar from './components/layout/Navbar'
import Weather from './components/weather/Weather'
// import Profile from './components/profile/Profile'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route render={({ location }) => (
          <>
            <Navbar location={location} />

            <div className="container">
              <Alert />
              <Switch>
                <Route path='/' exact component={Weather} />
              </Switch>
            </div>
          </>
        )} />
      </Router>
    </Provider>
  );
}

export default App;
