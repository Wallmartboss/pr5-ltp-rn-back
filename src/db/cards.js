import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  title: { 
    type: String, required: true 
  },
  description: { 
    type: String, required: true 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'without'], 
    required: true 
  },
  date: { 
    type: Date,
    required: false 
  },
  boardId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boards',
    required: true 
  },
  columnId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'columns', 
    required: true 
  }
},
{
  timestamps: true,
  versionKey: false
});

export const Card = mongoose.model('Card', cardSchema);  
