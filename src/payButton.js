import React, { useState, useEffect } from "react";
import { Grid, Header, Image, Table, Tab } from "semantic-ui-react";
import Price from "./cdprices";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe("pk_test_51J0bISHXr4uW79mBqpt5Nya8dlhTcoVAPcMRaLmkhEnkuKLLlOG1FJPLqs024DGyUjG6WXLUUPJOqZ2LtYsw5ZjT00IWS1MEG0");

export default function PayButton() {
  let [products, setProducts] = useState();

  // 3. Create out useEffect function
  useEffect(() => {
    fetch("https://jvsh58oxcl.execute-api.us-east-1.amazonaws.com/dev/products")
      .then((response) => response.json())
      // 4. Setting *dogImage* to the image url that we received from the response above
      .then((data) => setProducts(data.data));
  }, []);

    const panes = [
      {
        menuItem: {
          as: NavLink,
          id: "BUYCD2",
          content: "BUY XANAX AND MERCY",
          to: "/",
          exact: true,
          key: "buy"
        },
        pane: (
          <Route
            path="/"
            exact
            render={() => (
              <Tab.Pane>
              <Price></Price>
              </Tab.Pane>
            )}
          />
        )
      },
      
    ];

  return (
    <div className="Home">
      <h1>Products</h1>
      {products &&
        products.map((data) => (
          <Table celled fixed singleLine>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  Item name:
                  <Table.Cell>{data.name}</Table.Cell>
                </Table.Cell>
                <Table.Cell>
                  Image:
                  <Table.Cell>
                    <Image src={data.images} size="small" alt="" />
                  </Table.Cell>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
            </Table>

            ))}
 <Router>
        <div className="App" style={{ margin: "50px" }}>
          <Switch>
            <Tab renderActiveOnly={false} activeIndex={-1}  menu={{ fluid: true, vertical: true }} style={{
      backgroundColor: "tranparent",}}
    menuPosition="left" panes={panes} />
          </Switch>
        </div>
      </Router>
    );
  

    </div>

  );
}
