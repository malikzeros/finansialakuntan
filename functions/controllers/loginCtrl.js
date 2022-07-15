const jwt = require('jsonwebtoken');
const db = require("../models/firestore");

const loginPage = async (req, res) => {
  if (req.cookies.__session) {
    res.redirect('/');
   } else { 
    res.render("pages/login");
  }
};
const isLoggedIn = async (req, res, next) => {
  res.setHeader('Cache-Control', 'private');
  if (req.cookies.__session) {
    const decoded = jwt.verify(req.cookies.__session, 'klfkawefoauiwhnefiua');
    const kas = db.collection('user');
    const data = await kas.where("username", "==", decoded.data.username).get();
    const loginData=[];
    data.forEach(element => {
      loginData.push(element.data());
    });
    if (decoded.data.username == loginData[0].username) {
      next();
    } else {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
};
const login = async (req, res) => {
  const kas = db.collection('user');
  const data = await kas.where("username", "==", req.body.username).get();
  const loginData = [];
  data.forEach(element => {
    loginData.push(element.data());
  });
  if (loginData && loginData[0].password == req.body.password) {
    let data = {
      username: loginData[0].username,
      password: loginData[0].password,
      name: loginData[0].name
    }
    var token = jwt.sign({ data }, 'klfkawefoauiwhnefiua');
    res.cookie('__session', token);
    res.redirect('/');
  } else {
    res.render("pages/login", { alert: "Username atau password anda Salah" });
  }
}
const logout = async (req, res) => {
  res.clearCookie('__session');
  res.redirect('/');
};

module.exports = {
  loginPage,
  isLoggedIn,
  login,
  logout,
};
