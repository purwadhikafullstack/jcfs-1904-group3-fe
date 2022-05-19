import React, { useEffect, useState } from "react";
import { TableCell, Button, TableRow } from "@mui/material";

import FormatIdr from "../../../../../../../component/formatCurrency";

import PreviewEvidenceModal from "../modal/PreviewEvidence";
import {
  AcceptWaitingPaymentModal,
  RejectWaitingPaymentModal,
} from "../modal/Confirmation";

function TransactionList(transactions, fetchTransactionHistory) {
  const [selectedTransactionId, setSelectedTransactionId] = useState("");
  const [selectedPaymentEvidence, setSelectedPaymentEvidence] = useState("");

  const [showPreviewPaymentEvidence, setShowPreviewPaymentEvidence] =
    useState(false);
  const [showAcceptWaitingPaymentModal, setShowAcceptWaitingPaymentModal] =
    useState(false);
  const [showRejectWaitingPaymentModal, setShowRejectWaitingPaymentModal] =
    useState(false);

  const mapTransactions = () => {
    return transactions.map((value) => {
      const {
        province,
        city,
        district,
        urban_village,
        postal_code,
        detail_address,
      } = value;
      const formatTime = () => {
        var splitTime = value.created_at.split("T");
        var day = splitTime[0];
        var dotPosition = splitTime[1].indexOf(".");
        var hour = splitTime[1].substring(0, dotPosition);
        var result = day + " " + hour;
        return result;
      };
      return (
        <TableRow
          key={value.productId}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell align="left">{formatTime()}</TableCell>

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
                color="primary"
                onClick={() => {
                  setShowPreviewPaymentEvidence(true);
                  setSelectedPaymentEvidence(value.paymentEvidence);
                }}
              >
                Preview
              </Button>
            </p>
            <PreviewEvidenceModal
              show={showPreviewPaymentEvidence}
              onHide={() => {
                setShowPreviewPaymentEvidence(false);
              }}
              previewImage={selectedPaymentEvidence}
            />
          </TableCell>
          <TableCell align="center" sx={{ width: "200px" }}>
            <p>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setShowAcceptWaitingPaymentModal(true);
                  setSelectedTransactionId(value.transactionId);
                }}
              >
                accept
              </Button>
            </p>
            <AcceptWaitingPaymentModal
              show={showAcceptWaitingPaymentModal}
              onHide={() => {
                setShowAcceptWaitingPaymentModal(false);
              }}
              transactionId={selectedTransactionId}
              fetchTransactionHistory={fetchTransactionHistory}
            />
            <p>
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  setShowRejectWaitingPaymentModal(true);
                  setSelectedTransactionId(value.transactionId);
                }}
              >
                reject
              </Button>
            </p>
            <RejectWaitingPaymentModal
              show={showRejectWaitingPaymentModal}
              onHide={() => {
                setShowRejectWaitingPaymentModal(false);
              }}
              transactionId={selectedTransactionId}
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
