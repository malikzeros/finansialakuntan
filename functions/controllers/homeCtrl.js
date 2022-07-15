const db = require("../models/firestore");
const jwt = require('jsonwebtoken');
const homePage = async (req, res) => {
  const decoded = jwt.verify(req.cookies.__session, 'klfkawefoauiwhnefiua');
  const kas = db.collection('kas');
  const data = await kas.orderBy('tanggal', 'asc').get();
  res.render("pages/home", { data: data,name:decoded.data.name });
};
const malikPage = async (req, res) => {
  const kas = db.collection('kas');
  const data = await kas.orderBy('tanggal', 'asc').get();
  res.render("pages/input", { data: data });
};
const insertData = async (req, res) => {
  const data = {
    nama: req.body.nama,
    tanggal: req.body.tanggal,
    jeniskas: req.body.jeniskas,
    keterangan: req.body.keterangan,
    debit: parseFloat(req.body.debit),
    kredit: parseFloat(req.body.kredit),
  };
  const insert = await db.collection('kas').add(data);
  res.send("Tambah Data Success");
};
const updateData = async (req, res) => {
  const docRef = db.collection('id').doc(req.params.id);
  const updateData = await docRef.update({
    timestamp: "FieldValue.serverTimestamp()"
  });
  res.send("Rubah Data Success");
};
const deleteData = async (req, res) => {
  const deleteData = await db.collection('kas').doc(req.params.id).delete();
  res.send("Delete Data Success");
};
const testData = async (req, res) => {
  console.log("params");
  console.log();
  console.log("body");
  console.log(req.body);
  res.send("test success");
};
module.exports = {
  homePage,
  insertData,
  updateData,
  deleteData,
  testData,
  malikPage
};
