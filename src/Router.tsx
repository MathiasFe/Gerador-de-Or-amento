import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Home from './Pages/Home';
import GerarOrcamento from './Pages/GerarOrcamento';

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/GerarOrcamento" component={GerarOrcamento}/>
    </Switch>
  );
}

export default Router;