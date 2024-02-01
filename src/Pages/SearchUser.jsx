import React, { useState } from "react";
import axios from "axios";
import { apiURL, apiKey } from "../Config/ApiConfig";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import FaceIcon from "@mui/icons-material/Face";
// import DollarSign from '@mui/icons-material/AttachMoney';
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid";

import {
  Divider,
  Grid,
  Paper,
  FormControl,
  TextField,
  Button,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import SnackBarMsg from "../MinorComponents/SnackBarMsg";

const columns = [
  { field: "OrderID", headerName: "Invoice", width: 100 },
  { field: "PaymentDate", headerName: "Order Date", width: 200 },
  { field: "PlanName", headerName: "Plan Name", width: 130 },
  {
    field: "Amount",
    headerName: "Amount ($)",
    type: "number",
    width: 90,
  },
  {
    field: "Status",
    headerName: "Plan Status",
    description: "Shows Status",
    sortable: true,
    width: 150,
  },
  { field: "ReturningCustomer", headerName: "Returning", width: 130 },
];

function SearchUser() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [recordSet, setRecordSet] = useState(false);
  const [snackbarKey, setSnackbarKey] = useState(0); // State Key for SnackBar
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-api-key": `${apiKey}`,
    },
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const userData = {
      id: email,
    };
    const userEndpoint = `${apiURL}/searchUser`;
    const orderEndpoint = `${apiURL}/searchOrder`;

    setLoading(true);
    try {
      const userResponse = await axios.post(userEndpoint, userData, config);

      //console.log(userResponse.data); // User Data

      if (userResponse.data.severity === "warning") {
        setShowSnackBar(true);
        setSnackBarSeverity(userResponse.data.severity);
        setSnackBarMessage(userResponse.data.message);
        setSnackbarKey((prevKey) => prevKey + 1);
        setEmail("");
        setLoading(false);
        setRecordSet(false);
      } else {
        //console.log(userResponse.data.data.userInfo.UserID); // UID
        setUserInfo(userResponse.data.data);
        setRecordSet(true);
        setShowSnackBar(true);
        setSnackBarSeverity(userResponse.data.severity);
        setSnackBarMessage(userResponse.data.message);
        setSnackbarKey((prevKey) => prevKey + 1);
        setLoading(false);
        setEmail("");

        const userId = {
          id: userResponse.data.data.userInfo.UserID,
        };
        // Another Block for Plans
        try {
          const planResponse = await axios.post(orderEndpoint, userId, config);
          //console.log(planResponse.data.data); // Order Info
          setOrderInfo(planResponse.data.data.orders);
        } catch (error) {
          console.error("ORDER API - Error", error);
        }
        // Another Block for Plans
      }
    } catch (error) {
      setSnackbarKey((prevKey) => prevKey + 1);
      setShowSnackBar(true);
      setSnackBarSeverity("error");
      if (error.response) {
        setSnackBarMessage("API Error: " + error.response.data.message);
      } else if (error.request) {
        setSnackBarMessage("API Error: No response received from the server.");
      } else {
        setSnackBarMessage("API Error: " + error.message);
      }
      setLoading(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#eceff4" }}>
      <SnackBarMsg
        showSnackBar={showSnackBar}
        snackBarSeverity={snackBarSeverity}
        snackBarMessage={snackBarMessage}
        key={snackbarKey}
      />
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="h6">Search User by Email ID or UID</Typography>
      <Divider />
      {loading && <LinearProgress />}

      <Grid container p={1} spacing={2}>
        <Grid item lg={3} xs={12}>
          <Paper elevation={3} sx={{ p: 1 }}>
            <form
              style={{ display: "flex", alignItems: "center" }}
              onSubmit={(event) => {
                event.preventDefault();
                handleSearch(event);
              }}
            >
              <FormControl sx={{ width: "70%", marginRight: "8px" }}>
                <TextField
                  id="id"
                  label="Enter Email id or Uid"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  size="small"
                  variant="standard"
                  fullWidth
                />
              </FormControl>
              <Button
                variant="text"
                color="primary"
                onClick={handleSearch}
                size="small"
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Divider />
      {recordSet && (
        <Grid container spacing={2} mt={2}>
          <Grid item lg={12} xs={12}>
            <Typography
              variant="h4"
              color="initial"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Chip
                label={userInfo?.userInfo?.UserName}
                variant="outlined"
                icon={<FaceIcon />}
              />
              <form
                action="https://app.trafficshield.io/v2/verify_user/index"
                target="blank"
                method="post"
              >
                <input
                  type="hidden"
                  value={userInfo?.userInfo?.UserID}
                  name="UserID"
                />
                <input
                  type="hidden"
                  value={userInfo?.userInfo?.UserEmail}
                  name="Email"
                />
                <input
                  type="hidden"
                  value="https://trafficshield.io/wp-login.php?action=logout&amp;_wpnonce=ffc5871a45"
                  name="Logout_url"
                />

                {/* Assuming handleFormSubmit is your function */}
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ ml: 2 }} // Adjust margin as needed
                  size="small"
                  target="_blank"
                >
                  Go to App
                </Button>
              </form>
            </Typography>
          </Grid>
          <Grid item lg={4}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h4" color="initial">
                  Customer Details
                </Typography>
              </Box>

              <Table aria-label="simple table" size="medium">
                <TableBody>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {userInfo?.userInfo?.UserID}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>{userInfo?.userInfo?.UserEmail}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Registeration Date</TableCell>
                    <TableCell>{userInfo?.userInfo?.RegisteredDate}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          {/* Transaction History */}
          <Grid item lg={8} xs={12}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h4" color="initial">
                  Transactions Details
                </Typography>
              </Box>
              <DataGrid
                rows={orderInfo || []}
                columns={columns}
                fullWidth
                getRowId={(row) => row.OrderID}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                rowHeight={30}
                sx={{
                  fontSize: "12px",
                  padding: "0px",
                  margin: "0px",
                }}
              />
            </Paper>
          </Grid>
          {/* Transaction History */}
        </Grid>
      )}
    </Box>
  );
}

export default SearchUser;
