import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Typography,
  Box,
  Paper,
  Button,
  Stack,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import {
  AddRounded,
  EditRounded,
  DeleteRounded,
  RefreshRounded,
} from "@mui/icons-material";

import { studentsApi, Student } from "../api";
import PageTitle from "../components/common/PageTitle";
import type { Notice } from "../components/common/Notice";

export default function StudentListPage({
  notify,
}: {
  notify: (n: Notice) => void;
}) {
  const [items, setItems] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Confirmation modal state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);

    try {
      setItems(await studentsApi.list());
    } catch (e: any) {
      notify({
        severity: "error",
        message:
          e.response?.data?.message ||
          "Could not load students. Check backend and MongoDB.",
      });
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = items.filter((s) =>
    `${s.name} ${s.email} ${s.course}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const openDeleteDialog = (student: Student) => {
    setSelectedStudent(student);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    if (deleting) return;

    setDeleteDialogOpen(false);
    setSelectedStudent(null);
  };

  const remove = async () => {
    if (!selectedStudent) return;

    setDeleting(true);

    try {
      await studentsApi.remove(selectedStudent._id);

      notify({
        severity: "success",
        message: "Student deleted successfully",
      });

      setDeleteDialogOpen(false);
      setSelectedStudent(null);

      await load();
    } catch (e: any) {
      notify({
        severity: "error",
        message: e.response?.data?.message || "Delete failed",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <PageTitle
        eyebrow="PART C · CRUD + AXIOS"
        title="Student management"
        desc="Connected to Express + MongoDB Student API."
        action={
          <Button
            variant="contained"
            startIcon={<AddRounded />}
            component={NavLink}
            to="/students/add"
          >
            Add student
          </Button>
        }
      />

      <Paper className="panel">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          mb={2}
          gap={2}
        >
          <TextField
            size="small"
            placeholder="Search students…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button startIcon={<RefreshRounded />} onClick={() => void load()}>
            Refresh
          </Button>
        </Stack>

        {loading ? (
          <Box textAlign="center" py={5}>
            <CircularProgress />
          </Box>
        ) : filtered.length === 0 ? (
          <Alert severity="info">
            No students found. Add a student to get started.
          </Alert>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {["Student", "Email", "Age", "Course", "Actions"].map((x) => (
                  <TableCell key={x}>{x}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s._id} hover>
                  <TableCell>
                    <Typography fontWeight={800}>{s.name}</Typography>
                  </TableCell>

                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.age}</TableCell>
                  <TableCell>{s.course}</TableCell>

                  <TableCell>
                    <Stack direction="row">
                      <IconButton
                        component={NavLink}
                        to={`/students/${s._id}/edit`}
                        title="Edit"
                      >
                        <EditRounded />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => openDeleteDialog(s)}
                        title="Delete"
                      >
                        <DeleteRounded />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-student-dialog-title"
        aria-describedby="delete-student-dialog-description"
      >
        <DialogTitle id="delete-student-dialog-title">
          Delete student?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="delete-student-dialog-description">
            Are you sure you want to delete{" "}
            <strong>{selectedStudent?.name}</strong>? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDeleteDialog} disabled={deleting}>
            Cancel
          </Button>

          <Button
            onClick={() => void remove()}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
