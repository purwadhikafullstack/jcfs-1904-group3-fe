import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "../../../../../../utils/axios";

function ConfirmationModal(props) {
  const { onHide, transactionId, previewImage, paymentEvidence } = props;

  const onClickContinue = async () => {
    try {
      const uploadPayment = new FormData();
      uploadPayment.append("image", paymentEvidence);
      uploadPayment.append("transactionId", transactionId);

      await axios.post("/transactions/evidence/payment", uploadPayment);
      onHide();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    console.log(paymentEvidence);
  }, []);

  return (
    <Modal {...props} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title style={{ textAlign: "center" }}>
          Confirm Payment Evidence
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img style={{ width: "462px" }} src={previewImage} alt="" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onClickContinue}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
