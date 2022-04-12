import "./style.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

function FeaturedInfo() {
  return (
    <div className="featured-container">
      <div className="featured-item">
        <span className="featured-title">Revanue</span>
        <div className="featured-transaction-container">
          <span className="featured-transaction-">$2,415</span>
          <span className="featured-transaction-Rate">
            -11.4 <ArrowDownward className="featured-icon negative" />
          </span>
        </div>
        <span className="featured-sub">Compared to last month</span>
      </div>
      <div className="featured-item">
        <span className="featured-title">Sales</span>
        <div className="featured-transaction-container">
          <span className="featured-transaction-">$4,415</span>
          <span className="featured-transaction-Rate">
            -1.4 <ArrowDownward className="featured-icon negative" />
          </span>
        </div>
        <span className="featured-sub">Compared to last month</span>
      </div>
      <div className="featured-item">
        <span className="featured-title">Cost</span>
        <div className="featured-transaction-container">
          <span className="featured-transaction-">$2,225</span>
          <span className="featured-transaction-Rate">
            +2.4 <ArrowUpward className="featured-icon" />
          </span>
        </div>
        <span className="featured-sub">Compared to last month</span>
      </div>
    </div>
  );
}

export default FeaturedInfo;
