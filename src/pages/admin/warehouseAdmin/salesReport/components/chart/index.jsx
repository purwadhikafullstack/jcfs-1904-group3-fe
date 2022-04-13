import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { Select, MenuItem } from "@mui/material";
import "./style.css";

function Chart({ title, data, dataKeyLine, dataKeyX }) {
  return (
    <div className="chart">
      <div className="chart-header">
        <h3 className="chartTitle">{title}</h3>
        <Select label="SortBy">
          <MenuItem value="az">A-Z</MenuItem>
          <MenuItem value="za">Z-A</MenuItem>
        </Select>
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
