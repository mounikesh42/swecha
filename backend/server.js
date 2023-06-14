const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// Create a SQLite database connection
// file name server.js

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const db = new sqlite3.Database('mydatabase.db'); // You can change the path to a file-based database if needed

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS people (name TEXT, age INTEGER)');
});
        


app.post('/people', (req, res) => {
  const { name, age } = req.body;
  db.run('INSERT INTO people (name, age) VALUES (?, ?)', [name, age],

  function (err) {
    if (err) {
      console.error('Failed to create person', err);
      res.status(500).json({ error: 'Failed to create person' });
    } else {
      const person = { name, age };
      person.id = this.lastID;
      res.status(201).json(person);
    }
  }
  );
});



// app.get('/people', (req, res) => {
//   db.all('SELECT * FROM people', (err, rows) => {
//     if (err) {
//       console.log('Failed to get people', err);
//       res.status(500).json({ error: 'Failed to get people' });
//     } else {
//       res.json(rows);
//     }
//   });
// });


app.get('/people', (req, res) => {
  db.all('SELECT rowid as id, * FROM people', (err, rows) => {
    if (err) {
      console.log('Failed to get people', err);
      res.status(500).json({ error: 'Failed to get people' });
    } else {
      res.json(rows);
    }
  });
});


app.delete('/people/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM people WHERE rowid = ?', id, function (err) {
      if (err) {
        console.error('Failed to delete person', err);
        res.status(500).json({ error: 'Failed to delete person' });
      } else {
        res.sendStatus(204);
      }
    });
  });



  app.put('/people/:id', (req, res) => {
    const id = req.params.id;
    const { name, age } = req.body;
  
    db.run('UPDATE people SET name = ?, age = ? WHERE rowid = ?', [name, age, id], function (err) {
      if (err) {
        console.error('Failed to update person', err);
        res.status(500).json({ error: 'Failed to update person' });
      } else {
        res.sendStatus(204);
      }
    });
  });
  

const port = 4000;
app.listen(port, () => 
{
  console.log(`Server listening on port ${port}`);
});












