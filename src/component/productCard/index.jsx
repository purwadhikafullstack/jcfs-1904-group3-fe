import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./style.css";
function Index(props) {
  const { productName, productId, price, image } = props.product;
  const { REACT_APP_CLIENT_URL } = process.env;

  const link = `${REACT_APP_CLIENT_URL}/product-detail/${productId}`;
  // useEffect(() => {
  //   console.log(productName, productId, price, image);
  // }, []);
  return (
    <div
      style={{ width: 400, height: 300, border: 0, margin: 50 }}
      className="card"
    >
      <Card style={{ width: "100%" }}>
        <div style={{ width: 400, height: 300, border: 0 }}>
          <Card.Img variant="top" src={image} className="image" />
        </div>
        <Card.Body
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Card.Text>{productName}</Card.Text>
          <Card.Text>Rp.{price}</Card.Text>
        </Card.Body>
        <Button href={link} variant="outline-dark">
          Add to cart
        </Button>
      </Card>
    </div>
  );
}

export default Index;
