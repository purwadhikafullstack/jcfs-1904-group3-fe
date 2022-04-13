import React from "react";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "./style.css";

function Index(props) {
  const { productName, productId, image } = props.products;
  const { onClickModalEditProducts, setSelectedProduct } = props;

  return (
    <tr>
      <td>{productId}</td>
      <td>{productName}</td>
      <td>
        <img className="product-image " src={image} />
      </td>
      <td className="table-data">
        <IconButton
          className="button"
          onClick={(e) => {
            onClickModalEditProducts(e);
            setSelectedProduct(productId);
          }}
        >
          <ModeEditIcon />
        </IconButton>

        <button className="button">🗑️</button>
      </td>
    </tr>
  );
}

export default Index;
