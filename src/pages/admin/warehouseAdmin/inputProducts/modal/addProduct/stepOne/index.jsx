import React, { useState, useEffect } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import { useFormik } from "formik";
import "./style.css";
import axios from "../../../../../../../utils/axios";
import StepTwo from "../stepTwo";
import { colors } from "@mui/material";

function Index(props) {
  const { onHide, productId } = props;
  const [modalShowStepTwo, setModalShowStepTwo] = useState(false);
  const [fetchCategoryList, setFetchCategoryList] = useState([]);
  const [productName, setProductName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [addedVariants, setAddedVariants] = useState([]);
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
      var isNotDuplicate;
      selectedCategories.filter((value) => {
        if (value.categoryName != categoryForm.categoryName) {
          isNotDuplicate = true;
        } else {
          isNotDuplicate = false;
        }
      });
      if (!selectedCategories.length) {
        setSelectedCategories([...selectedCategories, categoryForm]);
      }
      if (isNotDuplicate) {
        console.log("akhir");
        setSelectedCategories([...selectedCategories, categoryForm]);
      }
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

  const onDeleteCategoryButton = (e) => {
    const categoryId = e.target.value;
    const removeDeletedData = [];
    selectedCategories.filter((value) => {
      if (value.categoryId != categoryId) {
        removeDeletedData.push(value);
      }
    });
    setSelectedCategories(removeDeletedData);
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
            onClick={onDeleteCategoryButton}
          >
            ⤬
          </button>
        </Badge>
      );
    });
  };

  const showAddedVariants = () => {
    return addedVariants.map((value) => {
      const { color } = value;
      return (
        <Badge bg="primary" style={{ color: "white", margin: "3px" }}>
          {color}
          <button
            value={color}
            style={{ backgroundColor: "inherit", border: 0, color: "white" }}
            onClick={onDeleteVariantButton}
          >
            ⤬
          </button>
        </Badge>
      );
    });
  };

  const onDeleteVariantButton = (e) => {
    const color = e.target.value;
    const removeDeletedData = [];
    addedVariants.filter((value) => {
      if (value.color != color) {
        removeDeletedData.push(value);
      }
    });
    setAddedVariants(removeDeletedData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
          <label className="label">Added Variant</label>
          <div className="show-selected-category">{showAddedVariants()}</div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onAddCategory}>Add Category</Button>
        <Button onClick={() => setModalShowStepTwo(true)}>Add Variant</Button>
        <StepTwo
          show={modalShowStepTwo}
          onHide={() => setModalShowStepTwo(false)}
          setAddedVariants={setAddedVariants}
          addedVariants={addedVariants}
        />
        <Button>Submit</Button>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Index;
