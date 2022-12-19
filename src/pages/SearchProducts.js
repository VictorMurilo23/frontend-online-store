import React from 'react';
import { getQuery, getCategories, getByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';
import Header from '../components/Header';

class SearchProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      categories: [],
      searchInput: '',
      hasSearch: false,
      cartProducts: [],
      loading: false,
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

  componentDidUpdate() {
    const { cartProducts } = this.state;
    localStorage.setItem('prods', JSON.stringify(cartProducts));
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
    this.setState({ loading: true });
    const results = await getQuery(searchInput);
    this.setState({ products: results, hasSearch: true, loading: false });
  }

  handleSearchByCategory = async (categoryName) => {
    this.setState({ loading: true });
    const results = await getByCategory(categoryName);
    this.setState({ products: results, hasSearch: true, loading: false });
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
    const { products, categories, hasSearch,
      showCategories, cartProducts, loading } = this.state;
    return (
      <section>
        <Header
          cartProducts={ cartProducts }
          showSearchBar
          handleInput={ this.handleInput }
          handleSearchButton={ this.handleSearchButton }
        />
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
              loading && (
                <div className="loading-products">
                  <h1 className="loading">CARREGANDO...</h1>
                </div>
              )
            }
            {
              hasSearch === false && (
                <span data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </span>
              )
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
