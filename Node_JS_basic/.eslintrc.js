const fs = require('fs');

function countStudents(path) {
  let content;

  try {
    content = fs.readFileSync(path, 'utf-8');
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  content = content.toString().trim().split('\n');

  if (content.length <= 1) {
    console.log('Number of students: 0');
    return;
  }

  const students = content.slice(1).map((line) => line.split(','));
  const NUMBER_OF_STUDENTS = students.length;
  console.log(`Number of students: ${NUMBER_OF_STUDENTS}`);

  const fields = {};

  for (const student of students) {
    if (student.length < 4) continue; // Skip invalid entries

    const field = student[3];
    if (!fields[field]) {
      fields[field] = [];
    }
    fields[field].push(student[0]);
  }

  for (const [field, studentNames] of Object.entries(fields)) {
    console.log(
      `Number of students in ${field}: ${studentNames.length}. List: ${studentNames.join(', ')}`,
    );
  }
}

module.exports = countStudents;
