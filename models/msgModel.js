const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MsgSchema = new Schema({
 author: {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true
 },
 text: {
  type: String,
  required: true,
  minLength: 1,
  maxLength: 140
 }
}, { timestamps: true });

module.exports = mongoose.model("Msg", MsgSchema);