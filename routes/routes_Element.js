var express = require('express');
var router = express.Router();
var modelElement = require('../models/model_element');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    // Variables.refreshDataElement = true;
    res.send(Variables.resultElement)
})
router.post('/insert_element', (request, response, next) => {
    console.log(request.body)
    const newElement = new modelElement({
        parent: request.body.parent,
        tag: request.body.tag,
        left: parseInt(request.body.left),
        top: parseInt(request.body.top),
        nameElement: request.body.nameElement,
        src: request.body.src,
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
                    parent: request.body.parent,
                    tag: request.body.tag,
                    left: parseInt(request.body.left),
                    top: parseInt(request.body.top),
                    nameElement: request.body.nameElement,
                    src: request.body.src,
                }
            });
            Variables.refreshDataElement = true;
            console.log("insert db ok");
        }
    });
});

router.put('/update_element', (request, response, next) => {
    let conditions = {};
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        conditions._id = mongoose.Types.ObjectId(request.body._id);
        let newValue = {};
        if (typeof (request.body.parent) !== 'undefined') { newValue.parent = request.body.parent; }
        if (typeof (request.body.tag) !== 'undefined') { newValue.tag = request.body.tag; }
        if (typeof (request.body.left) !== 'undefined') { newValue.left = request.body.left; }
        if (typeof (request.body.top) !== 'undefined') { newValue.top = request.body.top; }
        if (typeof (request.body.nameElement) !== 'undefined') { newValue.nameElement = request.body.nameElement; }
        const options = {
            new: true,
        }
        modelElement.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
            } else {
                response.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataElement = true;
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
router.delete('/delete_element', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelElement.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataElement = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataElement = true;
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