import React, { useState, useEffect } from "react";
import ChartProduct from "./components/chart/products";
import Sidebar from "../../../../component/navigation/admin";
import axios from "../../../../utils/axios";
import ChartRevenue from "./components/chart/totalRevenue";
import "./style.css";

function SalesReport() {
  const [chartDataProduct, setChartDataProduct] = useState([]);
  const [chartDataProductKeyword, setChartDataProductKeyword] = useState([]);
  const [chartDataProductSortMethod, setChartsDataProductSortMethod] =
    useState("month");
  const [chartDataProductSort, setChartDataProductSort] = useState("2022");

  const [chartDataRevenue, setChartDataRevenue] = useState([]);
  const [chartDataRevenueSortMethod, setChartsDataRevenueSortMethod] =
    useState("month");
  const [chartDataRevenueSort, setChartDataRevenueSort] = useState("2022");

  const fetchChartDataProducts = async () => {
    try {
      const res = await axios.get("/products");
      const { result } = res.data;
      mappingChartDataProduct(result);
    } catch (error) {
      throw error;
    }
  };
  const fetchChartDataRevenue = async () => {
    try {
      const res = await axios.get("/transactions/sum/per-month", {
        params: {
          year: chartDataRevenueSort,
          method: chartDataRevenueSortMethod,
        },
      });
      const { result } = res.data;
      mappingChartDataRevenue(result);
    } catch (error) {
      throw error;
    }
  };
  const mappingChartDataProduct = (e) => {
    const productNames = [];
    e.filter((value) => {
      productNames.push(value.productName);
    });
    // setProducts(productNames);
  };

  const mappingChartDataRevenue = (e) => {
    const mappingResult = [];
    if (chartDataRevenueSortMethod === "month") {
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
        console.log(year);
        const Rupiah = parseInt(value.totalAmount);

        mappingResult.push({ year, Rupiah });
      });
    }

    setChartDataRevenue(mappingResult);
  };

  useEffect(() => {
    fetchChartDataRevenue();
  }, []);

  useEffect(() => {
    fetchChartDataRevenue();
  }, [chartDataRevenueSort, chartDataRevenueSortMethod]);

  return (
    <div className="sales-report-wrapper">
      <Sidebar />
      <div className="sales-report-container">
        <ChartRevenue />
        <ChartProduct />
      </div>
    </div>
  );
}

export default SalesReport;
