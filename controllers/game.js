let HocVien = require("../models/HocVien");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("layout");
  });

  app.post("/dangky", function (req, res) {
    if (!req.body.Email || !req.body.HoTen || !req.body.SoDT) {
      res.json({ ketqua: 0, maloi: "Thieu tham so kia ban oi" });
    } else {
      let HocVienMoi = new HocVien({
        Email: req.body.Email,
        HoTen: req.body.HoTen,
        SoDT: req.body.SoDT,
        ThanhToan: false,
        Vi: "",
        Ngay: Date.now(),
      });
      HocVienMoi.save(function (err) {
        if (err) {
          res.json({ ketqua: 0, maloi: "MongoDB save error!" });
        } else {
          res.json({ ketqua: 1, maloi: HocVienMoi });
        }
      });
    }
  });
};
