import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    enum: ['blue', 'pink', 'green', 'gray'],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
}, {
  timestamps: true,
});

export const Task = model('Task', taskSchema);
