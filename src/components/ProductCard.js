import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  render() {
    const { data: { title, thumbnail, price, id } } = this.props;
    return (
      <Link data-testid="product-detail-link" to={ `/ProductDetails/${id}` }>
        <div className="product-card-body" data-testid="product">
          <div className="product-card-title">
            <h4>{title}</h4>
          </div>
          <div className="product-card-info">
            <img src={ thumbnail } alt={ title } />
            <p className="product-card-price">{`R$ ${price}`}</p>
          </div>
        </div>
      </Link>
    );
  }
}

ProductCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
