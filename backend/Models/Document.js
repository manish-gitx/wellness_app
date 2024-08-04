const { Schema, model } = require("mongoose")

const Document = new Schema({
  _id: String,
  data: Object,
  gmail:String,
  date:Date
})


module.exports = model("Document", Document)
