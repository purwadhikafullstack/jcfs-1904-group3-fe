import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "../../../utils/axios";
import ListingProducts from "./components/listingProducts";

function Index() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    lastPage: 0,
    itemsPerPage: 5,
  });
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      const { data } = res;
      setProducts(data.result);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
          <Select value={age} label="SortBy" onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        {products.length ? (
          <ListingProducts products={products} />
        ) : (
          <h1>Loading......</h1>
        )}
      </div>
    </div>
  );
}

export default Index;
