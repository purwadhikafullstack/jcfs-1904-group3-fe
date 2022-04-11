import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./style.css";
function Index(props) {
  const { productName, productId, price, image } = props.product;

  const link = `http://localhost:3000/product-detail/${productId}`;
  // useEffect(() => {
  //   console.log(productName, productId, price, image);
  // }, []);
  return (
    <div
      style={{ width: "25%", height: 300, border: 0, margin: 50 }}
      className="card"
    >
      <Card>
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
          Dark
        </Button>
      </Card>
    </div>
  );
}

export default Index;
