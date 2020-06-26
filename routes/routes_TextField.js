var express = require('express');
var router = express.Router();
var modelTextField = require('../models/model_textField');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    // Variables.refreshDataWordDisplay = true;
    res.send(Variables.resultTextField)
})
router.post('/insert_textField', (request, response, next) => {
    const newTextField = new modelTextField({
        parent: request.body.parent,
        tag: request.body.tag,
        label: request.body.label,
        value: request.body.value,
        left: parseInt(request.body.left),
        top: parseInt(request.body.top),
        width: parseInt(request.body.width),
        color: request.body.color,
        fontSize: parseInt(request.body.fontSize),
        rows: parseInt(request.body.rows),
    });
    newTextField.save((err) => {
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
                message: 'Add TextField Success',
                data: {
                    parent: request.body.parent,
                    tag: request.body.tag,
                    label: request.body.label,
                    value: request.body.value,
                    left: parseInt(request.body.left),
                    top: parseInt(request.body.top),
                    width: parseInt(request.body.width),
                    color: request.body.color,
                    fontSize: parseInt(request.body.fontSize),
                    rows: parseInt(request.body.rows),
                }
            });
            Variables.refreshDataTextField = true;
            console.log("insert db ok");
        }
    });
});
router.put('/update_textField', (request, response, next) => {
    console.log(request.body);
    let conditions = {};
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        conditions._id = mongoose.Types.ObjectId(request.body._id);
        let newValue = {};
        if (typeof (request.body.parent) !== 'undefined') { newValue.parent = request.body.parent; }
        if (typeof (request.body.tag) !== 'undefined') { newValue.tag = request.body.tag; }
        if (typeof (request.body.label) !== 'undefined') { newValue.label = request.body.label; }
        if (typeof (request.body.value) !== 'undefined') { newValue.value = request.body.value; }
        if (typeof (request.body.left) !== 'undefined') { newValue.left = request.body.left; }
        if (typeof (request.body.top) !== 'undefined') { newValue.top = request.body.top; }
        if (typeof (request.body.width) !== 'undefined') { newValue.width = request.body.width; }
        if (typeof (request.body.color) !== 'undefined') { newValue.color = request.body.color; }
        if (typeof (request.body.fontSize) !== 'undefined') { newValue.fontSize = request.body.fontSize; }
        if (typeof (request.body.rows) !== 'undefined') { newValue.rows = request.body.rows; }
        const options = {
            new: true,
        }
        modelTextField.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
                Variables.refreshDataTextField = true;
            } else {
                response.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataTextField = true;
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
router.delete('/delete_textField', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelTextField.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataTextField = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataTextField = true;
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