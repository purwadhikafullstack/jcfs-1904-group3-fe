import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Index() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
    </div>
  );
}

export default Index;
