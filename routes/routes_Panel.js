var express = require('express');
var router = express.Router();
var modelPanel = require('../models/model_panel');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    // Variables.refreshDataPanel = true;
    res.send(Variables.resultPanel)
})
router.post('/insert_panel', (request, response, next) => {
    console.log(request.body)
    const newPanel = new modelPanel({
        parent: request.body.parent,
        left: parseInt(request.body.left),
        top: parseInt(request.body.top),
        width: parseInt(request.body.width),
        height: parseInt(request.body.height),
        backgroundColor: request.body.backgroundColor,
        borderRadius: parseInt(request.body.borderRadius),
        boxShadow1: parseInt(request.body.boxShadow1),
        boxShadow2: parseInt(request.body.boxShadow2),
        boxShadow3: parseInt(request.body.boxShadow3),
        boxShadowColor: request.body.boxShadowColor,
        zIndex: parseInt(request.body.zIndex),
        margin: parseInt(request.body.margin),
        padding: parseInt(request.body.padding),
    });
    newPanel.save((err) => {
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
                message: 'Add Panel Success',
                data: {
                    parent: request.body.parent,
                    left: parseInt(request.body.left),
                    top: parseInt(request.body.top),
                    width: parseInt(request.body.width),
                    height: parseInt(request.body.height),
                    backgroundColor: request.body.backgroundColor,
                    borderRadius: parseInt(request.body.borderRadius),
                    boxShadow1: parseInt(request.body.boxShadow1),
                    boxShadow2: parseInt(request.body.boxShadow2),
                    boxShadow3: parseInt(request.body.boxShadow3),
                    boxShadowColor: request.body.boxShadowColor,
                    zIndex: parseInt(request.body.zIndex),
                    margin: parseInt(request.body.margin),
                    padding: parseInt(request.body.padding),
                }
            });
            Variables.refreshDataPanel = true;
            console.log("insert db ok");
        }
    });
});
router.put('/update_panel', (request, response, next) => {
    let conditions = {};
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        conditions._id = mongoose.Types.ObjectId(request.body._id);
        let newValue = {};
        if (typeof (request.body.parent) !== 'undefined') { newValue.parent = request.body.parent; }
        if (typeof (request.body.left) !== 'undefined') { newValue.left = request.body.left; }
        if (typeof (request.body.top) !== 'undefined') { newValue.top = request.body.top; }
        if (typeof (request.body.width) !== 'undefined') { newValue.width = request.body.width; }
        if (typeof (request.body.height) !== 'undefined') { newValue.height = request.body.height; }
        if (typeof (request.body.backgroundColor) !== 'undefined') { newValue.backgroundColor = request.body.backgroundColor; }
        if (typeof (request.body.borderRadius) !== 'undefined') { newValue.borderRadius = request.body.borderRadius; }
        if (typeof (request.body.boxShadow1) !== 'undefined') { newValue.boxShadow1 = request.body.boxShadow1; }
        if (typeof (request.body.boxShadow2) !== 'undefined') { newValue.boxShadow2 = request.body.boxShadow2; }
        if (typeof (request.body.boxShadow3) !== 'undefined') { newValue.boxShadow3 = request.body.boxShadow3; }
        if (typeof (request.body.boxShadowColor) !== 'undefined') { newValue.boxShadowColor = request.body.boxShadowColor; }
        if (typeof (request.body.zIndex) !== 'undefined') { newValue.zIndex = request.body.zIndex; }
        if (typeof (request.body.margin) !== 'undefined') { newValue.margin = request.body.margin; }
        if (typeof (request.body.padding) !== 'undefined') { newValue.padding = request.body.padding; }
        const options = {
            new: true,
        }
        modelPanel.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
                Variables.refreshDataPanel = true;
            } else {
                response.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataPanel = true;
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
router.delete('/delete_panel', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelPanel.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataPanel = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataPanel = true;
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