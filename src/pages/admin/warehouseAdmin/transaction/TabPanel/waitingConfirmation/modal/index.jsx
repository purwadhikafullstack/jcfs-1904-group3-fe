import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "../../../../../../utils/axios";

function PreviewEvidenceModal(props) {
  const { onHide, previewImage } = props;

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
          close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PreviewEvidenceModal;
