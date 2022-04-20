import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import "./style.css";
import axios from "../../../utils/axios";
import CartList from "./component/cartList";

function Carts() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [totalToPay, setTotalToPay] = useState(0);
  const userId = 1;

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

  // add quantity function
  const onAddQuantity = (e) => {
    // finding the cart using the cartId
    carts.map(async (value, index) => {
      if (value.productQuantity < value.qtyAvailable) {
        if (value.cartId == e) {
          // copy cart for manipulation
          var copiedCart = [...carts];
          // add the quantity
          const addedQuantity = value.productQuantity + 1;
          // update the quantity
          const res = await axios.put("/carts", {
            cartId: e,
            productQuantity: addedQuantity,
          });
          copiedCart[index].productQuantity = addedQuantity;
          // set the cart with the updated quantity
          setCarts(copiedCart);
        }
      }
    });
  };

  const onSubtractQuantity = (e) => {
    carts.map(async (value, index) => {
      if (value.productQuantity > 1) {
        if (value.cartId == e) {
          var copiedCart = [...carts];
          const addedQuantity = value.productQuantity - 1;
          const res = await axios.put("/carts", {
            cartId: e,
            productQuantity: addedQuantity,
          });
          copiedCart[index].productQuantity = addedQuantity;
          setCarts(copiedCart);
        }
      }
    });
  };

  const onCheckoutCart = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  useEffect(() => {
    fetchCarts();
  }, [carts]);

  return (
    <div className="shoppingCart">
      <div className="shoppingCart-container">
        <h1>Shopping Basket</h1>
        <TableContainer component={Paper} className="shoppingCart-table">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <h5>Product</h5>
                </TableCell>
                <TableCell align="center">
                  <h5>Unit Price</h5>
                </TableCell>
                <TableCell align="center">
                  <h5>Quantity</h5>
                </TableCell>
                <TableCell align="right">
                  <h5>Total</h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carts.length && (
                <CartList
                  carts={carts}
                  onAddQuantity={onAddQuantity}
                  onSubtractQuantity={onSubtractQuantity}
                />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="shoppingCart-checkout">
          <div className="shoppingCart-checkout-info-1">
            <div className="shoppingCart-delivery-info">
              <div>
                <p>
                  <LocalShippingOutlinedIcon className="icon" />
                  Home delivery available
                </p>
              </div>
            </div>
          </div>
          <div className="shoppingCart-checkout-info-2">
            <div className="shoppingCart-checkout-total">
              <p>Subtotal {carts.length}</p>
              <p>
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalToPay)}
              </p>
            </div>
            <div className="shoppingCart-checkout-button">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                }}
                onClick={onCheckoutCart}
              >
                Go to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carts;
