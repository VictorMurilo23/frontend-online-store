import React from 'react';
import { Link } from 'react-router-dom';

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  render() {
    const { products } = this.state;
    return (
      <section>
        {products.length === 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}
        <input placeholder="Pesquisar" />
        <Link to="/cart" data-testid="shopping-cart-button" />
      </section>
    );
  }
}

export default Content;
