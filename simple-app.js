const mongoose = require('mongoose');


const mongoURI = 'mongodb://localhost:27017/studentDB';


const studentSchema = new mongoose.Schema({
  name: String,
  marks: Number,
  result: String
});

const Student = mongoose.model('Student', studentSchema);

async function runApp() {
  try {
   
    await mongoose.connect(mongoURI);
    console.log('✓ MongoDB connected\n');

    
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

    console.log('========== STUDENT DATA TABLE ==========');
    console.table(savedStudents);
    console.log('========================================\n');

    
    console.log('📊 Result Summary:');
    processedData.forEach(student => {
      const status = student.result === 'Pass' ? '✓' : '✗';
      console.log(`${status} ${student.name}: ${student.marks} marks - ${student.result}`);
    });

   
    await mongoose.connection.close();
    console.log('\n✓ Connection closed');

  } catch (error) {
    console.error('Error:', error.message);
  }
}


runApp();
