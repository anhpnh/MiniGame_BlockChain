let mongoose = require("mongoose");

let hocVienSchema = new mongoose.Schema({
  Email: String,
  HoTen: String,
  SoDT: String,
  ThanhToan: Boolean,
  Vi: String,
  Ngay: Date,
});

module.exports = mongoose.model("HocVien", hocVienSchema);
