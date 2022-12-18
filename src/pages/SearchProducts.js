import React from 'react';
import { Link } from 'react-router-dom';
import { getQuery, getCategories, getByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import logoProjeto from '../imgs/logo-traybe-projeto-11.png';
import Categories from '../components/Categories';
import CartIcon from '../components/CartIcon';

class SearchProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      categories: [],
      searchInput: '',
      hasSearch: false,
      cartProducts: [],
      showCategories: true,
    };
  }

  async componentDidMount() {
    const response = await getCategories();
    const cartProductsInLocalStorage = JSON.parse(localStorage.getItem('prods')) || [];
    this.setState({
      categories: response,
      cartProducts: [...cartProductsInLocalStorage],
    });
  }

  componentWillUnmount() {
    const { cartProducts } = this.state;
    localStorage.setItem('prods', JSON.stringify(cartProducts));
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

  addProduct = (id) => {
    const { products } = this.state;
    const productFind = products.find((item) => item.id === id);
    this.setState((prevState) => ({
      cartProducts: [...prevState.cartProducts, productFind],
    }));
  }

  showOrHideCategories = () => {
    this.setState((prevState) => ({
      showCategories: !prevState.showCategories,
    }));
  }

  render() {
    const { products, categories, hasSearch, showCategories, cartProducts } = this.state;
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
            <CartIcon cartItems={ cartProducts } />
          </Link>
        </div>
        <main className="main-content">
          <div className="categories-container">
            {
              showCategories === true && (
                <aside className="categories-aside">
                  <Categories
                    categories={ categories }
                    handleCategory={ this.handleCategory }
                  />
                </aside>
              )
            }
            <button
              type="button"
              onClick={ this.showOrHideCategories }
            >
              { showCategories === true ? '<' : '>'}
            </button>
          </div>
          <section className="products-section">
            {
              products.length === 0 && (
                <p data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>)
            }
            {
              hasSearch
            && products.length === 0 ? <p>Nenhum produto foi encontrado</p> : null
            }
            {
              products.length !== 0 && (products.map((element) => (
                <ProductCard
                  key={ element.id }
                  addProduct={ this.addProduct }
                  data={ element }
                />)))
            }
          </section>
        </main>
      </section>
    );
  }
}

export default SearchProducts;
