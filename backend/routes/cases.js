import express from 'express';
import Case from '../models/Case.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cases.' });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const singleCase = await Case.findById(req.params.id);
    if (!singleCase) return res.status(404).json({ message: 'Case not found' });
    res.json(singleCase);
  } catch (error) {
    console.error('Error fetching single case:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const newCase = new Case(req.body);
    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create case.' });
  }
});

router.put('/:id/state', protect, adminOnly, async (req, res) => {
  try {
    const { state, report, assignee, status } = req.body;
    
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      { state, report, assignee, status },
      { new: true }
    );
    
    if (!updatedCase) return res.status(404).json({ message: 'Case not found' });
    
    res.status(200).json(updatedCase);
  } catch (error) {
    console.error('Error updating case state:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/seed', protect, adminOnly, async (req, res) => {
  try {
    const mockCases = [
      { caseId: 'SBRC-2026-0187', animal: 'Bird', species: 'Tawny Frogmouth', location: 'Rooihuiskraal, Centurion', status: 'New Report', urgency: 'High', assignee: 'Unassigned', daysInCare: 0, state: 'pending', report: 'pending' },
      { caseId: 'SBRC-2026-0185', animal: 'Mammal', species: 'Brush-tailed Possum', location: 'Midstream Estate', status: 'Rehabilitation', urgency: 'Medium', assignee: 'Tahlia M.', daysInCare: 4, state: 'accepted', report: 'open' },
      { caseId: 'SBRC-2026-0181', animal: 'Other', species: 'Echidna', location: 'Cape Town, Seapoint', status: 'Assessment', urgency: 'Low', assignee: 'Unassigned', daysInCare: 1, state: 'denied', report: 'refer' }
    ];
    
    await Case.insertMany(mockCases);
    res.json({ message: 'Database successfully seeded with your custom schema mock cases!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;