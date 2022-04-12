import React, { useState, useEffect } from "react";
import FeaturedInfo from "./components/featuredInfo";
import Sidebar from "../../../../component/navigation/admin";
import axios from "../../../../utils/axios";
import Chart from "./components/chart";
import "./style.css";

function SalesReport() {
  const [chartData, setChartData] = useState([]);
  const fetchChartData = async () => {
    try {
      const res = await axios.get("/transactions/sum/per-month");
      const { result } = res.data;
      mappingChartData(result);
    } catch (error) {
      throw error;
    }
  };

  const mappingChartData = (e) => {
    const mappingResult = [];
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

      const revenue = parseInt(value.totalAmount);

      mappingResult.push({ month, revenue });
    });
    setChartData(mappingResult);
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div className="sales-report-wrapper">
      <Sidebar />
      <div className="sales-report-container">
        <FeaturedInfo />
        <Chart
          data={chartData}
          title="Total Revenue"
          dataKeyLine="revenue"
          dataKeyX="month"
        />
      </div>
    </div>
  );
}

export default SalesReport;
