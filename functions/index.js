const functions = require("firebase-functions");
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const COOKIE_SECRET = 'dashldhe128ewhgcvasdy7et2hvhwytt2';
const app = express();
const cors = require("cors")({ origin: true });
app.use(helmet());
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(COOKIE_SECRET));
app.set("view engine", "ejs");


const { homePage, insertData, updateData, deleteData, testData, malikPage } = require("./controllers/homeCtrl");
const { loginPage,isLoggedIn,login,logout } = require("./controllers/loginCtrl");
const { error404Page } = require("./controllers/page404Ctrl");

app.get("/",isLoggedIn, homePage);
app.get("/login", loginPage);
app.post("/access",login);
app.get("/logout",logout);

app.get("/malik", malikPage);
app.post("/add", insertData);
app.post("/update", updateData);
app.get("/delete/:id", deleteData);
app.post("/test", testData);
app.get("/*", error404Page);
exports.app = functions.https.onRequest(app);