const router = require('express').Router();
const _ = require('lodash');
const {noteValidate} = require('../Helper/validation');
const authorization = require('../Middleware/authorization');
const Note = require('../Model/note');

// FETCH NOTE 
router.get('/', authorization, async(req, res) => {
    try {
        const userId = req.body.id;
        const notes = await Note.find({userId}).sort({Title: -1});
        res.send(notes)
    } catch (error) {
        res.status(500).send('Internal server error');
    }
})

// Add NEW NOTE 
router.post('/add', authorization, async (req, res) => {
    try {
        const {error} = noteValidate(_.omit(req.body, ['id']));
        if(error) return res.status(400).send(error.details[0].message);

        const note = new Note({
            userId: req.body.id, 
            Title: req.body.Title, 
            Description: req.body.Description
        })

        await note.save();
        res.send('Todo added');

    } catch (error) {
        res.status(500).send('Internal server error');
    }
})


// Update note 
router.put('/edit/:noteId', authorization, async (req, res) =>{
    try {
        const {noteId} = req.params;

        if(!noteId) return res.status(400).send('Note is note valid');
        const date = new Date();
        const d = date.getDate()
        const m = date.toLocaleString('default', { month: 'short' });
        const y = date.getFullYear();
        const lastUpdate =  `${d} ${m}, ${y}`;

        const {error} = noteValidate(_.omit(req.body, ['id']));
        if(error) return res.status(400).send(error.details[0].message);

        console.log({...req.body, lastUpdate})
        const note = await Note.findByIdAndUpdate(noteId,
             {...req.body, lastUpdate}
            );
        
        res.send('Note updated');
    } catch (error) {
        res.status(500).send('Internal server error');
    }
})


// Delete note 
router.delete('/delete/:id', authorization, async(req, res) => {
    try {
        const {id} = req.params;
        await Note.findByIdAndDelete(id);
        res.send('Deleted');
    } catch (error) {
        res.status(500).send('Failed to delete')
    }
})

module.exports = router;