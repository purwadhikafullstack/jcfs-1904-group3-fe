import React, { useEffect, useState } from "react";
import axios from "../../../../../utils/axios";
import { Button } from "@mui/material";
import { Table } from "react-bootstrap";
import AddCategoryModal from "./modalComponent/addCategory";
import DeleteCategoryModal from "./modalComponent/deleteCategory";
import "./style.css";

function Index(props) {
  const { selectedProductId } = props;
  const [modalShowAddCategory, setModalShowAddCategory] = useState(false);
  const [modalShowDeleteCategory, setModalShowDeleteCategory] = useState(false);
  const [product, setProducts] = useState({});
  const [productCategory, setProductCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
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
      setCategoryList(result);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProducts = async () => {
    try {
      const resGetProducts = await axios.get("/products/productDetail", {
        params: {
          id: selectedProductId,
          page: page,
          itemsPerPage: itemsPerPage,
        },
      });
      const resGetCategory = await axios.get("/products/category", {
        params: {
          id: selectedProductId,
        },
      });
      setProductCategory(resGetCategory.data.result);
      const { result, dataCount } = resGetProducts.data;

      setProducts(result[0]);
      setPaginationState({
        ...paginationState,
        maxPage: Math.ceil(dataCount[0].total / paginationState.itemsPerPage),
      });
    } catch (error) {
      console.log({ error });
    }
  };
  const handleChange = (e) => {
    setProducts({ ...product, [e.target.name]: e.target.value });
  };
  const btnPrevPageHandler = () => {
    setPaginationState({ ...paginationState, page: page - 1 });
  };
  const btnNextPageHandler = () => {
    setPaginationState({ ...paginationState, page: page + 1 });
  };
  const categoryMapping = () => {
    return productCategory.map((value) => {
      return <td>{value.categoryName}</td>;
    });
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    fetchProducts();
  }, [selectedProductId]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      <div className="editor-container">
        <div className="editor-form">
          <div className="editor-form-header">
            <h5>Product Name : {productName}</h5>
            <h5>Product Id : {productId}</h5>
            <h5>Variant : {variant}</h5>
          </div>
          <div className="editor-form-content">
            <div className="editor-form-content-one">
              <div>
                <label>Product Category</label>
                <Table striped bordered hover className="product-category-list">
                  <tbody>{categoryMapping()}</tbody>
                </Table>
                <div>
                  <Button
                    onClick={() => setModalShowAddCategory(true)}
                    variant="contained"
                    className="button-add-category"
                  >
                    Add Category
                  </Button>
                  <AddCategoryModal
                    show={modalShowAddCategory}
                    onHide={() => setModalShowAddCategory(false)}
                    categoryList={categoryList}
                    productId={productId}
                  />
                  <Button
                    onClick={() => setModalShowDeleteCategory(true)}
                    variant="contained"
                    className="button-delete-category"
                  >
                    Delete Category
                  </Button>
                  <DeleteCategoryModal
                    show={modalShowDeleteCategory}
                    onHide={() => setModalShowDeleteCategory(false)}
                    productCategory={productCategory}
                    productId={productId}
                  />
                </div>
              </div>

              <label>Product Name</label>
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
              <select name="warehouseId" className="form-control">
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
              <Button
                onClick={onSaveProduct}
                variant="contained"
                className="button-add-category"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center button-container1">
        <Button
          onClick={btnPrevPageHandler}
          variant="contained"
          sx={{ backgroundColor: "black" }}
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
          sx={{ backgroundColor: "black" }}
          disabled={page === maxPage && true}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}

export default Index;
