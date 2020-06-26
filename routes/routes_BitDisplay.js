var express = require('express');
var router = express.Router();
var modelBitDisplay = require('../models/model_bitDisplay');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    // Variables.refreshDataBitDisplay = true;
    res.send(Variables.resultBitDisplay)
})
router.post('/insert_bitDisplay', (request, response, next) => {
    const newBitDisplay = new modelBitDisplay({
        parent: request.body.parent,
        status: request.body.status,
        tag: request.body.tag,
        text0: request.body.text0,
        text1: request.body.text1,
        color0: request.body.color0,
        color1: request.body.color1,
        left: parseInt(request.body.left),
        top: parseInt(request.body.top),
        width: parseInt(request.body.width),
        fontSize: parseInt(request.body.fontSize),
        nameImage0: request.body.nameImage0,
        nameImage1: request.body.nameImage1,
        type: parseInt(request.body.type)
    });
    console.log(request.body)
    newBitDisplay.save((err) => {
        if (err) {
            response.json({
                result: "error",
                data: {},
                message: `Error is: ${err}`
            });
            console.log("insert db error", err);
        } else {
            response.json({
                result: "success",
                message: 'Add BitDisplay success',
                data: {
                    parent: request.body.parent,
                    status: request.body.status,
                    tag: request.body.tag,
                    text0: request.body.text0,
                    text1: request.body.text1,
                    color0: request.body.color0,
                    color1: request.body.color1,
                    left: parseInt(request.body.left),
                    top: parseInt(request.body.top),
                    width: parseInt(request.body.width),
                    fontSize: parseInt(request.body.fontSize),
                    nameImage0: request.body.nameImage0,
                    nameImage1: request.body.nameImage1,
                    type: parseInt(request.body.type)
                }
            });
            Variables.refreshDataBitDisplay = true;
            console.log("insert db ok");
        }
    });
});
router.put('/update_bitdisplay', (request, response, next) => {
    console.log(request.body);
    let conditions = {};
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        conditions._id = mongoose.Types.ObjectId(request.body._id);
        let newValue = {};
        if (typeof (request.body.parent) !== 'undefined') { newValue.parent = request.body.parent; }
        if (typeof (request.body.status) !== 'undefined') { newValue.status = request.body.status; }
        if (typeof (request.body.tag) !== 'undefined') { newValue.tag = request.body.tag; }
        if (typeof (request.body.text0) !== 'undefined') { newValue.text0 = request.body.text0; }
        if (typeof (request.body.text1) !== 'undefined') { newValue.text1 = request.body.text1; }
        if (typeof (request.body.color0) !== 'undefined') { newValue.color0 = request.body.color0; }
        if (typeof (request.body.color1) !== 'undefined') { newValue.color1 = request.body.color1; }
        if (typeof (request.body.left) !== 'undefined') { newValue.left = request.body.left; }
        if (typeof (request.body.top) !== 'undefined') { newValue.top = request.body.top; }
        if (typeof (request.body.width) !== 'undefined') { newValue.width = request.body.width; }
        if (typeof (request.body.fontSize) !== 'undefined') { newValue.fontSize = request.body.fontSize; }
        if (typeof (request.body.nameImage0) !== 'undefined') { newValue.nameImage0 = request.body.nameImage0; }
        if (typeof (request.body.nameImage1) !== 'undefined') { newValue.nameImage1 = request.body.nameImage1; }
        const options = {
            new: true,
        }
        modelBitDisplay.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
                Variables.refreshDataBitDisplay = true;
            } else {
                response.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataBitDisplay = true;
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
router.delete('/delete_bitdisplay', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelBitDisplay.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataBitDisplay = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataBitDisplay = true;
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