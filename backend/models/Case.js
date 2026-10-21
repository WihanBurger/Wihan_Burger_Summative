import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  animal: { type: String, required: true },
  species: { type: String, required: true },
  location: { type: String },
  status: { type: String, default: 'Pending' },
  urgency: { type: String, default: 'Medium' },
  assignee: { type: String, default: 'Unassigned' },
  daysInCare: { type: Number, default: 0 },
  img: { type: String, default: '/mock-profile.jpg' }
}, { timestamps: true });

export default mongoose.model('Case', caseSchema);