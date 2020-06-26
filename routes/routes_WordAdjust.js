var express = require('express');
var router = express.Router();
var modelWordAdjust = require('../models/model_wordAdjust');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    // Variables.refreshDataWordAdjust = true;
    res.send(Variables.resultWordAdjust)
})
router.post('/insert_wordAdjust', (request, response, next) => {
    const newWordAdjust = new modelWordAdjust({
        parent: request.body.parent,
        tag: request.body.tag,
        text: request.body.text,
        left: parseInt(request.body.left),
        top: parseInt(request.body.top),
        width: parseInt(request.body.width),
        height: parseInt(request.body.height),
        fontSize: parseInt(request.body.fontSize),
    });
    newWordAdjust.save((err) => {
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
                message: 'Add WordAdjust Success',
                data: {
                    parent: request.body.parent,
                    tag: request.body.tag,
                    text: request.body.text,
                    left: parseInt(request.body.left),
                    top: parseInt(request.body.top),
                    width: parseInt(request.body.width),
                    height: parseInt(request.body.height),
                    fontSize: parseInt(request.body.fontSize),
                }
            });
            Variables.refreshDataWordAdjust = true;
            console.log("insert db ok");
        }
    });
});
router.put('/update_wordadjust', (request, response, next) => {
    console.log(request.body);
    let conditions = {};
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        conditions._id = mongoose.Types.ObjectId(request.body._id);
        let newValue = {};
        if (typeof (request.body.parent) !== 'undefined') { newValue.parent = request.body.parent; }
        if (typeof (request.body.tag) !== 'undefined') { newValue.tag = request.body.tag; }
        if (typeof (request.body.text) !== 'undefined') { newValue.text = request.body.text; }
        if (typeof (request.body.left) !== 'undefined') { newValue.left = request.body.left; }
        if (typeof (request.body.top) !== 'undefined') { newValue.top = request.body.top; }
        if (typeof (request.body.width) !== 'undefined') { newValue.width = request.body.width; }
        if (typeof (request.body.height) !== 'undefined') { newValue.height = request.body.height; }
        if (typeof (request.body.fontSize) !== 'undefined') { newValue.fontSize = request.body.fontSize; }
        const options = {
            new: true,
        }
        modelWordAdjust.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
                Variables.refreshDataWordAdjust = true;
            } else {
                response.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataWordAdjust = true;
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
router.delete('/delete_wordadjust', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelWordAdjust.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataWordAdjust = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataWordAdjust = true;
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