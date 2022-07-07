import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      categories: [],
    };
  }

  async componentDidMount() {
    const response = await getCategories();
    this.setState({
      categories: response,
    });
  }

  render() {
    const { products, categories } = this.state;
    return (
      <section>
        {products.length === 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>)}
        <input placeholder="Pesquisar" />
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
