const fs = require('fs');
const router = require('express').Router();
const path = require('path');
const notes = require('../../db/db.json');
const crypto = require('crypto');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: crypto.randomUUID()
    }
    notes.push(newNote)

    console.log(notes);
    
    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify({ notes }, null, 2)
    );
});


module.exports = router;