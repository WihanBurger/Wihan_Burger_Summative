import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  animal: { type: String, required: true },
  species: { type: String, required: true },
  location: { type: String },
  status: { type: String, default: 'New Report' },
  urgency: { type: String, default: 'Medium' },
  assignee: { type: String, default: 'Unassigned' },
  daysInCare: { type: Number, default: 0 },
  img: { type: String, default: '/mock-profile.jpg' },
  state: { type: String, enum: ['pending', 'accepted', 'denied'], default: 'pending' },
  report: { type: String, enum: ['pending', 'open', 'refer'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Case', caseSchema);