import React from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";

function Index(props) {
  const { productName, productId, image } = props.products;
  const { onClickModalEditProducts } = props;

  return (
    <tr>
      <td>{productId}</td>
      <td>{productName}</td>
      <td>
        <img className="product-image " src={image} />
      </td>
      <td className="table-data">
        <button
          className="button"
          value={productId}
          onClick={onClickModalEditProducts}
        >
          Edit
        </button>
        <button className="button">🗑️</button>
      </td>
    </tr>
  );
}

export default Index;
