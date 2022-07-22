const functions = require("firebase-functions");
const express = require("express");
const session = require('express-session');
const helmet = require("helmet");
const bodyParser = require("body-parser");
const flash = require('req-flash');
const app = express();
const cors = require("cors")({ origin: true });
app.use(helmet());
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 't@1k0ch3ng',
    name: '__session',
    cookie: {
        sameSite: true,
        maxAge: 60000
    },
}))
app.use(flash());
app.set("view engine", "ejs");


const { homePage } = require("./controllers/homeCtrl");
const { loginPage, isLoggedIn, isLoggedInAdmin, login, logout } = require("./controllers/loginCtrl");
const { tableEmilPage, insertDataEmil, updateDataEmil, deleteDataEmil } = require("./controllers/tableEmilCtrl");
const { managementAccountPage,insertAccount,updateAccount,deleteAccount } = require("./controllers/managementAccountCtrl");
const { coaPage,insertCoa,updateCoa,deleteCoa } = require("./controllers/coaCtrl");
const { error404Page } = require("./controllers/page404Ctrl");

app.get("/", homePage);

app.get("/login", loginPage);
app.post("/access", login);
app.get("/logout", logout);

app.get("/emiltable", isLoggedInAdmin, tableEmilPage);
app.post("/emiltable/add", isLoggedInAdmin, insertDataEmil);
app.post("/emiltable/update", isLoggedInAdmin, updateDataEmil);
app.get("/emiltable/delete/:id", isLoggedInAdmin, deleteDataEmil);

app.get("/account",isLoggedInAdmin,managementAccountPage);
app.post("/account/add",isLoggedInAdmin,insertAccount);
app.post("/account/update",isLoggedInAdmin,updateAccount);
app.get("/account/delete",isLoggedInAdmin,deleteAccount);

app.get("/coa",isLoggedInAdmin,coaPage);
app.post("/coa/add",isLoggedInAdmin,insertCoa);
app.post("/coa/update",isLoggedInAdmin,updateCoa);
app.get("/coa/delete",isLoggedInAdmin,deleteCoa);


app.get("/rekapkas",isLoggedInAdmin);

app.get("/rekapju",isLoggedInAdmin);

app.get("/neracalajur",isLoggedInAdmin);

app.get("/laporancashflow",isLoggedInAdmin);

app.get("/laporanlabarugi",isLoggedInAdmin);

app.get("/laporanperubahanmodal",isLoggedInAdmin);

app.get("/neraca",isLoggedInAdmin);

app.get("/*", isLoggedIn, error404Page);
exports.app = functions.https.onRequest(app);