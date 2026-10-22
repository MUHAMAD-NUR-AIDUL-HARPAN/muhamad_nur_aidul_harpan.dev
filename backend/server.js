import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadDir));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Get all certificates
app.get('/api/certificates', (req, res) => {
  db.all('SELECT * FROM certificates ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'rahasia123') {
    res.json({ success: true, token: 'admin-token-12345' });
  } else {
    res.status(401).json({ success: false, message: 'Username atau password salah' });
  }
});

// Add a new certificate (now handles file upload and category)
app.post('/api/certificates', upload.single('image'), (req, res) => {
  const { title, issuer, date, link, category } = req.body;
  
  if (!title || !issuer || !date) {
    res.status(400).json({ error: 'Please provide title, issuer, and date' });
    return;
  }

  // If a file was uploaded, use the server path. Otherwise fallback to body.image if provided (for backward compatibility).
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  if (!imageUrl) {
    res.status(400).json({ error: 'Please upload an image' });
    return;
  }

  const certCategory = category || 'Lainnya';
  const certLink = link || '#';

  const query = `INSERT INTO certificates (title, issuer, date, image, link, category) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [title, issuer, date, imageUrl, certLink, certCategory], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, title, issuer, date, image: imageUrl, link: certLink, category: certCategory });
  });
});

// Delete a certificate
app.delete('/api/certificates/:id', (req, res) => {
  const id = req.params.id;
  
  // First find the certificate to delete its image file
  db.get(`SELECT image FROM certificates WHERE id = ?`, id, (err, row) => {
    if (!err && row && row.image && row.image.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, row.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    // Delete from database
    db.run(`DELETE FROM certificates WHERE id = ?`, id, function(deleteErr) {
      if (deleteErr) {
        res.status(500).json({ error: deleteErr.message });
        return;
      }
      res.json({ message: 'Certificate deleted', changes: this.changes });
    });
  });
});


// Get all projects
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    // Parse the tech array back from JSON string if needed, or leave it as text and let frontend parse it
    res.json(rows);
  });
});

// Add a new project
app.post('/api/projects', upload.single('image'), (req, res) => {
  const { title, category, tech, desc, link, github } = req.body;
  
  if (!title || !category) {
    res.status(400).json({ error: 'Please provide title and category' });
    return;
  }

  const imageUrl = req.file ? `/uploads/${req.file.filename}` : (req.body.image || '');

  const query = `INSERT INTO projects (title, category, image, tech, desc, link, github) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [title, category, imageUrl, tech || '', desc || '', link || '', github || ''], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID, title, category, image: imageUrl, tech, desc, link, github });
  });
});

// Delete a project
app.delete('/api/projects/:id', (req, res) => {
  const id = req.params.id;
  
  db.get(`SELECT image FROM projects WHERE id = ?`, id, (err, row) => {
    if (!err && row && row.image && row.image.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, row.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    db.run(`DELETE FROM projects WHERE id = ?`, id, function(deleteErr) {
      if (deleteErr) {
        res.status(500).json({ error: deleteErr.message });
        return;
      }
      res.json({ message: 'Project deleted', changes: this.changes });
    });
  });
});

// Update a certificate
app.put('/api/certificates/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { title, issuer, date, link, category } = req.body;
  
  if (!title || !issuer || !date) {
    res.status(400).json({ error: 'Please provide title, issuer, and date' });
    return;
  }

  const certCategory = category || 'Lainnya';
  const certLink = link || '#';

  db.get(`SELECT image FROM certificates WHERE id = ?`, id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Certificate not found' });

    let imageUrl = row.image;
    
    // If a new file is uploaded
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      // Delete old local file
      if (row.image && row.image.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, row.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    } else if (req.body.image) {
      // If a URL string was provided instead
      imageUrl = req.body.image;
      // Delete old local file if switching from file to URL
      if (row.image && row.image.startsWith('/uploads/') && row.image !== imageUrl) {
        const filePath = path.join(__dirname, row.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    const query = `UPDATE certificates SET title = ?, issuer = ?, date = ?, image = ?, link = ?, category = ? WHERE id = ?`;
    db.run(query, [title, issuer, date, imageUrl, certLink, certCategory, id], function(updateErr) {
      if (updateErr) return res.status(500).json({ error: updateErr.message });
      res.json({ id, title, issuer, date, image: imageUrl, link: certLink, category: certCategory });
    });
  });
});

// Update a project
app.put('/api/projects/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { title, category, tech, desc, link, github } = req.body;
  
  if (!title || !category) {
    res.status(400).json({ error: 'Please provide title and category' });
    return;
  }

  db.get(`SELECT image FROM projects WHERE id = ?`, id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Project not found' });

    let imageUrl = row.image;
    
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
      if (row.image && row.image.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, row.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    } else if (req.body.image) {
      imageUrl = req.body.image;
      if (row.image && row.image.startsWith('/uploads/') && row.image !== imageUrl) {
        const filePath = path.join(__dirname, row.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    const query = `UPDATE projects SET title = ?, category = ?, image = ?, tech = ?, desc = ?, link = ?, github = ? WHERE id = ?`;
    db.run(query, [title, category, imageUrl, tech || '', desc || '', link || '', github || '', id], function(updateErr) {
      if (updateErr) return res.status(500).json({ error: updateErr.message });
      res.json({ id, title, category, image: imageUrl, tech, desc, link, github });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
