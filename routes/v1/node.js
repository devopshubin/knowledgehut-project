import express from 'express';
import validator from 'express-validator';

const { body } = validator;

import { getNotes, byId, deleteNote, createNote, updateNote } from '../../controllers/v1/notes.js';
import { authicateJWT } from '../../controllers/v1/auth.js';

const router = express.Router();

router.get('/', authicateJWT, getNotes);

router.post('/', authicateJWT, body('title').exists(), body('isDraft').isBoolean(), createNote);

router.get('/:id', authicateJWT, byId);

router.delete('/:id', authicateJWT, deleteNote);

router.patch('/:id', authicateJWT, updateNote);

export default router;