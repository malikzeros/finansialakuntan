const functions = require("firebase-functions");
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors")({origin: true});
app.use(helmet());
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.set("view engine", "ejs");


const {indexPage,insertData,updateData,deleteData,testData,malikPage} = require("./controllers/indexCtrl");
const {error404} = require("./controllers/page404Ctrl");

app.get("/", indexPage);
app.get("/malik", malikPage);
app.post("/add", insertData);
app.post("/update", updateData);
app.get("/delete/:id",deleteData);
app.post("/test",testData);
app.get("/*", error404);
exports.app = functions.https.onRequest(app);