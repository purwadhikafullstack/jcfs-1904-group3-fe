import React, { useEffect, useState } from "react";
import { TableCell, Button, TableRow } from "@mui/material";

import FormatIdr from "../../../../../../../component/formatCurrency";

import ConfirmFinishPackagingModal from "../modal/Confirmation";

function TransactionList(transactions, fetchTransactionHistory) {
  const [showConfirmFinishPackagingModal, setShowConfirmFinishPackagingModal] =
    useState(false);

  const mapTransactions = () => {
    if (transactions.length == 0) {
      return null;
    }
    return transactions.map((value) => {
      const {
        province,
        city,
        district,
        urban_village,
        postal_code,
        detail_address,
      } = value;
      return (
        <TableRow
          key={value.productId}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="left">{value.userId}</TableCell>
          <TableCell align="center">{value.transactionId}</TableCell>
          <TableCell align="center">{value.username}</TableCell>
          <TableCell align="center">{value.email}</TableCell>
          <TableCell align="center">
            <div style={{ display: "flex", flexDirection: "column" }}>
              {value.detailTransactions.map((value) => {
                return (
                  <div style={{ display: "flex", padding: "5px" }}>
                    <img
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "1px solid #dfdfdf",
                      }}
                      src={value.productImage}
                    />
                    <div>
                      <p style={{ margin: "0px", textAlign: "start" }}>
                        <strong>{value.productName}</strong>
                      </p>
                      <p>
                        {value.quantity} item x {FormatIdr(value.productPrice)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TableCell>
          <TableCell align="center">{FormatIdr(value.totalAmount)}</TableCell>

          <TableCell align="center" sx={{ width: "200px" }}>
            <p>
              {province},{city},{district},{urban_village},{postal_code},
              {detail_address}
            </p>
          </TableCell>

          <TableCell align="center" sx={{ width: "200px" }}>
            <p>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setShowConfirmFinishPackagingModal(true);
                }}
              >
                finish
              </Button>
            </p>
            <ConfirmFinishPackagingModal
              show={showConfirmFinishPackagingModal}
              onHide={() => {
                setShowConfirmFinishPackagingModal(false);
              }}
              transactionId={value.transactionId}
              fetchTransactionHistory={fetchTransactionHistory}
            />
          </TableCell>
        </TableRow>
      );
    });
  };
  return mapTransactions();
}

export default TransactionList;
