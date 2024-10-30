import { model, Schema } from 'mongoose';

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      default: '', // URL для фону
    },
    icon: {
      type: String,
      default: '', // URL для іконки
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Посилання на модель User
      required: true, //треба виправити на false щоб зробити запит в постмені
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Column', // Посилання на модель Column
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Board = model('Board', boardSchema);

export default Board;
