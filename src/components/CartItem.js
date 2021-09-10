import React, { Component } from 'react';
import { Button, Table } from "semantic-ui-react";


class CartItem extends Component {
    constructor(props) {
        super(props);

        this.handleUpdateCartQty = this.handleUpdateCartQty.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    }

    handleUpdateCartQty(lineItemId, quantity) {
        this.props.onUpdateCartQty(lineItemId, quantity);
    }

    handleRemoveFromCart(lineItemId) {
        this.props.onRemoveFromCart(lineItemId);
    }

    render() {
        const { item } = this.props;

        return (
  

<div>
 <Table celled fixed singleLine>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                Item name:
                <Table.Cell>{item.name}</Table.Cell>
              </Table.Cell>
              <Button type="button" onClick={() => this.handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
            <Table>{item.quantity}</Table>
              <Button onClick={() => item.quantity > 1 ? this.handleUpdateCartQty(item.id, item.quantity - 1) : this.handleRemoveFromCart(item.id)}>-</Button>
              <Table.Cell>
                <Table.Cell>
                  Price:  {item.line_total.formatted_with_symbol}
                </Table.Cell>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        ))
      </div>
        );
    };
};

export default CartItem;
