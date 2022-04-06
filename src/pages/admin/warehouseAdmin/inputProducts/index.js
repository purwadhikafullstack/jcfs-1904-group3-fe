import React, { useState, useEffect } from "react";
import Selector from "./selector/selector.jsx";
import Editor from "./editor/editor";
import "./style.css";
function Index() {
  const [selectedProductId, setSelectedProductId] = useState("");
  // useEffect(() => {
  //   console.log(selectedProductId);
  // }, [selectedProductId]);
  return (
    <div style={{ display: "flex" }}>
      <div className="Selector">
        <Selector setSelectedProductId={setSelectedProductId} />
      </div>
      <div className="Editor">
        {selectedProductId ? (
          <Editor selectedProductId={selectedProductId} />
        ) : (
          <h1>Select Products To edit</h1>
        )}
      </div>
    </div>
  );
}

export default Index;
