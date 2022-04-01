import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { width } from "@mui/system";
import "./style.css";

function Index(props) {
  const { variants, setSelectedVariant } = props;
  const { image, price, productName, variant, qtyAvailable } =
    props.slicedProducts;

  const variantSelection = (e) => {
    setSelectedVariant(e.target.value);
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
            <img style={{ width: "100%" }} src={image} alt="" />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h4>{productName}</h4>
            <h5>Rp {price}</h5>

            <div className="d-flex flex-row align-items-center">
              <button
                //   onClick={() => {
                //     quantityBtnHandler("decrement");
                //   }}
                className="btn btn-primary "
              >
                -
              </button>
              <strong className="text-center mx-4">{qtyAvailable}</strong>
              <button
                //   onClick={() => {
                //     quantityBtnHandler("increment");
                //   }}
                className="btn btn-primary "
              >
                +
              </button>
            </div>
            <p>{variant}</p>
            <div className="d-flex flex-row">{imageButtonMapping()}</div>
            <button className="btn btn-success mt-3">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
