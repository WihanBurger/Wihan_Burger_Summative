import express from 'express';
import Case from '../models/Case.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cases.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create case.' });
  }
});

export default router;