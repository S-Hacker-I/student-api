const express = require('express');
const app = express();

app.use(express.json());

const students = [];

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Add a new student
app.post('/students', (req, res) => {
  const { id, name } = req.body;
  if (id && name) {
    students.push({ id, name });
    res.status(201).json({ message: 'Student added successfully!' });
  } else {
    res.status(400).json({ message: 'Invalid input' });
  }
});

// Update a student's name
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const student = students.find(s => s.id == id);
  if (student) {
    student.name = name;
    res.json({ message: 'Student updated successfully!' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  const index = students.findIndex(s => s.id == id);
  if (index !== -1) {
    students.splice(index, 1);
    res.json({ message: 'Student deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
