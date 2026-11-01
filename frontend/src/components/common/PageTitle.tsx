import React from "react";
import { Typography, Stack, Box } from "@mui/material";
export default function PageTitle({
  eyebrow,
  title,
  desc,
  action,
}: {
  eyebrow: string;
  title: string;
  desc: string;
  action?: React.ReactNode;
}) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ sm: "center" }}
      justifyContent="space-between"
      gap={2}
      mb={3}
    >
      <Box>
        <Typography className="eyebrow">{eyebrow}</Typography>
        <Typography variant="h4" fontWeight={900} letterSpacing="-1px">
          {title}
        </Typography>
        <Typography color="text.secondary" mt={0.5}>
          {desc}
        </Typography>
      </Box>
      {action}
    </Stack>
  );
}
