import React, { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Snackbar,
  Alert,
} from "@mui/material";
import AppShell from "./components/layout/AppShell";
import OptimizerPage from "./pages/OptimizerPage";
import StopwatchPage from "./pages/StopwatchPage";
import StudentListPage from "./pages/StudentListPage";
import StudentFormPage from "./pages/StudentFormPage";
import type { Notice } from "./components/common/Notice";
import "./styles.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#607d8b",
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
});

export default function App() {
  const [notice, setNotice] = useState<Notice | null>(null);

  const notify = useCallback((n: Notice) => {
    setNotice(n);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<OptimizerPage />} />

            <Route path="/stopwatch" element={<StopwatchPage />} />

            <Route
              path="/students"
              element={<StudentListPage notify={notify} />}
            />

            <Route
              path="/students/add"
              element={<StudentFormPage edit={false} notify={notify} />}
            />

            <Route
              path="/students/:id/edit"
              element={<StudentFormPage edit notify={notify} />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>

        <Snackbar
          open={!!notice}
          autoHideDuration={4500}
          onClose={() => setNotice(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert
            onClose={() => setNotice(null)}
            severity={notice?.severity || "info"}
            variant="filled"
          >
            {notice?.message}
          </Alert>
        </Snackbar>
      </BrowserRouter>
    </ThemeProvider>
  );
}
