import React, { useState, useEffect } from "react";
import axios from "../../../../../../utils/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import TransactionList from "./component/TransactionList";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function TabWaitingPayment() {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [paginationState, setPaginationState] = useState({
    page: 1,
    maxPage: 0,
    itemsPerPage: 4,
  });

  const { page, maxPage, itemsPerPage } = paginationState;

  const fetchTransactionHistory = async () => {
    try {
      const res = await axios.get(`/transactions/admin/status/`, {
        params: {
          status: "waiting payment",
          limit: parseInt(itemsPerPage),
          offset: parseInt((page - 1) * itemsPerPage),
        },
      });
      const { result, dataCount } = res.data;
      setTransactionHistory(result);
      setPaginationState({
        ...paginationState,
        maxPage: Math.ceil(dataCount[0].totalData / itemsPerPage),
      });
    } catch (error) {
      throw error;
    }
  };
  const btnPrevPageHandler = () => {
    setPaginationState({ ...paginationState, page: page - 1 });
  };
  const btnNextPageHandler = () => {
    setPaginationState({ ...paginationState, page: page + 1 });
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  useEffect(() => {
    fetchTransactionHistory();
  }, [page]);

  return (
    <div>
      <TableContainer
        component={Paper}
        className="shoppingCart-table"
        sx={{ marginTop: "50px", width: "100%", marginInline: "auto" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ width: "5%" }}>
                <p>UserId</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "5%" }}>
                <p>TransactionId</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "5%" }}>
                <p>Username</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "14%" }}>
                <p>Email</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "14%" }}>
                <p>Products</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "14%" }}>
                <p>Total amount</p>
              </TableCell>
              <TableCell align="center" sx={{ width: "14%" }}>
                <p>Address</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody> {TransactionList(transactionHistory)}</TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Button
          sx={{ color: "black" }}
          onClick={btnPrevPageHandler}
          disabled={(page == 1) & true}
        >
          <ArrowBackIosIcon fontSize="small" />
        </Button>
        <strong style={{ paddingTop: "2px" }}>{page}</strong>
        <Button
          sx={{ color: "black" }}
          onClick={btnNextPageHandler}
          disabled={(page == maxPage) & true}
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
}

export default TabWaitingPayment;
