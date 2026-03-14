import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'mock-data.json');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/users', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading mock data:', error);
    res.status(500).json({ error: 'Failed to read users' });
  }
});

app.post('/api/users', (req, res) => {
  try {
    const newUser = req.body;
    
    // Validate basics
    if (!newUser || !newUser.email) {
      return res.status(400).json({ error: 'Invalid user data' });
    }

    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const db = JSON.parse(data);

    // Check for duplicates
    const exists = db.users.some(
      (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (exists) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    // Add user and save
    db.users.push(newUser);
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error('Error writing to mock data:', error);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`JSON Mock Server is running on http://localhost:${PORT}`);
  console.log(`Listening for GET and POST requests at /api/users`);
});
