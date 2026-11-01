import React, { useCallback, useMemo, useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Stack,
  TextField,
  MenuItem,
  Chip,
  Card,
  CardContent,
  Grid,
  Alert,
  Divider,
} from "@mui/material";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import PageTitle from "../components/common/PageTitle";
import InfoRow from "../components/common/InfoRow";

export default function OptimizerPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "Developer",
    plan: "Standard",
    quantity: 1,
    hourlyRate: 40,
    hours: 8,
    discount: 0,
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const total = useMemo(
    () =>
      Math.max(
        0,
        form.quantity *
          form.hourlyRate *
          form.hours *
          (1 - form.discount / 100),
      ),
    [form.quantity, form.hourlyRate, form.hours, form.discount],
  );

  const update = useCallback(
    (key: keyof typeof form, value: string | number) => {
      setForm((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  // useCallback: Log form details when the user submits.
  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log("Total Calculated:", total);

      console.log("Full Form Data:", form);

      setSubmitted(true);
    },
    [form, total],
  );

  const fields: [string, keyof typeof form, string][] = [
    ["Full name", "name", "text"],
    ["Email address", "email", "email"],
    ["Phone", "phone", "tel"],
    ["Company", "company", "text"],
  ];

  return (
    <>
      <PageTitle
        eyebrow="PART A · useMemo + useCallback"
        title="Large Form Optimizer"
        desc="A multi-field form with memoized calculations."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper className="panel" component="form" onSubmit={submit}>
            <Typography variant="h6" fontWeight={800} mb={2}>
              Contact & project details
            </Typography>

            <Grid container spacing={2}>
              {fields.map(([label, key, type]) => (
                <Grid key={key} size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label={label}
                    type={type}
                    value={form[key]}
                    onChange={(e) => update(key, e.target.value)}
                    required={key === "name" || key === "email"}
                  />
                </Grid>
              ))}

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Role"
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                >
                  {["Developer", "Designer", "Manager", "Student", "Other"].map(
                    (role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ),
                  )}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Plan"
                  value={form.plan}
                  onChange={(e) => update("plan", e.target.value)}
                >
                  {["Basic", "Standard", "Premium", "Enterprise"].map(
                    (plan) => (
                      <MenuItem key={plan} value={plan}>
                        {plan}
                      </MenuItem>
                    ),
                  )}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      min: 1,
                    },
                  }}
                  value={form.quantity}
                  onChange={(e) =>
                    update("quantity", Math.max(1, Number(e.target.value)))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Hourly rate"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                  }}
                  value={form.hourlyRate}
                  onChange={(e) =>
                    update("hourlyRate", Math.max(0, Number(e.target.value)))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Hours"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                  }}
                  value={form.hours}
                  onChange={(e) =>
                    update("hours", Math.max(0, Number(e.target.value)))
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Discount (%)"
                  type="number"
                  slotProps={{
                    htmlInput: {
                      min: 0,
                      max: 100,
                    },
                  }}
                  value={form.discount}
                  onChange={(e) =>
                    update(
                      "discount",
                      Math.min(100, Math.max(0, Number(e.target.value))),
                    )
                  }
                />
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent="flex-end" mt={2}>
              <Button variant="contained" type="submit">
                Submit form
              </Button>
            </Stack>

            {submitted && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Form submitted locally. Total calculated:{" "}
                <CurrencyRupeeIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle" }}
                />
                {total.toFixed(2)}
              </Alert>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="summary-card">
            <CardContent>
              <Typography className="eyebrow">MEMOIZED TOTAL</Typography>

              <Typography
                variant="h3"
                fontWeight={900}
                my={1}
                display="flex"
                alignItems="center"
              >
                <CurrencyRupeeIcon fontSize="inherit" />
                {total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>

              <Typography color="text.secondary">
                Updates from quantity, rate, hours and discount.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>
                <InfoRow label="Plan" value={form.plan} />

                <InfoRow label="Quantity" value={String(form.quantity)} />

                <InfoRow
                  label="Subtotal"
                  value={(form.quantity * form.hourlyRate * form.hours).toFixed(
                    2,
                  )}
                />

                <InfoRow label="Discount" value={`${form.discount}%`} />
              </Stack>

              <Chip
                color="success"
                label="useMemo · useCallback"
                sx={{ mt: 3 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
