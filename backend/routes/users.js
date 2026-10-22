import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    const fullName = `${req.body.name || ''} ${req.body.surname || ''}`.trim();

    user.name = fullName || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    const secretKey = process.env.JWT_SECRET || 'spottybird_fallback_secret_key_2026';
    const newToken = jwt.sign(
      { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role },
      secretKey,
      { expiresIn: '7d' }
    );

    res.json({
      token: newToken,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

router.put('/password', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { currentPassword, newPassword } = req.body;
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) return res.status(400).json({ message: 'Incorrect current password.' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating password' });
  }
});

export default router;