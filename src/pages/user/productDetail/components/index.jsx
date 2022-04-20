import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
import { Button } from "@mui/material";
import { width } from "@mui/system";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Index(props) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { variants, setSelectedVariant } = props;
  const {
    productId,
    image,
    price,
    productName,
    variant,
    qtyAvailable,
    variantId,
  } = props.slicedProducts;

  const variantSelection = (e) => {
    setSelectedVariant(e.target.value);
  };

  const onQuantityIncrement = (e) => {
    if (quantity < qtyAvailable) {
      setQuantity(quantity + 1);
    }
  };

  const onQuantityDecrement = (e) => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onAddToChart = async () => {
    try {
      const res = await axios.post("/carts", {
        userId: 1,
        variantId,
        productId,
        productQuantity: quantity,
      });
      navigate("/carts");
    } catch (error) {
      throw error;
    }
  };

  const imageButtonMapping = () => {
    return variants.map((value) => {
      const colorLowerCased = value.toLowerCase();

      return (
        <button
          className="roundButton"
          value={value}
          onClick={variantSelection}
          style={{ backgroundColor: colorLowerCased }}
        ></button>
      );
    });
  };

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row mt-3">
          <div className="col-6">
            <img className="image" src={image} alt="" />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h4>{productName}</h4>
            <h5>Rp {price}</h5>

            <div className="d-flex flex-row align-items-center">
              <button
                onClick={onQuantityDecrement}
                className="btn btn-primary "
              >
                -
              </button>
              <strong className="text-center mx-4">{quantity}</strong>
              <button
                onClick={onQuantityIncrement}
                className="btn btn-primary "
              >
                +
              </button>
            </div>
            <h6>quantity available : {qtyAvailable}</h6>
            <p>{variant}</p>
            <div className="d-flex flex-row">{imageButtonMapping()}</div>
            <button onClick={onAddToChart} className="btn btn-success mt-3">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
