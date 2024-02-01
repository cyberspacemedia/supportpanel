import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Divider,
  LinearProgress,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { apiURL, config } from "../Config/ApiConfig";

function TodaysClicks() {
  const [loading, setLoading] = useState(false);
  const endpoint = `${apiURL}/todayClicks`;
  const [records, setRecords] = useState(false);
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const clicklog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoint, config);
        //console.log(response.data.data.clickLog);
        setLoading(false);
        setRecords(true);
        setOrders(response.data.data.clickLog)
      } catch (error) {
        console.error("API Error", error);
      }
    };

    clicklog();
  }, [endpoint]);

  const columns = [
    { field: "uid", headerName: "UID", width: 400, sortable: true },
    { field: "total_clicks_count", headerName: "Total Clicks", width: 300, sortable: true, type: 'number' },
    {
      field: "action",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{ height: "25px" }}
          >
            Go To Application
          </Button>
        </>
      ),
    },
  ];
  

  const skeletonData = Array(10).fill(null);

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Typography variant="h4">Todays Clicks</Typography>
      <Typography variant="h6">Active Clicklog of all users</Typography>
      <Divider />
      {loading && (
        <>
          <LinearProgress />
          <Divider />
          {skeletonData.map((_, index) => (
            <Skeleton
              key={index}
              animation="wave"
              height={25}
              variant="rectangular"
              style={{ margin: 5 }}
            />
          ))}
        </>
      )}

      {records && (
        <DataGrid
          rows={orders || []}
          columns={columns}
          fullWidth
          getRowId={(row) => row.uid}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
            sorting:{
                sortModel:[{field:'total_clicks_count',sort:'asc'}]}
          }}
          pageSizeOptions={[10, 20, 30]}
          rowHeight={35}
          sx={{
            fontSize: "12px",
            padding: "0px",
            margin: "0px",
          }}
        />
      )}
    </Box>
  );
}

export default TodaysClicks;
