import React, { useState, useEffect } from "react";
import FeaturedInfo from "./components/featuredInfo";
import Sidebar from "../../../../component/navigation/admin";
import axios from "../../../../utils/axios";
import Chart from "./components/chart";
import "./style.css";

function SalesReport() {
  const [chartData, setChartData] = useState([]);
  const [chartSortMethod, setChartsSortMethod] = useState("month");
  const [chartDataSort, setChartDataSort] = useState("2022");
  const fetchChartData = async () => {
    try {
      const res = await axios.get("/transactions/sum/per-month", {
        params: { year: chartDataSort, method: chartSortMethod },
      });
      const { result } = res.data;
      mappingChartData(result);
    } catch (error) {
      throw error;
    }
  };

  const mappingChartData = (e) => {
    const mappingResult = [];
    if (chartSortMethod === "month") {
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

    setChartData(mappingResult);
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [chartDataSort, chartSortMethod]);

  return (
    <div className="sales-report-wrapper">
      <Sidebar />
      <div className="sales-report-container">
        <FeaturedInfo />
        <Chart
          data={chartData}
          title="Total Revenue"
          dataKeyLine="Rupiah"
          dataKeyX={chartSortMethod == "month" ? "month" : "year"}
          setChartDataSort={setChartDataSort}
          setChartsSortMethod={setChartsSortMethod}
        />
      </div>
    </div>
  );
}

export default SalesReport;
