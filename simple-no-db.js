// ========== SUPER SIMPLE VERSION ==========
// Run this without MongoDB server (just stores in memory)
// node simple-no-db.js


const students = [
  { name: "Aman", marks: 80 },
  { name: "Riya", marks: 45 },
  { name: "john", marks: 60 }
];


const studentsWithResult = students.map(student => {
  return {
    name: student.name,
    marks: student.marks,
    result: student.marks >= 50 ? 'Pass' : 'Fail'
  };
});


console.log('\n========== STUDENT RESULTS ==========\n');
console.table(studentsWithResult);


console.log('\n========== DETAILED VIEW ==========\n');
studentsWithResult.forEach(student => {
  const status = student.result === 'Pass' ? '✓ PASS' : '✗ FAIL';
  console.log(`${student.name.padEnd(10)} | Marks: ${student.marks} | ${status}`);
});

console.log('\n=====================================\n');


const passCount = studentsWithResult.filter(s => s.result === 'Pass').length;
const failCount = studentsWithResult.filter(s => s.result === 'Fail').length;

console.log(`Total Students: ${studentsWithResult.length}`);
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);
console.log(`Pass Percentage: ${((passCount / studentsWithResult.length) * 100).toFixed(2)}%\n`);
