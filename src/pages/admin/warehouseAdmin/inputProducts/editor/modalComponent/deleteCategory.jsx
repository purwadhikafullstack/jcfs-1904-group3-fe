import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import axios from "../../../../../../utils/axios";

function Index(props) {
  const { productCategory, productId } = props;

  const onDeleteButton = async (e) => {
    const categoryId = e.target.value;
    try {
      const res = await axios.delete("/products/category", {
        headers: {},
        data: {
          productId,
          categoryId: categoryId,
        },
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const categoryMapping = () => {
    return productCategory.map((value) => {
      return (
        <tr>
          <td>{value.categoryId}</td>
          <td>{value.categoryName}</td>
          <td>
            <Button value={value.categoryId} onClick={onDeleteButton}>
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Category To Products
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Category Name</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>{categoryMapping()}</tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Index;
