import React, { useState, useEffect } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { useFormik } from "formik";
import "./style.css";
import axios from "../../../../../../../utils/axios";

function Index(props) {
  const { onHide, productId } = props;
  const [fetchCategoryList, setFetchCategoryList] = useState([]);
  const [productName, setProductName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({
    categoryId: "",
    categoryName: "",
  });

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      const { result } = res.data;
      setFetchCategoryList(result);
    } catch (error) {
      console.log(error);
    }
  };

  const categoryMapping = () => {
    return fetchCategoryList.map((value, index) => {
      if (index === 0) {
        return (
          <>
            <option value={["", ""]}>Select More</option>
            <option value={[value.id, value.categoryName]}>
              {value.categoryName}
            </option>
          </>
        );
      } else {
        return (
          <option value={[value.id, value.categoryName]}>
            {value.categoryName}
          </option>
        );
      }
    });
  };
  const onAddCategory = () => {
    if (categoryForm.categoryId) {
      setSelectedCategories([...selectedCategories, categoryForm]);
    }
  };
  const selectedCategory = (e) => {
    const value = e.target.value.split(",");
    const id = parseInt(value[0]);
    const categoryName = value[1];
    setCategoryForm({
      categoryId: id,
      categoryName,
    });
  };

  const productNameChange = (e) => {
    setProductName(e.target.value);
  };

  const showSelectedProductCategory = () => {
    return selectedCategories.map((value) => {
      var colors = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
      ];
      var color = colors[Math.floor(Math.random() * colors.length)];

      return (
        <Badge bg={color} style={{ color: "white", margin: "3px" }}>
          {value.categoryName}
          <button
            value={value.categoryId}
            style={{ backgroundColor: "inherit", border: 0, color: "white" }}
          >
            ⤬
          </button>
        </Badge>
      );
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);

  return (
    <Modal {...props} centered style={{ backgroundColor: "grey" }}>
      <Modal.Header>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <label className="label"> ProductName</label>
          <input
            onChange={productNameChange}
            name="productName"
            type="text"
            placeholder="Enter Product Name"
            className="input"
          />
          <label className="label">Category List</label>
          <div className="show-selected-category">
            {showSelectedProductCategory()}
          </div>
          <label className="label">Select Category</label>
          <select
            name="category"
            className="form-control"
            onChange={selectedCategory}
          >
            {categoryMapping()}
          </select>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onAddCategory}>Add Category</Button>
        <Button>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Index;
