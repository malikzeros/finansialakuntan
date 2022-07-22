const db = require("../models/firestore");
const test = require("../models/manageFirestore");
const jwt = require('jsonwebtoken');
const coaPage = async (req, res) => {
  const decoded = jwt.verify(req.session.token, 'klfkawefoauiwhnefiua');
  const data = await test.showData('coa');
  // console.log(data);
  // res.send("sukkese");
  res.render("pages/coa", { data: data, name: decoded.data.name });
};
const insertCoa = async (req, res) => {
  const data = {
    name: req.body.name,
    klp: req.body.klp
  };
  const insert = await db.collection('coa').doc(req.body.account).set(data);
  res.send("Tambah Data Success");
};
const updateCoa = async (req, res) => {
  const data = {
    name: req.body.account,
    username: req.body.name,
    password: req.body.klp
  };
  const docRef = db.collection('coa').doc(req.body.id);
  const updateData = await docRef.update({ data });
  res.send("Rubah Data Success");
};
const deleteCoa = async (req, res) => {
  const deleteData = await db.collection('coa').doc(req.params.id).delete();
  res.send("Delete Data Success");
};
module.exports = {
  coaPage,
  insertCoa,
  updateCoa,
  deleteCoa
};
