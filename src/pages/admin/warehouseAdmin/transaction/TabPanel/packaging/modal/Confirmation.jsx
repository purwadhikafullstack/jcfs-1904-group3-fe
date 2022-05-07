import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "../../../../../../../utils/axios";

import SuccessModal from "../../../../../../../component/modal/SuccessModal";

function ConfirmFinishPackagingModal(props) {
  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const { onHide, transactionId, fetchTransactionHistory } = props;

  const onFinishPackaging = async () => {
    try {
      const res = await axios.put("/transactions/finish/packaging", {
        transactionId,
      });
      if (res.data) {
        setShowSuccesModal(true);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    // fetchtransaction history setelah user menutup success alert agar menghindari render ulang
    if (!showSuccesModal) {
      fetchTransactionHistory();
    }
  }, [showSuccesModal]);

  return (
    <Modal {...props} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Finish packaging?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="success" onClick={onFinishPackaging}>
          yes
        </Button>
        <Button variant="danger" onClick={onHide}>
          cancel
        </Button>
      </Modal.Footer>
      <SuccessModal
        show={showSuccesModal}
        onHide={() => {
          setShowSuccesModal(false);
          onHide();
        }}
      />
    </Modal>
  );
}

export default ConfirmFinishPackagingModal;
