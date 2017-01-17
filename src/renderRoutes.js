import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';

import Layout from './components/Layout';

import Home from './components/Home';
import Search from './components/Search';

const history = syncHistoryWithStore(hashHistory, store);

const renderRoutes = () => (
  <Router history={history}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="search" component={Search} />
    </Route>
  </Router>
);


export default renderRoutes;
