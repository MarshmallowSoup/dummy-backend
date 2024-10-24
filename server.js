const express = require('express');
const http = require('http');
const fs = require('fs');
const { execSync } = require('child_process');
const mysql = require('mysql2/promise'); // Import promise version of mysql2

// Create a promise-based MySQL connection
let con;

async function initDbConnection() {
  try {
    con = await mysql.createConnection({
      host: "mysql.default.svc.cluster.local",
      user: "vlysetskyi",
      password: "1234567890",
      database: 'VIS'
    });
    console.log("Connected to MySQL database");
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
}

class HandlerGenerator {
  async get_labs_count(req, res) {
    try {
      const [rows, fields] = await con.query('SELECT * FROM my_labs');
      res.json({
        count: rows.length
      });
    } catch (err) {
      console.error('Error querying database:', err);
      res.status(500).send('Database query error');
    }
  }
}

async function main() {
  await initDbConnection(); // Initialize the DB connection first
  
  let app = express();
  let handlers = new HandlerGenerator();
  const port = process.env.PORT || 8000;
  
  app.get('/get_labs_count', (req, res) => handlers.get_labs_count(req, res));
  
  var server = http.createServer(app);
  server.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main().catch(err => {
  console.error('Failed to start server:', err);
});