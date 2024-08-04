const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function readDatabase(callback) {
  const results = [];
  const filePath = path.join(__dirname, '../database.csv');
  
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      callback(results);
    });
}

module.exports = readDatabase;
