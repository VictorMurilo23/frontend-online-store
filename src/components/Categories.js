import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Categories extends Component {
  render() {
    const { handleCategory, categories } = this.props;
    return (
      <>
        {categories.map((category) => (
          <label
            data-testid="category"
            className="category-element"
            key={ category.id }
            htmlFor={ category.id }
            onChange={ handleCategory }
          >
            <span className="category-name">{category.name}</span>
            <input id={ category.id } type="radio" name="category-group" />
          </label>
        ))}
      </>
    );
  }
}

Categories.propTypes = {
  handleCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ).isRequired,
};
