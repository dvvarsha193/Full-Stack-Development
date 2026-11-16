import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Application-Level Middleware (Logger)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// In-memory patient dataset matching React Rendering Lists
let patients = [
  { id: 1, name: "John Doe", age: 30, gender: "male", ward: "A" },
  { id: 2, name: "Jane Smith", age: 25, gender: "female", ward: "B" },
  { id: 3, name: "Alice Johnson", age: 40, gender: "female", ward: "C" }
];

// 3. Route-Specific Middleware (Authentication / Verification)
const authenticate = (req, res, next) => {
  console.log("Authentication middleware executed for route:", req.path);
  next();
};

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Express Middleware Patients API is running",
    endpoints: {
      getPatients: "GET /api/v1/patients",
      getPatientById: "GET /api/v1/patients/:id",
      createPatient: "POST /api/v1/patients",
      updatePatient: "PUT /api/v1/patients/:id",
      deletePatient: "DELETE /api/v1/patients/:id"
    }
  });
});

// GET /api/v1/patients - Get all patients (uses route-specific middleware)
app.get("/api/v1/patients", authenticate, (req, res) => {
  const ward = req.query.ward;
  let result = patients;
  if (ward) {
    result = result.filter(p => p.ward.toLowerCase() === ward.toLowerCase());
  }
  res.status(200).json({
    message: "Patients fetched successfully",
    count: result.length,
    data: result
  });
});

// GET /api/v1/patients/:id - Get patient by ID
app.get("/api/v1/patients/:id", (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) {
    const error = new Error(`Patient with ID ${req.params.id} not found`);
    error.status = 404;
    throw error;
  }
  res.status(200).json({
    message: "Patient details fetched successfully",
    data: patient
  });
});

// POST /api/v1/patients - Create a new patient
app.post("/api/v1/patients", (req, res) => {
  const { name, age, gender, ward } = req.body;
  if (!name || !age || !gender || !ward) {
    const error = new Error("name, age, gender, and ward are all required");
    error.status = 400;
    throw error;
  }
  const nextId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
  const newPatient = { id: nextId, name, age: Number(age), gender, ward };
  patients.push(newPatient);
  res.status(201).json({
    message: "Patient registered successfully",
    data: newPatient
  });
});

// PUT /api/v1/patients/:id - Update patient
app.put("/api/v1/patients/:id", (req, res) => {
  const index = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    const error = new Error(`Patient with ID ${req.params.id} not found`);
    error.status = 404;
    throw error;
  }
  patients[index] = { ...patients[index], ...req.body, id: patients[index].id };
  res.status(200).json({
    message: "Patient updated successfully",
    data: patients[index]
  });
});

// DELETE /api/v1/patients/:id - Delete patient
app.delete("/api/v1/patients/:id", (req, res) => {
  const index = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    const error = new Error(`Patient with ID ${req.params.id} not found`);
    error.status = 404;
    throw error;
  }
  const deleted = patients.splice(index, 1)[0];
  res.status(200).json({
    message: "Patient deleted successfully",
    data: deleted
  });
});

// 4. 404 Route Not Found Middleware
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// 5. Centralized Error-Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error encountered:", err.message);
  const status = err.status || 500;
  res.status(status).json({
    error: true,
    message: err.message || "Internal Server Error"
  });
});

app.listen(PORT, () => {
  console.log(`Express Middleware Server running on http://localhost:${PORT}`);
});


export default app;
