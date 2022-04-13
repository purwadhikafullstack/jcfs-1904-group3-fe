import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
import { Table } from "react-bootstrap";
import { Button } from "@mui/material";
import ProductList from "./component/productList";
import EditProductModal from "./modal/editProduct";
import AddProductModal from "./modal/addProduct/stepOne";
import Sidebar from "../../../../component/navigation/admin";
import "./style.css";
function Index(props) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [modalShowEditProduct, setModalShowEditProduct] = useState(false);
  const [modalShowAddProduct, setModalShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 7,
  });
  const { page, itemsPerPage, maxPage } = paginationState;
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products/filtered", {
        params: {
          page: page,
          itemsPerPage: itemsPerPage,
        },
      });
      const { result, dataCount } = res.data;
      setProducts(result);
      setPaginationState({
        ...paginationState,
        maxPage: Math.ceil(dataCount[0].total / paginationState.itemsPerPage),
      });
    } catch (error) {
      console.log({ error });
    }
  };
  const btnPrevPageHandler = () => {
    setPaginationState({ ...paginationState, page: page - 1 });
  };
  const btnNextPageHandler = () => {
    setPaginationState({ ...paginationState, page: page + 1 });
  };
  const onClickModalEditProducts = (e) => {
    console.log("masuk");
    console.log(selectedProduct);
    setModalShowEditProduct(true);
  };
  const renderProducts = () => {
    return products.map((value) => {
      return (
        <ProductList
          products={value}
          onClickModalEditProducts={onClickModalEditProducts}
          setSelectedProduct={setSelectedProduct}
        />
      );
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard">
        <div className="table-header">
          <Button
            style={{ width: "290px" }}
            variant="contained"
            color="success"
            onClick={() => {
              setModalShowAddProduct(true);
            }}
          >
            Add products
          </Button>
        </div>
        <AddProductModal
          show={modalShowAddProduct}
          onHide={() => {
            setModalShowAddProduct(false);
          }}
        />

        {selectedProduct ? (
          <EditProductModal
            show={modalShowEditProduct}
            onHide={() => setModalShowEditProduct(false)}
            selectedProduct={selectedProduct}
          />
        ) : (
          <></>
        )}
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="row-1">id</th>
                <th className="row-2">Products Name</th>
                <th className="row-3">inspect</th>
                <th className="row-4">Manage</th>
              </tr>
            </thead>
            <tbody>
              {products.length ? renderProducts() : <h1>..Loading</h1>}
            </tbody>
          </Table>
        </div>
        <div className="button-container">
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
    </div>
  );
}

export default Index;
