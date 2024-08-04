const { readDatabase } = require('../utils');

class StudentsController {
  static getAllStudents(req, res) {
    const dbPath = process.argv[2];

    readDatabase(dbPath)
      .then((fields) => {
        let responseText = 'This is the list of our students\n';
        for (const [field, students] of Object.entries(fields).sort()) {
          responseText += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
        }
        res.status(200).send(responseText.trim());
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }

  static getAllStudentsByMajor(req, res) {
    const dbPath = process.argv[2];
    const { major } = req.params;

    if (!['CS', 'SWE'].includes(major)) {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(dbPath)
      .then((fields) => {
        if (fields[major]) {
          res.status(200).send(`List: ${fields[major].join(', ')}`);
        } else {
          res.status(200).send('List: ');
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  }
}

module.exports = StudentsController;
