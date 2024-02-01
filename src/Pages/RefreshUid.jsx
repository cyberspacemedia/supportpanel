import React, { useState } from "react";
import axios from "axios";
import { apiURL, apiKey } from "../Config/ApiConfig";
import LinearProgress from "@mui/material/LinearProgress";
import SnackBarMsg from "../MinorComponents/SnackBarMsg";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

function RefreshUid() {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-api-key": `${apiKey}`,
    },
  };
  const endpoint = `${apiURL}/deleteTodayClickLogs`;
  const [uid, setUid] = useState("");
  const [snackbarKey, setSnackbarKey] = useState(0); // State Key for SnackBar
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = useState("");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSearch = async (event) => {
    event.preventDefault();
    const data = {
      uid: uid,
    };
    setLoading(true);
    try {
      const response = await axios.post(endpoint, data, config);
      //console.log(response.data);
      setLoading(false);
      setShowSnackBar(true);
      setSnackBarSeverity("success");
      setSnackBarMessage(response.data.message);
      setSnackbarKey((prevKey) => prevKey + 1);
      setUid("");
    } catch (error) {
      setSnackbarKey((prevKey) => prevKey + 1);
      setShowSnackBar(true);
      setSnackBarSeverity("error");

      //console.error("API Error", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // other than 2xx.
        //console.error("API Error - Response Data:", error.response.data);
        setSnackBarMessage("API Error: " + error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received.
        //console.error("API Error - No Response:", error.request);
        setSnackBarMessage("API Error: No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error.
        //console.error("API Error:", error.message);
        setSnackBarMessage("API Error: " + error.message);
      }
      setLoading(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Typography variant="h4">Refrest UID</Typography>
      <Typography variant="h6">Reset Stats by UID</Typography>
      <Divider />
      {loading && <LinearProgress />}
      <SnackBarMsg
        showSnackBar={showSnackBar}
        snackBarSeverity={snackBarSeverity}
        snackBarMessage={snackBarMessage}
        key={snackbarKey}
      />
      <Grid container p={1} spacing={2}>
        <Grid item lg={12} xs={12}>
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
                  label="Enter Uid"
                  value={uid}
                  onChange={(e) => {
                    setUid(e.target.value);
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
                size="large"
                startIcon={<SearchIcon />}
              >
                Refresh
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item lg={12} xs={12}>
        <Divider />
        <Paper elevation={3}>

        </Paper>
        </Grid>
      </Grid>
      
     
    </Box>
  );
}

export default RefreshUid;
