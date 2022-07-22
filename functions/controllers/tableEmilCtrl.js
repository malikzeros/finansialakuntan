const db = require("../models/firestore");
const jwt = require('jsonwebtoken');
const tableEmilPage = async (req, res) => {
  const decoded = jwt.verify(req.session.token, 'klfkawefoauiwhnefiua');
  const kas = db.collection('kas');
  const data = await kas.orderBy('tanggal', 'asc').get();
  res.render("pages/emiltable", { data: data, name: decoded.data.name });
};
const insertDataEmil = async (req, res) => {
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
const updateDataEmil = async (req, res) => {
  const data = {
    nama: req.body.nama,
    tanggal: req.body.tanggal,
    jeniskas: req.body.jeniskas,
    keterangan: req.body.keterangan,
    debit: parseFloat(req.body.debit),
    kredit: parseFloat(req.body.kredit),
  };
  const docRef = db.collection('kas').doc(req.body.id);
  const updateData = await docRef.update({ data });
  res.send("Rubah Data Success");
};
const deleteDataEmil = async (req, res) => {
  const deleteData = await db.collection('kas').doc(req.params.id).delete();
  res.send("Delete Data Success");
};
module.exports = {
  tableEmilPage,
  insertDataEmil,
  updateDataEmil,
  deleteDataEmil
};
