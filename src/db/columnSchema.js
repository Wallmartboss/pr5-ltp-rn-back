import { model, Schema } from 'mongoose';
const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Column = model('Column', columnSchema);
