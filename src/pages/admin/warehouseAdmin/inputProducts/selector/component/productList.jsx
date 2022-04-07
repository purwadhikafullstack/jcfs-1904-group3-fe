import React from "react";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import "./style.css";

function Index(props) {
  const { productName, productId, image } = props.products;
  const { selectProductToEdit } = props;

  return (
    <tr>
      <td>{productId}</td>
      <td>{productName}</td>
      <td>
        <img className="product-image " src={image} />
      </td>
      <td className="table-data">
        <IconButton
          aria-label="delete"
          value={productId}
          onClick={selectProductToEdit}
        >
          <CreateIcon />
        </IconButton>

        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </td>
    </tr>
  );
}

export default Index;
