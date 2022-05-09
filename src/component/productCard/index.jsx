import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";
function Index(props) {
  const navigate = useNavigate();
  const { productName, productId, price, image } = props.product;

  return (
    <div
      style={{ width: "25%", height: 300, border: 0, margin: 50 }}
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
        <Button
          onClick={() => {
            navigate(`/product-detail/${productId}`);
          }}
          variant="outline-dark"
        >
          Product Detail
        </Button>
      </Card>
    </div>
  );
}

export default Index;
