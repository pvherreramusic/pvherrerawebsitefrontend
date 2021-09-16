import React, { Component } from "react";
import { Button, Image, Table } from "semantic-ui-react";


class ProductItem extends Component {
  constructor(props) {
    super(props);

    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart() {
    this.props.onAddToCart(this.props.product.id, 1);
  }


  render() {
    const { product } = this.props;
    // const { result } = (product.description);

    return (
      <div className="Home">
        <h1>Products</h1>
        <Table celled fixed singleLine>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                Item name:
                <Table.Cell>{product.name}</Table.Cell>
              </Table.Cell>
              <Table.Cell>
                Image:
                <Table.Cell>
                  <Image src={product.media.source} size="small" alt="" />
                </Table.Cell>
                <Table.Cell>
                  Price: {product.price.formatted_with_symbol}
                </Table.Cell>
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={this.handleAddToCart}
                >
                  Add to Cart
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        ))
      </div>
    );
  }
}
export default ProductItem;
