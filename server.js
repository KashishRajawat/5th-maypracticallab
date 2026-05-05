const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());


const mongoURI = 'mongodb://localhost:27017/studentDB';

mongoose.connect(mongoURI)
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));


const studentSchema = new mongoose.Schema({
  name: String,
  marks: Number,
  result: String
});


const Student = mongoose.model('Student', studentSchema);


app.post('/add-students', async (req, res) => {
  try {
    
    const studentData = [
      { name: "Aman", marks: 80 },
      { name: "Riya", marks: 45 },
      { name: "john", marks: 60 }
    ];

    
    const processedData = studentData.map(student => ({
      ...student,
      result: student.marks >= 50 ? 'Pass' : 'Fail'
    }));

    
    await Student.deleteMany({});

    
    const savedStudents = await Student.insertMany(processedData);

    res.json({
      message: 'Students added successfully',
      data: savedStudents
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();

    
    console.log('\n========== STUDENT DATA TABLE ==========');
    console.table(students);
    console.log('========================================\n');

    res.json({
      message: 'Students fetched successfully',
      total: students.length,
      data: students
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/add-custom-students', async (req, res) => {
  try {
    const { studentArray } = req.body;

    if (!studentArray || !Array.isArray(studentArray)) {
      return res.status(400).json({ error: 'Please provide studentArray as an array' });
    }

    
    const processedData = studentArray.map(student => ({
      name: student.name,
      marks: student.marks,
      result: student.marks >= 50 ? 'Pass' : 'Fail'
    }));

    
    await Student.deleteMany({});
    const savedStudents = await Student.insertMany(processedData);

    console.log('\n========== CUSTOM STUDENT DATA TABLE ==========');
    console.table(savedStudents);
    console.log('==============================================\n');

    res.json({
      message: 'Custom students added successfully',
      data: savedStudents
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/students-html', async (req, res) => {
  try {
    const students = await Student.find();

    let htmlTable = `
    <html>
      <head>
        <style>
          body { font-family: Arial; margin: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid black; padding: 10px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
          .pass { color: green; font-weight: bold; }
          .fail { color: red; font-weight: bold; }
        </style>
      </head>
      <body>
        <h2>Student Results</h2>
        <table>
          <tr>
            <th>Name</th>
            <th>Marks</th>
            <th>Result</th>
          </tr>
    `;

    students.forEach(student => {
      const resultClass = student.result === 'Pass' ? 'pass' : 'fail';
      htmlTable += `
        <tr>
          <td>${student.name}</td>
          <td>${student.marks}</td>
          <td class="${resultClass}">${student.result}</td>
        </tr>
      `;
    });

    htmlTable += `
        </table>
      </body>
    </html>
    `;

    res.send(htmlTable);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/clear-students', async (req, res) => {
  try {
    const result = await Student.deleteMany({});
    res.json({ message: 'All students deleted', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log('📝 Available endpoints:');
  console.log('   POST /add-students - Add sample students');
  console.log('   GET /students - View all students (JSON)');
  console.log('   POST /add-custom-students - Add custom student data');
  console.log('   GET /students-html - View students in HTML table');
  console.log('   DELETE /clear-students - Delete all students\n');
});
