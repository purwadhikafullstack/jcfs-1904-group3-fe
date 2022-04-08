import React, { useState, useEffect } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import axios from "../../../../../utils/axios";
import { Table } from "react-bootstrap";
import AddCategoryModal from "./modalComponent/addCategory";

import "./style.css";

function Index(props) {
  const { selectedProduct, onHide } = props;
  const [product, setProducts] = useState({});
  const [allCategoryList, setAllCategoryList] = useState([]);
  const [selectedProductCategory, setSelectedProductCategory] = useState([]);
  const [modalShowAddCategory, setModalShowAddCategory] = useState(false);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 1,
  });
  const {
    productName,
    productId,
    price,
    image,
    variant,
    qtyTotal,
    size,
    variantId,
  } = product;
  const { page, itemsPerPage, maxPage } = paginationState;

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories");
      const { result } = res.data;
      setAllCategoryList(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const resGetProducts = await axios.get("/products/productDetail", {
        params: {
          id: selectedProduct,
          page: page,
          itemsPerPage: itemsPerPage,
        },
      });
      const resGetCategory = await axios.get("/products/category", {
        params: {
          id: selectedProduct,
        },
      });
      setSelectedProductCategory(resGetCategory.data.result);
      const { result, dataCount } = resGetProducts.data;
      console.log(result);
      setProducts(result[0]);
      setPaginationState({
        ...paginationState,
        maxPage: Math.ceil(dataCount[0].total / paginationState.itemsPerPage),
      });
    } catch (error) {
      console.log({ error });
    }
  };
  const onSaveProduct = async () => {
    try {
      const res = await axios.put("/products", {
        productData: {
          productName,
          color: variant,
          price,
          qtyTotal,
        },
        productId,
        variantId,
      });
      alert(res.data.message);
      onHide();
    } catch (error) {
      console.log(error);
    }
  };
  const showAllCategoryMapping = () => {
    return allCategoryList.map((value) => {
      return <option value={value.id}>{value.categoryName}</option>;
    });
  };
  const showSelectedProductCategory = () => {
    return selectedProductCategory.map((value) => {
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
            style={{ backgroundColor: "inherit", border: 0, color: "white" }}
          >
            ⤬
          </button>
        </Badge>
      );
    });
  };
  const btnPrevPageHandler = () => {
    setPaginationState({ ...paginationState, page: page - 1 });
  };
  const btnNextPageHandler = () => {
    setPaginationState({ ...paginationState, page: page + 1 });
  };

  const handleChange = (e) => {
    setProducts({ ...product, [e.target.name]: e.target.value });
  };
  const selectedCategory = (e) => {
    console.log(e.target.value);
  };
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [selectedProduct]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <div>
            <p> Product Name : {productName}</p>
            <h5> Variant : {variant}</h5>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="editor-form-content">
          <div className="editor-form-content-one">
            <label>Category Name</label>
            <div className="show-selected-category">
              {showSelectedProductCategory()}
            </div>
            <p></p>
            <input
              name="productName"
              value={productName}
              onChange={handleChange}
              type="text"
              placeholder="Enter Product Name"
              className="Input"
            />
            <label>Product Color</label>
            <input
              name="variant"
              type="text"
              value={variant}
              onChange={handleChange}
              placeholder="Enter Product Name"
              className="Input"
            />
            <label>Product Warehouse</label>
            <select
              name="warehouseId"
              className="form-control"
              style={{ marginBottom: "50px" }}
            >
              <option value="1">1</option>
            </select>
          </div>
          <div className="editor-form-content-two">
            <label>Product size</label>
            <select
              name="warehouseId"
              disabled={size === null ? "true" : "false"}
              className="form-control"
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="XL">L</option>
            </select>
            <label>Product Price</label>
            <input
              value={price}
              onChange={handleChange}
              name="price"
              type="text"
              placeholder="Enter Product Name"
              className="Input"
            />
            <label>Product Quantity</label>
            <input
              name="qtyTotal"
              value={qtyTotal}
              onChange={handleChange}
              type="text"
              placeholder="Enter Product Name"
              className="Input"
            />
            <label>Product Image</label>
            <div className="input-image">
              <input type="file" className="input-image-button" />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={btnPrevPageHandler}
          variant="contained"
          disabled={page == 1 && true}
        >
          {"<"}
        </Button>
        <div className="text-center ml-3 mr-3">
          Page {page} of {maxPage}
        </div>
        <Button
          onClick={btnNextPageHandler}
          variant="contained"
          style={{ marginRight: "30px" }}
          disabled={page === maxPage && true}
        >
          {">"}
        </Button>
        <Button variant="success" onClick={() => setModalShowAddCategory(true)}>
          Add category
        </Button>
        <AddCategoryModal
          show={modalShowAddCategory}
          onHide={() => setModalShowAddCategory(false)}
          categoryList={allCategoryList}
          productId={productId}
        />

        <Button onClick={onSaveProduct} variant="danger">
          Save
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Index;
