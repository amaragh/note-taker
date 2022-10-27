const fs = require('fs');
const router = require('express').Router();
const path = require('path');
const notes = require('../../db/db.json');
const crypto = require('crypto');

// see existing notes
router.get('/notes', (req, res) => {
    res.json(notes);
});

// add a new note
router.post('/notes', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: crypto.randomUUID()
    }
    notes.push(newNote)

    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notes, null, 2)
    );

    res.send(notes);
});

// delete note by id
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    deleteIndex = notes.findIndex(note => note.id === id);

    notes.splice(deleteIndex, 1);

    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notes, null, 2)
    );

    res.send(notes);
})


module.exports = router;