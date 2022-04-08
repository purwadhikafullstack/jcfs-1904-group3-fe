import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useFormik } from "formik";
import "./style.css";

function Index(props) {
  const { onHide } = props;
  return (
    <Modal {...props} centered style={{ backgroundColor: "grey" }}>
      <Modal.Header closeButton>
        <Modal.Title>Add Variant To Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>Variant Color</label>
        <input
          name="productName"
          type="text"
          placeholder="Enter Product Name"
          className="input"
        />
        <label>Variant Price</label>
        <input
          name="productName"
          type="text"
          placeholder="Enter Product Name"
          className="input"
        />
        <label>Variant Quantity</label>
        <input
          name="productName"
          type="text"
          placeholder="Enter Product Name"
          className="input"
        />
        <label>Variant Size</label>
        <select name="warehouseId" className="form-control">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="XL">L</option>
        </select>
        <label>Variant Warehouse</label>
        <select name="warehouseId" className="form-control">
          <option value="1">1</option>
        </select>
        <label>Variant Image</label>
        <div>
          <input type="file" className="input-image-button" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onHide}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Index;
