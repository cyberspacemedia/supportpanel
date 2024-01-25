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
  Snackbar,
  Alert,
} from "@mui/material";

const columns = [
  { field: "id", headerName: "Invoice", width: 70 },
  { field: "date", headerName: "Date", width: 200 },
  { field: "planName", headerName: "Plan", width: 130 },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 90,
  },
  {
    field: "status",
    headerName: "Status",
    description: "Shows Status",
    sortable: true,
    width: 160,
  },
];

const rows = [
  {
    id: 9241,
    date: "2023-12-2 17:42:07",
    planName: "Premium",
    status: "wp-completed",
    amount: 149,
  },
];

function DashBoard() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchData, setFetchData] = useState([]);
  const [recordSet, setRecordSet] = useState(false);
  const [snackBarStatus, setSnackBarStatus] = useState(false)
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-api-key": `${apiKey}`, 
    },
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const data = {
      id: email,
    };
    const endpoint = `${apiURL}/searchUser`;
    setLoading(true);
    try {
      const response = await axios.post(endpoint, data, config);
      // console.log(response.data);
      setFetchData(response.data);
      setRecordSet(true);
      setSnackBarStatus(true)
      setLoading(false);
    } catch (error) {
      console.error("API Error", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarStatus(false)
  };


  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#eceff4" }}>
      <Snackbar
        open={snackBarStatus}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {`${fetchData?.data?.userInfo?.UserEmail || 'User'} Message from API`}
        </Alert>
      </Snackbar>

      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="h6">Search User by Email ID or UID</Typography>
      <Divider />
      {loading && <LinearProgress />}
      <Grid container p={1} spacing={2}>
        <Grid item lg={3} xs={12}>
          <Paper elevation={3} sx={{ p: 1 }}>
            <form style={{ display: "flex", alignItems: "center" }}>
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
                color="secondary"
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
            <Typography variant="h4" color="initial">
              <Chip
                label={fetchData?.data?.userInfo?.UserName}
                variant="outlined"
                icon={<FaceIcon />}
              />
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
                      {fetchData?.data?.userInfo?.UserID}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>
                      {fetchData?.data?.userInfo?.UserEmail}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Registeration Date</TableCell>
                    <TableCell>
                      {fetchData?.data?.userInfo?.RegisteredDate}
                    </TableCell>
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
                rows={rows}
                columns={columns}
                fullWidth
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </Paper>
          </Grid>
          {/* Transaction History */}
        </Grid>
      )}
    </Box>
  );
}

export default DashBoard;
