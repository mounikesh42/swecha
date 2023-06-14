app.get('/people', (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;

  db.all('SELECT * FROM people LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
    if (err) {
      console.log('Failed to get people', err);
      res.status(500).json({ error: 'Failed to get people' });
    } else {
      res.json(rows);
    }
  });
});






app.get('/people', (req, res) => {
  const minAge = req.query.minAge || 0;
  const maxAge = req.query.maxAge || 100;

  db.all('SELECT * FROM people WHERE age BETWEEN ? AND ?', [minAge, maxAge], (err, rows) => {
    if (err) {
      console.log('Failed to get people', err);
      res.status(500).json({ error: 'Failed to get people' });
    } else {
      res.json(rows);
    }
  });
});




