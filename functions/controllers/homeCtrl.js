const db = require("../models/firestore");
const jwt = require('jsonwebtoken');
const homePage = async (req, res) => {
  if (req.session.token) {
    const decoded = jwt.verify(req.session.token, 'klfkawefoauiwhnefiua');
    const kas = db.collection('kas');
    const data = await kas.orderBy('tanggal', 'asc').get();
    res.render("pages/home", { data: data,name:decoded.data.name }); 
  } else {
    const kas = db.collection('kas');
    const data = await kas.orderBy('tanggal', 'asc').get();
    res.render("pages/home", { data: data,name:"Tamu" });
  }
};
module.exports = {
  homePage
};
