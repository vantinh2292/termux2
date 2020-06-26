var express = require('express');
var router = express.Router();
var modelElementImageLibrary = require('../models/model_element_image_library');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    Variables.refreshDataElementImageLibrary = true;
    res.send(Variables.resultElementImageLibrary)
})
router.post('/insert_element', (request, response, next) => {
    const newElement = new modelElementImageLibrary({
        name: request.body.name,
    });
    newElement.save((err) => {
        if (err) {
            response.json({
                result: "error",
                data: {},
                message: `Error is: ${err}`
            });
            console.log("insert db error");
        } else {
            response.json({
                result: "success",
                message: 'Add Element Success',
                data: {
                    name: request.body.name,
                }
            });
            Variables.refreshDataElementImageLibrary = true;
            console.log("insert db ok");
        }
    });
});
router.put('/update_elementLibrary', (req, res, next) => {
    if (typeof (req.body.imgRun) !== 'undefined') {
        var matches = req.body.imgRun.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        if (matches.length !== 3) {
            res.json({
                result: "error",
                data: {},
                message: `Invalid input string`
            });
        }
    }
    if (typeof (req.body.imgStop) !== 'undefined') {
        var matches = req.body.imgStop.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        if (matches.length !== 3) {
            res.json({
                result: "error",
                data: {},
                message: `Invalid input string`
            });
        }
    }
    if (typeof (req.body.imgFault) !== 'undefined') {
        var matches = req.body.imgFault.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        if (matches.length !== 3) {
            res.json({
                result: "error",
                data: {},
                message: `Invalid input string`
            });
        }
    }
    if (typeof (req.body.imgLock) !== 'undefined') {
        var matches = req.body.imgLock.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};
        if (matches.length !== 3) {
            res.json({
                result: "error",
                data: {},
                message: `Invalid input string`
            });
        }
    }
    let conditions = {};
    if (mongoose.Types.ObjectId.isValid(req.body._id) == true) {
        conditions._id = mongoose.Types.ObjectId(req.body._id);
        let newValue = {};
        if (typeof (req.body.imgRun) !== 'undefined') { newValue.imgRun = req.body.imgRun; }
        if (typeof (req.body.imgStop) !== 'undefined') { newValue.imgStop = req.body.imgStop; }
        if (typeof (req.body.imgFault) !== 'undefined') { newValue.imgFault = req.body.imgFault; }
        if (typeof (req.body.imgLock) !== 'undefined') { newValue.imgLock = req.body.imgLock; }
        const options = {
            new: true,
        }
        modelElementImageLibrary.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                res.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
                Variables.refreshDataElementImageLibrary = true;
            } else {
                res.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataElementImageLibrary = true;
            }
        });
    } else {
        response.json({
            result: "error",
            data: {},
            message: "You must enter _id to update"
        });
    }
});
router.delete('/delete', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelElementImageLibrary.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataElementImageLibrary = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataElementImageLibrary = true;
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