import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "../../../../../../utils/axios";

function Index(props) {
  const { categoryList, productId } = props;
  const [category, setCategory] = useState("");

  const selectedCategory = (e) => {
    setCategory(e.target.value);
  };
  const onAddButton = async () => {
    try {
      const res = await axios.post("/products/category", {
        productId,
        categoryId: parseInt(category),
      });
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const categoryMapping = () => {
    return categoryList.map((value) => {
      return <option value={value.id}>{value.categoryName}</option>;
    });
  };

  useEffect(() => {
    console.log(category);
    console.log(productId);
  }, []);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      style={{ backgroundColor: "grey" }}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Category To Products
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select
          name="category"
          className="form-control"
          onChange={selectedCategory}
        >
          {categoryMapping()}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onAddButton}>Add</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Index;
