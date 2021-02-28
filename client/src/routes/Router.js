import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppNavBar from '../components/AppNavBar';
import PostCardList from './normalRoute/PostCardList';
import PostWrite from './normalRoute/PostWrite';
import PostDetail from './normalRoute/PostDetail';
import CategoryResult from './normalRoute/CategoryResult';
import Search from './normalRoute/Search';

const MyRoute = () => (
  <Fragment>
    <AppNavBar />
    <Header />
    <Container id="main-body">
      <Switch>
        <Route path="/" component={PostCardList} exact />
        <Route path="/posts" component={PostWrite} exact />
        <Route path="/posts/:id" component={PostDetail} exact />
        <Route
          path="/posts/category/:categoryName"
          component={CategoryResult}
          exact
        />
        <Route path="/search/:searchTerm" component={Search} exact />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </Fragment>
);

export default MyRoute;
