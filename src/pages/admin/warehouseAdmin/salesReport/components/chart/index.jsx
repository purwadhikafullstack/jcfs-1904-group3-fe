import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import "./style.css";

function Chart({
  title,
  data,
  dataKeyLine,
  dataKeyX,
  setChartDataSort,
  setChartsSortMethod,
}) {
  const [sortMethod, setSortMethod] = useState("month");
  const [selectedYear, setSelectedYear] = useState("2022");
  const handleSortMethod = (e) => {
    setSortMethod(e.target.value);
    setChartsSortMethod(e.target.value);
  };
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setChartDataSort(e.target.value);
  };

  return (
    <div className="chart">
      <div className="chart-header">
        <h3 className="chart-title">
          {title} ({selectedYear})
        </h3>
        <div>
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
        </div>
        <div>
          {sortMethod === "month" ? (
            <FormControl fullWidth className="chart-selector-form">
              <InputLabel id="demo-simple-select-label">year</InputLabel>
              <Select
                label="year"
                onChange={handleYearChange}
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
        <LineChart data={data}>
          <XAxis dataKey={dataKeyX} stroke="#5550bd" />
          <YAxis />
          <Line type="monotone" dataKey={dataKeyLine} stroke="#5550bd" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default Chart;
