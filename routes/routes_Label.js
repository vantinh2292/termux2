var express = require('express');
var router = express.Router();
var modelLabel = require('../models/model_label');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    // Variables.refreshDataLabel = true;
    res.send(Variables.resultlabel)
})
router.post('/insert_label', (request, response, next) => {
    console.log(request.body)
    const newLabel = new modelLabel({
        parent: request.body.parent,
        left: parseInt(request.body.left),
        top: parseInt(request.body.top),
        width: parseInt(request.body.width),
        text: request.body.text,
        color: request.body.color,
        fontSize: parseInt(request.body.fontSize),
    });
    newLabel.save((err) => {
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
                message: 'Add Label Success',
                data: {
                    parent: request.body.parent,
                    left: parseInt(request.body.left),
                    top: parseInt(request.body.top),
                    width: parseInt(request.body.width),
                    text: request.body.text,
                    color: request.body.color,
                    fontSize: parseInt(request.body.fontSize),
                }
            });
            Variables.refreshDataLabel = true;
            console.log("insert db ok");
        }
    });
});
router.put('/update_label', (request, response, next) => {
    let conditions = {};
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        conditions._id = mongoose.Types.ObjectId(request.body._id);
        let newValue = {};
        if (typeof (request.body.parent) !== 'undefined') { newValue.parent = request.body.parent; }
        if (typeof (request.body.text) !== 'undefined') { newValue.text = request.body.text; }
        if (typeof (request.body.color) !== 'undefined') { newValue.color = request.body.color; }
        if (typeof (request.body.left) !== 'undefined') { newValue.left = request.body.left; }
        if (typeof (request.body.top) !== 'undefined') { newValue.top = request.body.top; }
        if (typeof (request.body.width) !== 'undefined') { newValue.width = request.body.width; }
        if (typeof (request.body.fontSize) !== 'undefined') { newValue.fontSize = request.body.fontSize; }
        const options = {
            new: true,
        }
        modelLabel.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
                Variables.refreshDataLabel = true;
            } else {
                response.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataLabel = true;
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
router.delete('/delete_label', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelLabel.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataLabel = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataLabel = true;
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