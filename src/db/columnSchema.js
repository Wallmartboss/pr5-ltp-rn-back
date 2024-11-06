import { model, Schema } from 'mongoose';
const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
  },

  { versionKey: false, timestamps: true },
);

export const Column = model('Column', columnSchema);
