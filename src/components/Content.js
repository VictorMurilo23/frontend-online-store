import React from 'react';

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
      </section>
    );
  }
}

export default Content;
