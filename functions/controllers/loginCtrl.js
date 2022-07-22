const jwt = require('jsonwebtoken');
const db = require("../models/firestore");

const loginPage = async (req, res) => {
  if (req.session.token) {
    res.redirect('/');
  } else {
    res.render("pages/login", { message: req.flash('message') });
  }
};
const isLoggedIn = async (req, res, next) => {
  if (req.session.token) {
    const decoded = jwt.verify(req.session.token, 'klfkawefoauiwhnefiua');
    if (decoded.data.username) {
      next();
    } else {
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
};
const isLoggedInAdmin = async (req, res, next) => {
  if (req.session.token) {
    const decoded = jwt.verify(req.session.token, 'klfkawefoauiwhnefiua');
    if (decoded.data.status == 'admin') {
      next();
    } else {
      res.render('pages/forbidden', {name: decoded.data.name });
    }
  } else {
    res.redirect('/login');
  }
};
const login = async (req, res) => {
  const kas = db.collection('user');
  const data = await kas.where("username", "==", req.body.username).where("password", "==", req.body.password).get();
  const loginData = {
    username: null,
    password: null,
    name: null,
    status: null,
  };
  data.forEach(element => {
    loginData.username = element.data().username;
    loginData.password = element.data().password;
    loginData.name = element.data().name;
    loginData.status = element.data().status;
  });
  if (loginData.username == req.body.username && loginData.password == req.body.password) {
    let data = {
      username: loginData.username,
      password: loginData.password,
      name: loginData.name,
      status: loginData.status
    }
    var token = jwt.sign({ data }, 'klfkawefoauiwhnefiua');
    req.session.token = token;
    res.redirect('/');
  } else {
    req.flash('message', 'Username atau password anda Salah');
    res.redirect('/login');
  }
}
const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.clearCookie('__session');
    res.redirect('/');
  });
};

module.exports = {
  loginPage,
  isLoggedIn,
  isLoggedInAdmin,
  login,
  logout,
};
