import React, { useState, useEffect } from "react";
import "./style.css";
import { TextField, Autocomplete } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import axios from "../../../../../../../utils/axios";

function ChartProduct() {
  const [productNames, setProductNames] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [sortMethod, setSortMethod] = useState("month");
  const [sortMethodValue, setSortMethodValue] = useState("2022");
  const [enteredSearchValue, setEnteredSearchValue] = useState("Poang");
  const [searchValue, setSearchValue] = useState("");

  const fetchProductNames = async () => {
    try {
      const res = await axios.get("/products");
      const { result } = res.data;
      mappingProductNames(result);
    } catch (error) {
      throw error;
    }
  };
  const fetchChartData = async () => {
    try {
      const res = await axios.get("/transactions/product/total-revenue", {
        params: {
          productName: enteredSearchValue,
          sortMethod,
          sortMethodValue,
        },
      });
      const { result } = res.data;
      mappingChart(result);
    } catch (error) {
      throw error;
    }
  };
  const mappingProductNames = (e) => {
    const productNames = [];
    e.filter((value) => {
      productNames.push(value.productName);
    });
    setProductNames(productNames);
  };
  const mappingChart = (e) => {
    const mappingResult = [];
    if (sortMethod === "month") {
      e.filter((value, index) => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December ",
        ];
        const month = months[index];

        const Rupiah = parseInt(value.totalAmount);

        mappingResult.push({ month, Rupiah });
      });
    } else {
      e.filter((value) => {
        const year = value.Date.split("-")[0];
        const Rupiah = parseInt(value.totalAmount);

        mappingResult.push({ year, Rupiah });
      });
    }

    setChartData(mappingResult);
  };

  const handleSearch = (event, value) => {
    setSearchValue(value);
  };
  const handleSortMethod = (e) => {
    setSortMethod(e.target.value);
  };
  const handleSortMethodValue = (e) => {
    setSortMethodValue(e.target.value);
  };

  const enterSearch = (e) => {
    if (e.code === "Enter") {
      var checker = "";
      productNames.filter((value, index) => {
        console.log({
          value: value.toLowerCase(),
          searchValue: searchValue.toLowerCase(),
        });

        if (value.toLowerCase() == searchValue.toLowerCase()) {
          checker = true;
        }
      });
      if (checker) {
        setEnteredSearchValue(searchValue);
      } else {
        alert("Please enter a valid product");
      }
    }
  };
  useEffect(() => {
    fetchProductNames();
    fetchChartData();
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [enteredSearchValue, sortMethod, sortMethodValue]);

  return (
    <div className="chart">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Products Sales</h3>
          <h5 className="chart-title">Product: {enteredSearchValue}</h5>
        </div>

        <div className="chart-selector-container">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={productNames}
            sx={{ width: 700 }}
            renderInput={(params) => (
              <TextField {...params} label="Search Products" />
            )}
            value={searchValue}
            onChange={handleSearch}
            onInputChange={handleSearch}
            onKeyPress={enterSearch}
          />
          ;
          <FormControl fullWidth className="chart-selector-form">
            <InputLabel id="demo-simple-select-label">sortBy</InputLabel>
            <Select
              label="sortBy"
              className="chart-selector"
              onChange={handleSortMethod}
            >
              <MenuItem value="month">Month</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
          {sortMethod === "month" ? (
            <FormControl fullWidth className="chart-selector-form">
              <InputLabel id="demo-simple-select-label">year</InputLabel>
              <Select
                label="year"
                onChange={handleSortMethodValue}
                className="chart-selector"
              >
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2019">2019</MenuItem>
              </Select>
            </FormControl>
          ) : null}
        </div>
      </div>

      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={chartData}>
          <XAxis
            dataKey={sortMethod == "month" ? "month" : "year"}
            stroke="#5550bd"
          />
          <YAxis />
          <Line type="monotone" dataKey="Rupiah" stroke="#5550bd" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartProduct;