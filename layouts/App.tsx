import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
const SignUp = loadable(() => import('@pages/SignUp'));

const App = () => {
  return; //switch는 여러가지중에 한개만 선택된다
  <Switch>
    <Route path="/signup" component={SignUp}></Route>
  </Switch>;
};

export default App;
