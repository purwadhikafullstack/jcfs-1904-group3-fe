import React, { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import { styled, alpha } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import "./style.css";

function MuiNavBar() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e);
  };

  const searchBarColor = grey[100];

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: searchBarColor,
    "&:hover": {
      backgroundColor: searchBarColor,
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
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
  return (
    <div className="navBar">
      <Container
        maxWidth="none"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingInline: 50,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <Stack
          direction="row"
          p={3}
          className="transition"
          alignItems="center"
          style={{ padding: 0 }}
        >
          <img
            src="https://i.imgur.com/WYBghfu.png"
            alt="Logo"
            height={50}
            style={{ marginRight: 50 }}
          />
          <Button
            onClick={() => handleChange("cat")}
            className="btnNavbar btn-effect"
            style={{ color: "black", marginRight: 10 }}
          >
            Categories
          </Button>
          <Button
            onClick={() => handleChange("need")}
            className="btnNavbar btn-effect"
            style={{ color: "black", marginRight: 10 }}
          >
            Needs
          </Button>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ShoppingCartIcon sx={{ m: 2 }} />
          <ProfileIcon />
        </Stack>
      </Container>

      {value == "cat" ? (
        <Container
          maxWidth="none"
          style={{
            display: "flex",
            paddingInline: 50,
            paddingBottom: 20,
          }}
          className="categoryListParent"
        >
          <Button
            variant="text"
            href=""
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Sofa
          </Button>
          <Button
            variant="text"
            href=""
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Chairs
          </Button>
          <Button
            variant="text"
            href=""
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Tables
          </Button>
          <Button
            variant="text"
            href=""
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Storage
          </Button>
          <Button
            variant="text"
            href=""
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Beds
          </Button>
          <Button
            variant="text"
            href=""
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            wardrobe
          </Button>
          <Button
            variant="text"
            href=""
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            lighting
          </Button>
        </Container>
      ) : (
        <Container
          maxWidth="none"
          style={{
            display: "flex",
            paddingInline: 50,
            paddingBottom: 20,
          }}
          className="categoryListParent"
        >
          <Button
            variant="text"
            href=""
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            House
          </Button>
          <Button
            variant="text"
            href=""
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            Office
          </Button>
          <Button
            variant="text"
            href=""
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            School
          </Button>
          <Button
            variant="text"
            href=""
            style={{ color: "black", marginRight: 10, fontSize: 12 }}
            className="categoryButton"
          >
            kids
          </Button>
        </Container>
      )}
    </div>
  );
}

export default MuiNavBar;
