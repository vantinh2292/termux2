var express = require('express');
global.router = express.Router();
var router=global.router;

router=require('./routes_Line');
router=require('./routes_Label');
router=require('./routes_Image');

module.exports = router;