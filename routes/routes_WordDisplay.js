var express = require('express');
var router = express.Router();
var modelWordDisplay = require('../models/model_wordDisplay');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    // Variables.refreshDataWordDisplay = true;
    res.send(Variables.resultWordDisplay)
})
router.post('/insert_wordDisplay', (request, response, next) => {
    const newWordDisplay = new modelWordDisplay({
        parent: request.body.parent,
        tag: request.body.tag,
        text: request.body.text,
        left: parseInt(request.body.left),
        top: parseInt(request.body.top),
        width: parseInt(request.body.width),
        fontSize: parseInt(request.body.fontSize),
    });
    newWordDisplay.save((err) => {
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
                message: 'Add WordDisplay Success',
                data: {
                    parent: request.body.parent,
                    tag: request.body.tag,
                    text: request.body.text,
                    left: parseInt(request.body.left),
                    top: parseInt(request.body.top),
                    width: parseInt(request.body.width),
                    fontSize: parseInt(request.body.fontSize),
                }
            });
            Variables.refreshDataWordDisplay = true;
            console.log("insert db ok");
        }
    });
});
router.put('/update_worddisplay', (request, response, next) => {
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
        if (typeof (request.body.fontSize) !== 'undefined') { newValue.fontSize = request.body.fontSize; }
        const options = {
            new: true,
        }
        modelWordDisplay.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
                Variables.refreshDataWordDisplay = true;
            } else {
                response.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataWordDisplay = true;
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
router.delete('/delete_worddisplay', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelWordDisplay.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataWordDisplay = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataWordDisplay = true;
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