import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Content from './components/Content';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Content } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
