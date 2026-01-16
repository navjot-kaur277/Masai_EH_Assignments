import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;
const DB_FILE = "./db.json";

app.use(express.json());

// Utility: Read DB
const readDB = () => {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
};

// Utility: Write DB
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// ✅ GET all students
app.get("/students", (req, res) => {
  const students = readDB();
  res.json(students);
});

// ✅ GET single student by ID
app.get("/students/:id", (req, res) => {
  const students = readDB();
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// ✅ POST add new student
app.post("/students", (req, res) => {
  const students = readDB();
  const newStudent = req.body;

  if (!newStudent.name || !newStudent.course || !newStudent.year) {
    return res.status(400).json({ message: "Invalid student data" });
  }

  newStudent.id = students.length ? students[students.length - 1].id + 1 : 1;
  students.push(newStudent);
  writeDB(students);

  res
    .status(201)
    .json({ message: "Student added successfully", student: newStudent });
});

// ✅ PUT update student by ID
app.put("/students/:id", (req, res) => {
  const students = readDB();
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[index] = { ...students[index], ...req.body };
  writeDB(students);

  res.json({
    message: "Student updated successfully",
    student: students[index],
  });
});

// ✅ DELETE student by ID
app.delete("/students/:id", (req, res) => {
  const students = readDB();
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deleted = students.splice(index, 1);
  writeDB(students);

  res.json({ message: "Student deleted successfully", student: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
