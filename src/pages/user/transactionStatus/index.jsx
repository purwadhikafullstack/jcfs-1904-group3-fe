import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import TabWaitingPayment from "./TabPanel/WaitingPayment";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function TransactionStatus() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "1000px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="black"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "black",
            },
          }}
        >
          <Tab sx={{ width: "20%" }} label="Waiting for payment" />
          <Tab sx={{ width: "20%" }} label="packaging" />
          <Tab sx={{ width: "20%" }} label="delivering" />
          <Tab sx={{ width: "20%" }} label="completed" />
          <Tab sx={{ width: "20%" }} label="canceled" />
        </Tabs>
      </Box>
      {value === 0 && <TabWaitingPayment />}
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item five
      </TabPanel>
    </Box>
  );
}
export default TransactionStatus;
