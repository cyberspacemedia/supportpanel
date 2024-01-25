import React from 'react';
import CustomTheme from './Config/CustomTheme';
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import SideMenu from "./Navigation/SideMenu";

function App() {
  return (
    <>
    <CustomTheme>
      <CssBaseline />
      <BrowserRouter>
        <SideMenu />
      </BrowserRouter>
      </CustomTheme>
    </>
  );
}

export default App;
