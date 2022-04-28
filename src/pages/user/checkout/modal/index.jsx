import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "../../../../utils/axios";

function CheckoutModal(props) {
  const userId = 1;
  const {
    onHide,
    totalToPay,
    carts,
    selectedProvince,
    selectedCity,
    selectedDistrict,
    selectedUrbanVillage,
    detailAddress,
    postalCode,
  } = props;

  const onClickContinue = async () => {
    const addressId = await postAddress();
    const transactionId = await postTransaction(addressId);
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

  const postAddress = async () => {
    const res = await axios.post("/address", {
      province: selectedProvince,
      city: selectedCity,
      district: selectedDistrict,
      urban_village: selectedUrbanVillage,
      postal_code: postalCode,
      detail_address: detailAddress,
    });
    return res.data.addressId;
  };

  const postTransaction = async (e) => {
    const res = await axios.post("/transactions/waiting-payment", {
      userId: userId,
      addressId: e,
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
