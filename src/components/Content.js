import React from 'react';
import { Link } from 'react-router-dom';
import { getQuery, getCategories } from '../services/api';
import ProductCard from './ProductCard';

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      categories: [],
      searchInput: '',
      clicouEmPesquisar: false,
    };
  }

  async componentDidMount() {
    const response = await getCategories();
    this.setState({
      categories: response,
    });
  }

  handleInput = ({ target }) => {
    this.setState({
      searchInput: target.value,
    });
  }

  handleSearchButton = async () => {
    const { searchInput } = this.state;
    const results = await getQuery(searchInput);
    this.setState({ products: results, clicouEmPesquisar: true });
  }

  render() {
    const { products, categories, clicouEmPesquisar } = this.state;
    return (
      <section>
        {products.length === 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}
        <input
          placeholder="Pesquisar"
          onChange={ this.handleInput }
          data-testid="query-input"
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleSearchButton }
        >
          Pesquisar
        </button>
        { clicouEmPesquisar
        && products.length === 0 ? <p>Nenhum produto foi encontrado</p> : null}
        {products.length !== 0 && (products.map((element) => (
          <ProductCard key={ element.id } data={ element } />)))}
        <Link to="/cart" data-testid="shopping-cart-button">
          <img width="32px" src="https://cdn-icons-png.flaticon.com/512/34/34627.png" alt="button" />
        </Link>
        <div>
          {categories.map((categorie) => (
            <label
              data-testid="category"
              className="categorie-element"
              key={ categorie.id }
              htmlFor={ categorie.id }
            >
              {categorie.name}
              <input id={ categorie.id } type="radio" name="category-group" />
            </label>
          ))}
        </div>
      </section>
    );
  }
}

export default Content;
