import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "../../../../../../utils/axios";

import SuccessModal from "../../../../../../component/modal/SuccessModal";

function FinishDeliveringPayment(props) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { onHide, transactionId, fetchTransactionHistory, token } = props;

  const onFinishPackaging = async () => {
    try {
      const res = await axios.put(
        "/transactions/finish/delivering",
        {
          transactionId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setShowSuccessModal(true);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    // fetchtransaction history setelah user menutup success alert agar menghindari render ulang
    if (!showSuccessModal) {
      fetchTransactionHistory();
    }
  }, [showSuccessModal]);
  useEffect(() => {
    console.log(transactionId);
  }, []);

  return (
    <Modal {...props} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Finish transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Please make sure you have received the package as you may not undo this
        proccess !
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onFinishPackaging}>
          yes
        </Button>
        <Button variant="danger" onClick={onHide}>
          cancel
        </Button>
      </Modal.Footer>
      <SuccessModal
        show={showSuccessModal}
        onHide={() => {
          setShowSuccessModal(false);
          onHide();
        }}
      />
    </Modal>
  );
}

export default FinishDeliveringPayment;
