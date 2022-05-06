import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Sidebar from "../../../../component/navigation/admin";
import TabWaitingPayment from "./TabPanel/WaitingPayment";
import TabWaitingConfirmation from "./TabPanel/waitingConfirmation";
import TabPackaging from "./TabPanel/packaging";
import TabDelivering from "./TabPanel/delivering";
import TabCompleted from "./TabPanel/completed";
import TabComplained from "./TabPanel/complained";

import "./style.css";
import "../style.css";

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
    <div className="navigation-wrapper">
      <Sidebar />
      <div className="page-container">
        <div className="status-container">
          <div className="status-header">
            <h1>Customer Transaction Status</h1>
          </div>
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
                <Tab sx={{ width: "16.6%" }} label="Waiting for payment" />
                <Tab sx={{ width: "16.6%" }} label="Waiting for confirmation" />
                <Tab sx={{ width: "16.6%" }} label="packaging" />
                <Tab sx={{ width: "16.6%" }} label="delivering" />
                <Tab sx={{ width: "16.6%" }} label="completed" />
                <Tab sx={{ width: "16.6%" }} label="complained" />
              </Tabs>
            </Box>
            {value === 0 && <TabWaitingPayment />}
            {value === 1 && <TabWaitingConfirmation />}
            {value === 2 && <TabPackaging />}
            {value === 3 && <TabDelivering />}
            {value === 4 && <TabCompleted />}
            {value === 5 && <TabComplained />}
          </Box>
        </div>
      </div>
    </div>
  );
}
export default TransactionStatus;
