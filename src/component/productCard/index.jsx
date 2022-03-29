import React from "react";
import { Card, Button } from "react-bootstrap";
import "./style.css";
function Index() {
  return (
    <Card style={{ width: 400, height: 300, border: 0 }}>
      <div style={{ width: 400, height: 300, border: 0 }}>
        <Card.Img
          variant="top"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnajNWhJQ6fD4jNMVub7y0Wfep4ZwYzeIQYA&usqp=CAU"
          className="image"
        />
      </div>
      <Card.Body
        style={{
          padding: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Card.Text>Product Name</Card.Text>
        <Card.Text>$Rp.50000</Card.Text>
      </Card.Body>
      <Button variant="outline-dark">Dark</Button>
    </Card>
  );
}

export default Index;
