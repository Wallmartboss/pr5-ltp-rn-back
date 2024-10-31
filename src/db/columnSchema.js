const { Schema, model } = require("mongoose");



const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Dashboard",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);



const Column = model("Column", columnSchema);

module.exports = Column;
