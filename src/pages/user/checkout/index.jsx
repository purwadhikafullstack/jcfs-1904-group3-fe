import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Badge } from "react-bootstrap";
import { Button, Checkbox } from "@mui/material";
import "./style.css";

function Checkout() {
  const [carts, setCarts] = useState([]);
  const [totalToPay, setTotalToPay] = useState(0);
  const fetchCarts = async () => {
    try {
      const res = await axios.get("/carts", {
        params: {
          userId: 1,
        },
      });
      const { result } = res.data;
      if (result) {
        const res = await axios.get("/products/cart", {
          params: {
            result,
          },
        });
        const { carts } = res.data;
        countTotalToPay(carts);
        setCarts(carts);
      }
    } catch (error) {
      throw error;
    }
  };
  const countTotalToPay = (e) => {
    var allCartsAmount = 0;
    e.map((value) => {
      allCartsAmount += value.total;
    });
    setTotalToPay(allCartsAmount);
  };
  const mapCarts = () => {
    return carts.map((value, index) => {
      return (
        <div className="order-summary-item">
          <img className="item-image" src={value.image} />
          <div className="item-desc">
            <p>Product Name : {value.productName}</p>
            <p>Variant : {value.variant}</p>
            <p>qty : {value.productQuantity}</p>
          </div>
          <div className="item-total">
            <p>
              {Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(value.total)}
            </p>
          </div>
        </div>
      );
    });
  };
  useEffect(() => {
    fetchCarts();
  }, []);
  useEffect(() => {
    console.log(carts);
    console.log(mapCarts());
  }, [carts]);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>The Warehouse</h1>
      </div>
      <div className="checkout-form-container">
        <div className="checkout-form">
          <h4>Checkout</h4>
          <h6 className="checkout-form-address-header">Alamat pengiriman</h6>
          <div className="checkout-form-address-body">
            <h6>
              Fahem
              <Badge bg="dark" style={{ color: "white" }}>
                Utama
              </Badge>
            </h6>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              reiciendis ullam! Quidem placeat temporibus porro adipisci rem
              voluptatibus, labore libero itaque excepturi esse provident neque,
              iste ut aliquam.
            </p>
          </div>
          <div className="checkout-form-address-button">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
                marginRight: "5px",
              }}
            >
              Select other address
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
              }}
            >
              Add new address
            </Button>
          </div>
          <h6 className="delivery-option">Delivery Option</h6>

          <div className="checkout-form-delivery">
            <div className="checkout-form-delivery-option">
              <Checkbox
                defaultChecked
                disabled
                inputProps={{ "aria-label": "controlled" }}
              />
              <div>
                <h6>Free Delivery</h6>
                <p>Monday to Saturday, 7am - 7pm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-summary-container">
          <div className="order-summary-form">
            <h6>Order Summary</h6>
            {carts.length && mapCarts()}
            <div className="item-subtotal">
              <h6>Subtotal</h6>
              <h6>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalToPay)}
              </h6>
            </div>
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              width: "100%",
            }}
          >
            Finish Transaction
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
