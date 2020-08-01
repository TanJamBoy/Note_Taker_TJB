const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

const app = express();

PORT = process.env.PORT || 3001;;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    return res.json(db);
});

app.post("/api/notes", (req, res) => {
    let newNote = req.body;

    console.log(newNote);

    db.push(newNote);

    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(db), (err) => {
        if (err) throw err;
    });
});

app.delete(`/api/notes/:id`, (req, res) => {
    res.send("Cleared Lists");
});

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});