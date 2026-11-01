import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Paper, Grid, TextField, Stack, Button, CircularProgress } from "@mui/material";
import { studentsApi, StudentPayload } from "../api";
import { studentValidationSchema } from "../services/validation/student.validation";
import { ValidationError } from "yup";
import PageTitle from "../components/common/PageTitle";
import type { Notice } from "../components/common/Notice";
const empty: StudentPayload = { name: "", email: "", age: 18, course: "" };
export default function StudentFormPage({
  edit,
  notify,
}: {
  edit: boolean;
  notify: (n: Notice) => void;
}) {
  const { id } = useParams(),
    nav = useNavigate();
  const [form, setForm] = useState<StudentPayload>(empty),
    [loading, setLoading] = useState(edit),
    [saving, setSaving] = useState(false),
    [errors, setErrors] = useState<
      Partial<Record<keyof StudentPayload, string>>
    >({});
  useEffect(() => {
    if (!edit || !id) return;
    studentsApi
      .one(id)
      .then((s) =>
        setForm({ name: s.name, email: s.email, age: s.age, course: s.course }),
      )
      .catch((e) =>
        notify({
          severity: "error",
          message: e.response?.data?.message || "Could not load student",
        }),
      )
      .finally(() => setLoading(false));
  }, [edit, id, notify]);
  const change = (key: keyof StudentPayload, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    try {
      const validated = await studentValidationSchema.validate(form, {
        abortEarly: false,
        stripUnknown: true,
      });
      setSaving(true);
      if (edit && id) await studentsApi.update(id, validated);
      else await studentsApi.create(validated);
      notify({
        severity: "success",
        message: edit
          ? "Student updated successfully"
          : "Student created successfully",
      });
      nav("/students");
    } catch (e: any) {
      if (e instanceof ValidationError) {
        const next: Partial<Record<keyof StudentPayload, string>> = {};
        e.inner.forEach((error) => {
          if (error.path && !next[error.path as keyof StudentPayload])
            next[error.path as keyof StudentPayload] = error.message;
        });
        setErrors(next);
      } else {
        notify({
          severity: "error",
          message:
            e.response?.data?.message ||
            "Save failed. Check required fields and API.",
        });
      }
    } finally {
      setSaving(false);
    }
  };
  if (loading) return <CircularProgress />;
  return (
    <>
      <PageTitle
        eyebrow="STUDENT FORM"
        title={edit ? "Edit student" : "Add student"}
        desc="Yup validates fields in the frontend; Joi validates them again on the API."
      />
      <Paper className="panel" component="form" onSubmit={submit} noValidate>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Full name"
              required
              fullWidth
              value={form.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) => change("name", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email address"
              type="email"
              required
              fullWidth
              value={form.email}
              error={!!errors.email}
              helperText={errors.email}
              onChange={(e) => change("email", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Age"
              type="number"
              required
              fullWidth
              inputProps={{ min: 1, max: 120 }}
              value={form.age}
              error={!!errors.age}
              helperText={errors.age}
              onChange={(e) =>
                change(
                  "age",
                  e.target.value === "" ? "" : Number(e.target.value),
                )
              }
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Course"
              required
              fullWidth
              value={form.course}
              error={!!errors.course}
              helperText={errors.course}
              onChange={(e) => change("course", e.target.value)}
            />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end" gap={1} mt={3}>
          <Button onClick={() => nav("/students")}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? "Saving…" : edit ? "Update student" : "Create student"}
          </Button>
        </Stack>
      </Paper>
    </>
  );
}
