import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

export type Student = {
  _id: string;
  name: string;
  email: string;
  age: number;
  course: string;
  createdAt?: string;
  updatedAt?: string;
};

export type StudentPayload = Omit<Student, "_id" | "createdAt" | "updatedAt">;

export const studentsApi = {
  list: async () => (await api.get<{ data: Student[] }>("/students")).data.data,
  one: async (id: string) =>
    (await api.get<{ data: Student }>(`/students/${id}`)).data.data,
  create: async (student: StudentPayload) =>
    (await api.post("/students", student)).data,
  update: async (id: string, student: StudentPayload) =>
    (await api.put(`/students/${id}`, student)).data,
  remove: async (id: string) => (await api.delete(`/students/${id}`)).data,
};
