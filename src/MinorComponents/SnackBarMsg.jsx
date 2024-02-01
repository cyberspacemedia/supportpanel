import React, { useState, useEffect } from "react";

import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function SnackBarMsg({ snackBarSeverity, showSnackBar, snackBarMessage }) {
  const [open, setOpen] = useState(showSnackBar);

  useEffect(() => {
    setOpen(showSnackBar);
  }, [showSnackBar]);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackBarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
