import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE        = path.join(__dirname, 'users-data.json');
const RESERVATIONS_FILE = path.join(__dirname, 'reservations-data.json');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ─── USER ROUTES ───────────────────────────────────────────

app.get('/api/users', (req, res) => {
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading users data:', error);
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

    const data = fs.readFileSync(USERS_FILE, 'utf8');
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
    fs.writeFileSync(USERS_FILE, JSON.stringify(db, null, 2), 'utf8');

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error('Error writing to users data:', error);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// ─── RESERVATION ROUTES ────────────────────────────────────

app.get('/api/reservations', (req, res) => {
  try {
    const data = fs.readFileSync(RESERVATIONS_FILE, 'utf8');
    const db = JSON.parse(data);

    const { userId } = req.query;

    if (userId) {
      const filtered = db.reservations.filter((r) => r.userId === userId);
      return res.json({ reservations: filtered });
    }

    res.json(db);
  } catch (error) {
    console.error('Error reading reservations data:', error);
    res.status(500).json({ error: 'Failed to read reservations' });
  }
});

app.post('/api/reservations', (req, res) => {
  try {
    const body = req.body;

    // Validate required fields
    if (!body || !body.userId || !body.email || !body.date || !body.time) {
      return res.status(400).json({ error: 'Missing required reservation fields' });
    }

    const data = fs.readFileSync(RESERVATIONS_FILE, 'utf8');
    const db = JSON.parse(data);

    const newReservation = {
      id:              Date.now().toString(),
      userId:          body.userId,
      firstName:       body.firstName,
      lastName:        body.lastName,
      email:           body.email,
      phone:           body.phone,
      partySize:       body.partySize,
      occasion:        body.occasion,
      date:            body.date,
      time:            body.time,
      specialRequests: body.specialRequests || '',
      submittedAt:     new Date().toISOString(),
      status:          'confirmed',
    };

    db.reservations.push(newReservation);
    fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(db, null, 2), 'utf8');

    res.status(201).json({ success: true, reservation: newReservation });
  } catch (error) {
    console.error('Error writing to reservations data:', error);
    res.status(500).json({ error: 'Failed to save reservation' });
  }
});

// ─── START SERVER ──────────────────────────────────────────

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`JSON Mock Server is running on http://localhost:${PORT}`);
  console.log(`Routes: GET/POST /api/users, GET/POST /api/reservations`);
});
