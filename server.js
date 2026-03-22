/** server.js - Mock JSON API Server **/
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, "data");
const USERS_FILE = path.join(DATA_DIR, "users-data.json");
const RESERVATIONS_FILE = path.join(DATA_DIR, "reservations-data.json");

const app = express();

// Middleware: CORS & JSON body parsing
app.use(cors());
app.use(express.json());

/** Routes: Users **/

app.get("/api/users", (req, res) => {
  try {
    console.log(`[SERVER] Fetching users from ${USERS_FILE}`);
    if (!fs.existsSync(USERS_FILE)) {
      console.error(`[SERVER] ERROR: ${USERS_FILE} does not exist!`);
    }
    const data = fs.readFileSync(USERS_FILE, "utf8");
    const users = JSON.parse(data);
    console.log(`[SERVER] SUCCESS: Found ${users.users?.length || 0} users.`);
    res.json(users);
  } catch (error) {
    console.error(`[SERVER] ERROR reading users data:`, error);
    res.status(500).json({ error: "Failed to read users" });
  }
});

app.post("/api/users", (req, res) => {
  try {
    const newUser = req.body;

    // Basic payload validation
    if (!newUser || !newUser.email) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    const data = fs.readFileSync(USERS_FILE, "utf8");
    const db = JSON.parse(data);

    // Check for duplicates
    const exists = db.users.some(
      (u) => u.email.toLowerCase() === newUser.email.toLowerCase(),
    );

    if (exists) {
      return res
        .status(409)
        .json({ error: "User with this email already exists." });
    }

    // Persist to local JSON DB
    db.users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(db, null, 2), "utf8");

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error writing to users data:", error);
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.patch("/api/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const data = fs.readFileSync(USERS_FILE, "utf8");
    const db = JSON.parse(data);

    const index = db.users.findIndex((u) => String(u.id) === String(id));
    if (index === -1) {
      console.log(`User ${id} not found in DB`);
      return res.status(404).json({ error: "User not found" });
    }

    // Merge updates
    db.users[index] = { ...db.users[index], ...updates };

    fs.writeFileSync(USERS_FILE, JSON.stringify(db, null, 2), "utf8");
    console.log(`User ${id} updated successfully and saved to ${USERS_FILE}`);

    res.json({ success: true, user: db.users[index] });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

/** Routes: Reservations **/

app.get("/api/reservations", (req, res) => {
  try {
    const data = fs.readFileSync(RESERVATIONS_FILE, "utf8");
    const db = JSON.parse(data);

    const { userId } = req.query;

    if (userId) {
      const filtered = db.reservations.filter((r) => r.userId === userId);
      return res.json({ reservations: filtered });
    }

    res.json(db);
  } catch (error) {
    console.error("Error reading reservations data:", error);
    res.status(500).json({ error: "Failed to read reservations" });
  }
});

app.post("/api/reservations", (req, res) => {
  try {
    const body = req.body;

    // Validate required fields
    if (!body || !body.userId || !body.email || !body.date || !body.time) {
      return res
        .status(400)
        .json({ error: "Missing required reservation fields" });
    }

    const data = fs.readFileSync(RESERVATIONS_FILE, "utf8");
    const db = JSON.parse(data);

    const newReservation = {
      id: Date.now().toString(),
      userId: body.userId,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      partySize: body.partySize,
      occasion: body.occasion,
      date: body.date,
      time: body.time,
      specialRequests: body.specialRequests || "",
      submittedAt: new Date().toISOString(),
      status: "confirmed",
    };

    db.reservations.push(newReservation);
    fs.writeFileSync(RESERVATIONS_FILE, JSON.stringify(db, null, 2), "utf8");

    res.status(201).json({ success: true, reservation: newReservation });
  } catch (error) {
    console.error("Error writing to reservations data:", error);
    res.status(500).json({ error: "Failed to save reservation" });
  }
});

/** Routes: Guest Inquiries **/

const MESSAGES_FILE = path.join(DATA_DIR, "messages-data.json");

app.get("/api/messages", (req, res) => {
  try {
    if (!fs.existsSync(MESSAGES_FILE)) {
      return res.json({ messages: [] });
    }
    const data = fs.readFileSync(MESSAGES_FILE, "utf8");
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading messages data:", error);
    res.status(500).json({ error: "Failed to read messages" });
  }
});

app.post("/api/messages", (req, res) => {
  try {
    const body = req.body;

    if (!body || !body.email || !body.name || !body.message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    let db = { messages: [] };
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, "utf8");
      db = JSON.parse(data);
    }

    const newMessage = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      subject: body.subject || "General Inquiry",
      message: body.message,
      submittedAt: new Date().toISOString(),
      status: "unread"
    };

    db.messages.push(newMessage);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(db, null, 2), "utf8");

    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error writing to messages data:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

/** Server Entry **/

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`JSON Mock Server is running on http://localhost:${PORT}`);
  console.log(`Routes: GET/POST /api/users, GET/POST /api/reservations`);
});
