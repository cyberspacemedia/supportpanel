import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { apiURL, config } from "../../Config/ApiConfig";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

function ApiContent1() {
  const [loading, setLoading] = useState(false);
  const [recordSet, setRecordSet] = useState(false);
  const userEndpoint = `${apiURL}/searchUser`;
  console.log("Component Rendering...");
  
  const loadContent = useCallback(async () => {
    const data = {
      id: "harkesh.sain@gmail.com",
    };
    setLoading(true);
    try {
      const response = await axios.post(userEndpoint, data, config);
      console.log(response);
      setLoading(false);
      setRecordSet(true);
    } catch (error) {
      setLoading(false);
      setRecordSet(false);
      console.error("API Error", error);
    }
  }, [userEndpoint]);

  useEffect(() => {
    const fetchData = async () => {
      await loadContent();
    };

    fetchData();
  }, [loadContent]); // Add loadContent to the dependency array

  return (
    <Box>
      {loading && <LinearProgress />}

      {recordSet && (
        <Typography variant="h4" color="initial">
          Data Loaded
        </Typography>
      )}
    </Box>
  );
}

export default ApiContent1;
