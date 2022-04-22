import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "../../../../utils/axios";

function CheckoutModal(props) {
  const userId = 1;
  const { onHide, totalToPay, carts } = props;

  const onClickContinue = async () => {
    const transactionId = await postTransaction();
    postDetailTransaction(transactionId);
    deleteCarts();
  };

  const deleteCarts = async () => {
    const idCarts = carts.map((value) => value.cartId);
    console.log(idCarts);
    const res = await axios.delete("/carts/checkout", {
      headers: {},
      data: {
        idCarts,
      },
    });
  };

  const postTransaction = async () => {
    const res = await axios.post("/transactions/waiting-payment", {
      userId: userId,
      totalAmount: totalToPay,
    });
    return res.data.transactionId;
  };

  const postDetailTransaction = async (e) => {
    const res = await axios.post("/transactions/detail", {
      carts,
      transactionId: e,
    });
  };

  return (
    <Modal {...props} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title style={{ textAlign: "center" }}>
          Continue To Payment
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onClickContinue}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckoutModal;
