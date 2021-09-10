import React, { Component } from 'react';
import ProductItem from './ProductItem';

class ProductsList extends Component {

  render() {
      const { products } = this.props;

      return (
          <>
              <div className="products" id="products">
                  {products.map((product) => (
                      <ProductItem
                          key={product.id}
                          product={product}
                          {...this.props}
                      />
                  ))}
              </div>
          </>
      )
  }
}


export default ProductsList;