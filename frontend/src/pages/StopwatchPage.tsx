import React, { useCallback, useEffect, useRef, useState } from "react";
import { Typography, Box, Paper, Button, Stack } from "@mui/material";
import { PlayArrowRounded, PauseRounded, RestartAltRounded } from "@mui/icons-material";
import PageTitle from "../components/common/PageTitle";
export default function StopwatchPage() {
  const [elapsed, setElapsed] = useState(0),
    [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null),
    startRef = useRef(0),
    elapsedRef = useRef(0);
  const tick = useCallback(
    () => setElapsed(elapsedRef.current + Date.now() - startRef.current),
    [],
  );
  const start = useCallback(() => {
    if (timerRef.current !== null) return;
    startRef.current = Date.now();
    timerRef.current = window.setInterval(tick, 250);
    setRunning(true);
  }, [tick]);
  const pause = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
      elapsedRef.current += Date.now() - startRef.current;
      setElapsed(elapsedRef.current);
      setRunning(false);
    }
  }, []);
  const reset = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = null;
    elapsedRef.current = 0;
    startRef.current = 0;
    setElapsed(0);
    setRunning(false);
  }, []);
  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
    },
    [],
  );
  const seconds = Math.floor(elapsed / 1000),
    hh = String(Math.floor(seconds / 3600)).padStart(2, "0"),
    mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0"),
    ss = String(seconds % 60).padStart(2, "0");
  return (
    <>
      <PageTitle
        eyebrow="PART B · useRef"
        title="Stopwatch"
        desc="The interval ID lives in a ref, so renders don't reset the timer."
      />
      <Paper className="timer-panel">
        <Box className="timer-orb">
          <Typography className="timer-display">
            {hh}:{mm}:{ss}
          </Typography>
          <Typography color="text.secondary">
            {running ? "STOPWATCH RUNNING" : "READY WHEN YOU ARE"}
          </Typography>
        </Box>
        <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
          <Button
            size="large"
            variant="contained"
            startIcon={<PlayArrowRounded />}
            onClick={start}
            disabled={running}
          >
            Start
          </Button>
          <Button
            size="large"
            variant="outlined"
            startIcon={<PauseRounded />}
            onClick={pause}
            disabled={!running}
          >
            Pause
          </Button>
          <Button
            size="large"
            color="inherit"
            startIcon={<RestartAltRounded />}
            onClick={reset}
          >
            Reset
          </Button>
        </Stack>
        <Typography color="text.secondary" textAlign="center" mt={3}>
          useRef stores timer ID and accumulated elapsed time between renders.
        </Typography>
      </Paper>
    </>
  );
}
