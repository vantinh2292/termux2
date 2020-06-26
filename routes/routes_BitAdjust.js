var express = require('express');
var router = express.Router();
var modelBitAdjust = require('../models/model_bitAdjust');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    // Variables.refreshDataBitAdjust = true;
    res.send(Variables.resultBitAdjust)
})
router.post('/insert_bitAdjust', (request, response, next) => {
    console.log(request.body)
    const newBitAdjust = new modelBitAdjust({
        parent: request.body.parent,
        status: request.body.status,
        tag: request.body.tag,
        text: request.body.text,
        left: parseInt(request.body.left),
        top: parseInt(request.body.top),
        width: parseInt(request.body.width),
        height: parseInt(request.body.height),
        fontSize: parseInt(request.body.fontSize),
        type: parseInt(request.body.type)
    });
    newBitAdjust.save((err) => {
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
                message: 'Add BitAdjust Success',
                data: {
                    parent: request.body.parent,
                    status: request.body.status,
                    tag: request.body.tag,
                    text: request.body.text,
                    left: parseInt(request.body.left),
                    top: parseInt(request.body.top),
                    width: parseInt(request.body.width),
                    height: parseInt(request.body.height),
                    fontSize: parseInt(request.body.fontSize),
                    type: parseInt(request.body.type)
                }
            });
            Variables.refreshDataBitAdjust = true;
            console.log("insert db ok");
        }
    });
});
router.put('/update_bitadjust', (request, response, next) => {
    let conditions = {};
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        conditions._id = mongoose.Types.ObjectId(request.body._id);
        let newValue = {};
        if (typeof (request.body.parent) !== 'undefined') { newValue.parent = request.body.parent; }
        if (typeof (request.body.status) !== 'undefined') { newValue.status = request.body.status; }
        if (typeof (request.body.tag) !== 'undefined') { newValue.tag = request.body.tag; }
        if (typeof (request.body.text) !== 'undefined') { newValue.text = request.body.text; }
        if (typeof (request.body.left) !== 'undefined') { newValue.left = request.body.left; }
        if (typeof (request.body.top) !== 'undefined') { newValue.top = request.body.top; }
        if (typeof (request.body.width) !== 'undefined') { newValue.width = request.body.width; }
        if (typeof (request.body.height) !== 'undefined') { newValue.height = request.body.height; }
        if (typeof (request.body.fontSize) !== 'undefined') { newValue.fontSize = request.body.fontSize; }
        if (typeof (request.body.type) !== 'undefined') { newValue.type = request.body.type; }
        const options = {
            new: true,
        }
        modelBitAdjust.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
                Variables.refreshDataBitAdjust = true;
            } else {
                response.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataBitAdjust = true;
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
router.delete('/delete_bitadjust', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelBitAdjust.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataBitAdjust = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataBitAdjust = true;
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