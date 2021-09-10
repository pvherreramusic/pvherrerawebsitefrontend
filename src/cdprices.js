import React, { useState, useEffect } from "react";
import { Table} from "semantic-ui-react";

const CDLINK = "https://buy.stripe.com/00gbJ43ncdMj6886oo";

export default function Price(){
    let [price, setPrice] = useState([])

    useEffect(() => {
        fetch("https://u07r4zlgkk.execute-api.us-east-1.amazonaws.com/prod/prices")
        .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
        .then(response => setPrice(response))
      },[])


    return (
        <div className="Home">
        {price && price.map(prices => (
      
              <Table celled fixed singleLine>
         
      
                <Table.Body>
                  <Table.Row>
                  <Table.HeaderCell>Item Price</Table.HeaderCell>
                    <Table.Cell>{prices.cd}  <a href={CDLINK}>BUY XANAX AND MERCY CD</a></Table.Cell>

      
                  </Table.Row>
                </Table.Body>
              </Table>
        
        ))}</div>
      
      
      
      
        )}