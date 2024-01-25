import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CustomTheme = ({ children }) => {
  // Define your custom theme
  const theme = createTheme({
    typography: {
      h6: {
        fontSize: "12px",
      },
      h5: {
        fontSize: "14px",
      },
      h4: {
        fontSize: "18px",
      },
    },
    components: {
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: "white",
            fontSize: "12px",
          },
          secondary: {
            color: "#d2dee4",
            fontSize: "10px",
          },
        },
      },
      MuiTableCell:{
        styleOverrides:{
            root:{
                padding:'10px',
                fontSize:'14px',
                
            }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: "black",
            fontSize: "14px",
            width:'100%'
          },
        },
      },
      MuiInputLabel:{
        styleOverrides:{
            root:{
                color:'Gray',
                fontSize:'12px'
            }
        }
      },
      MuiFormHelperText:{
        styleOverrides:{
            root:{
                color:'red',
            }
        }
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomTheme;
