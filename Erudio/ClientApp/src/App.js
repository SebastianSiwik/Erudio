import React, { Component } from 'react';
import { Home } from './components/Home';
import { Feed } from './components/Feed';
import { Post } from './components/Post';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/feed' component={Feed} />
        <Route path='/post' component={Post} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
