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

    db.push(newNote);

    addIdToObjects();

});

app.get(`/api/notes/:id`, (req, res) => {

    let noteId = req.params.id;

    return res.json(db[noteId-1]);

});

app.delete(`/api/notes/:id`, (req, res) => {

    let noteId = req.params.id;

    db.splice(noteId-1, 1);

    addIdToObjects();

    console.log("Deleted Note");

    res.send("Deleted Note");

});

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

function addIdToObjects(){
    let id = 1;
    db.forEach(e => {
        e.id = id;
        id++;
    });
    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(db), (err) => {
        if (err) throw err;
    });
};