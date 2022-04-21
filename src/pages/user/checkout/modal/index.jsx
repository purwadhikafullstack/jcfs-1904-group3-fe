import React from "react";
import { Modal, Button } from "react-bootstrap";

function CheckoutModal(props) {
  return (
    <Modal {...props} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title style={{ textAlign: "center" }}>
          Confirm Payment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Please click continue to proceed the transaction</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary">Continue</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckoutModal;
