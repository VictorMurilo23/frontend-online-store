import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  render() {
    const { data: { title, thumbnail, price, id } } = this.props;
    const { addProduct } = this.props;
    return (
      <div className="product-card-body" data-testid="product">
        <Link data-testid="product-detail-link" to={ `/ProductDetails/${id}` }>
          <div className="product-card-title">
            <h4>{title}</h4>
          </div>
          <div className="product-card-info">
            <img src={ thumbnail } alt={ title } className="product-card-image" />
            <p className="product-card-price">{`R$ ${price}`}</p>
          </div>
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          className="add-to-cart-button"
          onClick={ () => addProduct(id) }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  addProduct: PropTypes.func.isRequired,
};

export default ProductCard;
