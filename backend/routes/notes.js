import express from 'express';
import auth from '../middleware/auth.js';
import * as db from '../db/index.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const notes = await db.query(
      'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    
    res.json(notes.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    const newNote = await db.query(
      'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, title, content]
    );
    
    res.status(201).json(newNote.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await db.query(
      'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );
    
    if (note.rows.length === 0) {
      return res.status(404).json({ message: 'Note not found or not authorized' });
    }
    
    await db.query('DELETE FROM notes WHERE id = $1', [req.params.id]);
    
    res.json({ message: 'Note removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
