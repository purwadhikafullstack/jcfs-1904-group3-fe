import React, { useState, useEffect } from "react";
import Selector from "./dashboard/dashbaord.jsx";
import "./style.css";
function Index() {
  return (
    <div style={{ display: "flex" }}>
      <div className="Selector">
        <Selector />
      </div>
    </div>
  );
}

export default Index;
