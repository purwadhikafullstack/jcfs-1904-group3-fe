import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "../../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CheckoutModal(props) {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
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
    navigate("/transaction/status");
  };

  const deleteCarts = async () => {
    const idCarts = carts.map((value) => value.cartId);
    const res = await axios.delete("/carts/checkout", {
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        idCarts,
      },
    });
  };

  const postAddress = async () => {
    const res = await axios.post(
      "/address",
      {
        province: selectedProvince,
        city: selectedCity,
        district: selectedDistrict,
        urban_village: selectedUrbanVillage,
        postal_code: postalCode,
        detail_address: detailAddress,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.addressId;
  };

  const postTransaction = async (e) => {
    const res = await axios.post(
      "/transactions/waiting-payment",
      {
        userId: userId,
        addressId: e,
        totalAmount: totalToPay,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data.transactionId;
  };

  const postDetailTransaction = async (e) => {
    const res = await axios.post(
      "/transactions/detail",
      {
        carts,
        transactionId: e,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
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
