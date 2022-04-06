import React from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Index(props) {
  const { productName, productId, image } = props.products;
  const { selectProductToEdit } = props;

  return (
    <tr>
      <td>{productId}</td>
      <td>{productName}</td>
      <td>
        <img className="admin-product-image" src={image} />
      </td>
      <td className="table-data">
        <Button
          className="admin-product-button"
          value={productId}
          variant="outline-dark"
          onClick={selectProductToEdit}
        >
          Edit
        </Button>{" "}
        <Button className="admin-product-button" variant="outline-dark">
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default Index;
