const db = require("../models/firestore");
const jwt = require('jsonwebtoken');
const managementAccountPage = async (req, res) => {
  const decoded = jwt.verify(req.session.token, 'klfkawefoauiwhnefiua');
  const user = db.collection('user');
  const data = await user.orderBy('name', 'asc').get();
  res.render("pages/account", { data: data, name: decoded.data.name });
};
const insertAccount = async (req, res) => {
  const data = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  };
  const insert = await db.collection('user').add(data);
  res.send("Tambah Data Success");
};
const updateAccount = async (req, res) => {
  const data = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  };
  const docRef = db.collection('user').doc(req.body.id);
  const updateData = await docRef.update({ data });
  res.send("Rubah Data Success");
};
const deleteAccount = async (req, res) => {
  const deleteData = await db.collection('user').doc(req.params.id).delete();
  res.send("Delete Data Success");
};
module.exports = {
  managementAccountPage,
  insertAccount,
  updateAccount,
  deleteAccount
};
