import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PageviewIcon from "@mui/icons-material/Pageview";
import ResetTvIcon from '@mui/icons-material/ResetTv';
import AdsClickIcon from '@mui/icons-material/AdsClick';

// Images
import logo from "../Images/WhiteLogo.png";

// Pages
import DashBoard from "../Pages/DashBoard";
import SearchUser from "../Pages/SearchUser";
import SearchOrder from "../Pages/SearchOrder";
import RefreshUid from "../Pages/RefreshUid";
import TodaysClicks from "../Pages/TodaysClicks";
import Test from "../Pages/Test";


const drawerWidth = 200;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  height: "65px", // Set the desired height for the AppBar
  backgroundColor: "#152035",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: open ? "#2c4171" : "#2c4171", // Add this line for both open and closed
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#2c4171", // Add this line for open
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#2c4171", // Add this line for closed
    },
  }),
}));

export default function SideMenu() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <img src={logo} alt="Logo" width={150} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h5" color={"white"}>
            Support Panel v1.0
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon
                style={{ color: "white", backgroundColor: "black" }}
              />
            ) : (
              <ChevronLeftIcon
                style={{ color: "white", backgroundColor: "black" }}
              />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {/* List Item 1 */}
          <ListItem
            disablePadding
            sx={{ display: "block", "&:hover": { backgroundColor: "#3f5178" } }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate("/searchuser")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonSearchIcon
                  style={{ color: "gray", backgroundColor: "#2c4171" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Search User"
                secondary="by email / uid"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* List Item 1 */}

          {/* List Item Search Order */}
          <ListItem
            disablePadding
            sx={{ display: "block", "&:hover": { backgroundColor: "#3f5178" } }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate("/searchorder")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PageviewIcon
                  style={{ color: "gray", backgroundColor: "#2c4171" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Search Order"
                secondary="by Order Number"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* List Item Searc Order */}

          {/* List Item Refresh UID */}
          <ListItem
            disablePadding
            sx={{ display: "block", "&:hover": { backgroundColor: "#3f5178" } }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate("/refreshuid")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ResetTvIcon
                  style={{ color: "gray", backgroundColor: "#2c4171" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Refresh Stats"
                secondary="by UID"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* List Item Refresh UID */}

           {/* List Item Todays Clicks */}
           <ListItem
            disablePadding
            sx={{ display: "block", "&:hover": { backgroundColor: "#3f5178" } }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate("/todaysclicks")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AdsClickIcon
                  style={{ color: "gray", backgroundColor: "#2c4171" }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Todays Clicks"
                secondary="Sort By UID"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          {/* List Item Todays Clicks */}

        </List>
        <Divider />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 1, bgcolor: "#eceff4" }}>
        <DrawerHeader />
        
        <Routes>
          <Route path="/" index element={<DashBoard />} />
          <Route path="/searchuser" element={<SearchUser />} />
          <Route path="/searchorder" element={<SearchOrder />} />
          <Route path="/refreshuid" element={<RefreshUid />} />
          <Route path="/todaysclicks" element={<TodaysClicks />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Box>
    </Box>
  );
}
