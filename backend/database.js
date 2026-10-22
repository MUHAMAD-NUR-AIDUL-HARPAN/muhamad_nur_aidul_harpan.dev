import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to SQLite database (this will create portfolio.db if it doesn't exist)
const dbPath = path.resolve(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create certificates table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS certificates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        issuer TEXT,
        date TEXT,
        image TEXT,
        link TEXT,
        category TEXT DEFAULT 'Lainnya'
      )`);

  // Attempt to add category column if it doesn't exist (for existing databases)
  db.run(`ALTER TABLE certificates ADD COLUMN category TEXT DEFAULT 'Lainnya'`, (err) => {
    // Ignored
  });

  // Create Projects Table
  db.run(`CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        image TEXT,
        tech TEXT,
        desc TEXT,
        link TEXT,
        github TEXT
      )`);
});

export default db;
