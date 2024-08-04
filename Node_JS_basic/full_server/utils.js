const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n');
      const headers = lines[0].split(',');
      const students = lines.slice(1).map(line => line.split(','));

      const fields = {};
      students.forEach(student => {
        const field = student[headers.indexOf('field')];
        const firstName = student[headers.indexOf('firstname')];

        if (!fields[field]) fields[field] = [];
        fields[field].push(firstName);
      });

      resolve(fields);
    });
  });
}

module.exports = { readDatabase };
