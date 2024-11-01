import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  color: { type: String, enum: ['blue', 'pink', 'green', 'gray'], required: true },
  date: { type: Date, required: false },
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model('Task', taskSchema);
