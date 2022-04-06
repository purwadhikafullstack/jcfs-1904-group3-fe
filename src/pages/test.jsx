import React, { useState } from "react";
import { Container, Button, Stack, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

function Test() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const enterSearch = (e) => {
    if (e.code === "Enter") console.log(searchValue);
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: searchBarColor,
    marginLeft: 0,
    width: "100%",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "50ch",
        },
      },
    },
  }));

  const searchBarColor = grey[100];

  return (
    <div style={{ marginTop: 200 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          onKeyPress={enterSearch}
          placeholder="Search…"
          onChange={handleSearch}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <input type="text" onChange={handleSearch} onKeyPress={enterSearch} />
    </div>
  );
}

export default Test;
