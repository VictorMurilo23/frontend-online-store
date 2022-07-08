import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { data: { title, thumbnail, price } } = this.props;
    return (
      <div data-testid="product">
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <img src={ thumbnail } alt={ title } />
          <p>{price}</p>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
