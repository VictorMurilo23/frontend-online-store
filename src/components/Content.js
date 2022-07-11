import React from 'react';
import { Link } from 'react-router-dom';
import { getQuery, getCategories, getByCategory } from '../services/api';
import ProductCard from './ProductCard';
import logoProjeto from '../imgs/logo-traybe-projeto-11.png';

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      categories: [],
      searchInput: '',
      hasSearch: false,
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
    this.setState({ products: results, hasSearch: true });
  }

  handleSearchByCategory = async (categoryName) => {
    const results = await getByCategory(categoryName);
    this.setState({ products: results, hasSearch: true });
  }

  handleCategory = ({ target }) => {
    this.handleSearchByCategory(target.id);
  }

  render() {
    const { products, categories, hasSearch } = this.state;
    return (
      <section>
        <div className="nav-div">
          <div>
            <img className="logo" src={ logoProjeto } alt="logo" />
          </div>
          <div className="search-div">
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
              P
            </button>
          </div>
          <Link to="/cart" data-testid="shopping-cart-button">
            <img width="32px" src="https://cdn-icons-png.flaticon.com/512/34/34627.png" alt="button" />
          </Link>
        </div>
        <main className="main-content">
          <aside className="categories-aside">
            {categories.map((categorie) => (
              <label
                data-testid="category"
                className="categorie-element"
                key={ categorie.id }
                htmlFor={ categorie.id }
                onChange={ this.handleCategory }
              >
                {categorie.name}
                <input id={ categorie.id } type="radio" name="category-group" />
              </label>
            ))}
          </aside>
          <section className="products-section">
            {products.length === 0 && (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>)}
            { hasSearch
            && products.length === 0 ? <p>Nenhum produto foi encontrado</p> : null}
            {products.length !== 0 && (products.map((element) => (
              <ProductCard key={ element.id } data={ element } />)))}
          </section>
        </main>
      </section>
    );
  }
}

export default Content;
