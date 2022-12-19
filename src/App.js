import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SearchProducts from './pages/SearchProducts';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ SearchProducts } />
        <Route path="/ProductDetails/:id" component={ ProductDetails } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
