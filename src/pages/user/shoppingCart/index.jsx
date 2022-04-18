import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import "./style.css";

function Carts() {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <div className="shoppingCart-container">
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
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <div className="product-row">
                    <div className="product-image-container">
                      <img
                        className="product-image"
                        src="https://www.ikea.com/sg/en/images/products/vedbo-armchair-gunnared-dark-grey__0512767_pe638683_s5.jpg?f=xxxs"
                        alt=""
                      />
                    </div>

                    <div className="product-description-container">
                      <h5>Poang</h5>
                      <p> Variant : blue</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="center" sx={{ width: "200px" }}>
                  {row.calories}
                </TableCell>
                <TableCell sx={{ width: "200px" }}>
                  <div className="quantity-row">
                    <Button variant="text" sx={{ color: "black" }}>
                      <h5>-</h5>
                    </Button>
                    <p className="button-quantity-amount">{row.fat}</p>
                    <Button variant="text" sx={{ color: "black" }}>
                      <h5>+</h5>
                    </Button>
                  </div>
                </TableCell>
                <TableCell align="right" sx={{ width: "200px" }}>
                  {row.carbs}
                </TableCell>
              </TableRow>
            ))}
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
            <p>Subtotal(1)</p>
            <p>$Rp.500,000</p>
          </div>
          <div className="shoppingCart-checkout-button">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "black",
              }}
            >
              Go to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carts;
