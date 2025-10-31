const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/notesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

// Routes
app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/notes", async (req, res) => {
  const newNote = new Note(req.body);
  await newNote.save();
  res.json(newNote);
});

app.delete("/notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

app.listen(5000, () => console.log("Server running on port 5000"));