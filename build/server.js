"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _morgan = _interopRequireDefault(require("morgan"));
require("dotenv").config();
var PORT = process.env.PORT || 8000;
var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use((0, _morgan["default"])("dev"));
}
app.use((0, _morgan["default"])("dev"));
app.get("/", function (req, res) {
  res.send("Hello world, I am the Fledging Flight API");
});
app.use("*", function (req, res) {
  res.status(404).send({
    message: "Url not found"
  });
});
// const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", function () {
  console.log("Server connected successfully on http://localhost:".concat(PORT, "/api/v1 in ").concat(process.env.NODE_ENV, " mode").yellow.underline);
});
var _default = app;
exports["default"] = _default;