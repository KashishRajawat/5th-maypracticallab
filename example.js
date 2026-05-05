function addResult(students) {
  return students.map(student => ({
    ...student,
    result: student.marks >= 50 ? 'Pass' : 'Fail'
  }));
}

const myStudents = [
  { name: 'Aman', marks: 80 },
  { name: 'Riya', marks: 45 },
  { name: 'john', marks: 60 }
];

const results = addResult(myStudents);

console.log('Example 1: Simple Array Processing');
console.table(results);

function generateHTMLTable(students) {
  let html = `
    <table border="1" style="border-collapse: collapse; width: 100%;">
      <tr>
        <th>Name</th>
        <th>Marks</th>
        <th>Result</th>
      </tr>
  `;
  students.forEach(student => {
    html += `
      <tr>
        <td>${student.name}</td>
        <td>${student.marks}</td>
        <td style="color: ${student.result === 'Pass' ? 'green' : 'red'};">
          ${student.result}
        </td>
      </tr>
    `;
  });
  html += `</table>`;
  return html;
}

console.log('\n\nExample 2: HTML Table\n');
console.log(generateHTMLTable(results));

function getPassedStudents(students) {
  return students.filter(s => s.result === 'Pass').sort((a, b) => b.marks - a.marks);
}

function getFailedStudents(students) {
  return students.filter(s => s.result === 'Fail');
}

console.log('\n\nExample 3: Filter Passed Students\n');
console.table(getPassedStudents(results));
console.log('\n\nExample 4: Filter Failed Students\n');
console.table(getFailedStudents(results));
