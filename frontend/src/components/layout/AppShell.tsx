import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Button,
  Stack,
} from "@mui/material";
import {
  DashboardRounded,
  TimerRounded,
  SchoolRounded,
} from "@mui/icons-material";
export default function AppShell({ children }: { children: React.ReactNode }) {
  const loc = useLocation();
  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ maxWidth: 1300, width: "100%", mx: "auto" }}>
          <Box className="brand-mark">ASSIGNMENT3</Box>
          <Typography fontWeight={900} sx={{ flexGrow: 1 }}>
            <span className="brand-sub"></span>
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              component={NavLink}
              to="/"
              color="inherit"
              startIcon={<DashboardRounded />}
            >
              Optimizer
            </Button>
            <Button
              component={NavLink}
              to="/stopwatch"
              color="inherit"
              startIcon={<TimerRounded />}
            >
              Stopwatch
            </Button>
            <Button
              component={NavLink}
              to="/students"
              color="inherit"
              startIcon={<SchoolRounded />}
            >
              CRUD
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
      <Box className="footer">Built with React · TypeScript · MUI · Axios</Box>
    </>
  );
}
