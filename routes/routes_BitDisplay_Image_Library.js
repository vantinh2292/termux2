var express = require('express');
var router = express.Router();
var modelBitDisplayImageLibrary = require('../models/model_bitdisplay_image_library');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');
const mime = require('mime');

router.get('/getdata', (req, res) => {
    Variables.refreshDataBitDisplayImageLibrary = true;
    res.send(Variables.resultBitDisplayImageLibrary)
})
router.post('/upload', (req, res, next) => {
    var matches = req.body.data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    if (matches.length !== 3) {
        res.json({
            result: "error",
            data: {},
            message: `Invalid input string`
        });
    }
    const newImage = new modelBitDisplayImageLibrary({
        name: req.body.name,
        img: req.body.data
    })
    newImage.save((err) => {
        if (err) {
            res.json({
                result: "error",
                data: {},
                message: `Error is: ${err}`
            });
            console.log("insert db error", err);
        } else {
            res.json({
                result: "success",
                message: 'Add BitAdjust Success',
                data: {
                    name: req.body.name,
                    img: req.body.data
                }
            });
            Variables.refreshDataBitDisplayImageLibrary = true;
            console.log("insert db ok");
        }
    });

});
router.delete('/delete', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelBitDisplayImageLibrary.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataBitDisplayImageLibrary = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataBitDisplayImageLibrary = true;
        })
    } else {
        response.json({
            result: "error",
            data: {},
            message: "ID not match"
        });
    }
});

module.exports = router;