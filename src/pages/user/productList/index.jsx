import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "../../../utils/axios";
import ListingProducts from "./components/listingProducts";

function Index() {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 9,
  });
  const { page, maxPage, itemsPerPage } = paginationState;
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      const { data } = res;
      setProducts(data.result);
      setSortedProducts(data.result);
      setPaginationState({
        ...paginationState,
        maxPage: Math.ceil(data.result.length / paginationState.itemsPerPage),
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const sortProducts = (e) => {
    const sortValue = e.target.value;
    const rawData = [...products];

    switch (sortValue) {
      case "default":
        break;
      case "lowPrice":
        rawData.sort((a, b) => a.price - b.price);
        break;
      case "highPrice":
        rawData.sort((a, b) => b.price - a.price);
        break;
      case "az":
        rawData.sort((a, b) => {
          // a : Kaos
          // b : Celana
          // b --> a

          if (a.productName < b.productName) {
            return -1;
          } else if (a.productName > b.productName) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case "za":
        rawData.sort((a, b) => {
          if (a.productName < b.productName) {
            return 1;
          } else if (a.productName > b.productName) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
    }

    setSortedProducts(rawData);
  };

  useEffect(() => {
    fetchProducts();
    const rawData = [...products];
    console.log(products);
  }, []);

  const btnPrevPageHandler = () => {
    setPaginationState({ ...paginationState, page: page - 1 });
  };
  const btnNextPageHandler = () => {
    setPaginationState({ ...paginationState, page: page + 1 });
  };

  return (
    <div
      style={{
        paddingInline: 50,
        paddingTop: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Product List</h1>
      <div>
        <FormControl style={{ width: 220 }}>
          <InputLabel id="demo-simple-select-label">SortBy</InputLabel>
          <Select value={age} label="SortBy" onChange={sortProducts}>
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="lowPrice">Lowest Price</MenuItem>
            <MenuItem value="highPrice">Highest Price</MenuItem>
            <MenuItem value="az">A-Z</MenuItem>
            <MenuItem value="za">Z-A</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        {sortedProducts.length ? (
          <ListingProducts
            products={sortedProducts}
            paginationState={paginationState}
          />
        ) : (
          <h1>Loading......</h1>
        )}
      </div>
      <div style={{ marginTop: 50 }}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <button onClick={btnPrevPageHandler} className={`btn btn-dark mr-5 `}>
            {"<"}
          </button>
          <div className="text-center">
            Page {page} of {maxPage}
          </div>
          <button onClick={btnNextPageHandler} className={`btn btn-dark ml-5 `}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
