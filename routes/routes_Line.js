var express = require('express');
var router = express.Router();
var modelLine = require('../models/model_line');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    // Variables.refreshDataLine = true;
    res.send(Variables.resultline)
})
router.post('/insert_line', (request, response, next) => {
    const newLine = new modelLine({
        parent: request.body.parent,
        idRun: request.body.idRun,
        type: request.body.type,
        left: parseInt(request.body.left),
        top: parseInt(request.body.top),
        length: parseInt(request.body.length),
    });
    newLine.save((err) => {
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
                message: 'Add Line Success',
                data: {
                    parent: request.body.parent,
                    idRun: request.body.idRun,
                    type: request.body.type,
                    left: parseInt(request.body.left),
                    top: parseInt(request.body.top),
                    length: parseInt(request.body.length),
                }
            });
            Variables.refreshDataLine = true;
            console.log("insert db ok");
        }
    });
});

router.put('/update_line', (request, response, next) => {
    let conditions = {};
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        conditions._id = mongoose.Types.ObjectId(request.body._id);
        let newValue = {};
        if (typeof (request.body.parent) !== 'undefined') { newValue.parent = request.body.parent; }
        if (typeof (request.body.idRun) !== 'undefined') { newValue.idRun = request.body.idRun; }
        if (typeof (request.body.type) !== 'undefined') { newValue.type = request.body.type; }
        if (typeof (request.body.left) !== 'undefined') { newValue.left = request.body.left; }
        if (typeof (request.body.top) !== 'undefined') { newValue.top = request.body.top; }
        if (typeof (request.body.length) !== 'undefined') { newValue.length = request.body.length; }
        const options = {
            new: true,
        }
        modelLine.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
                Variables.refreshDataLine = true;
            } else {
                response.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataLine = true;
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
router.delete('/delete_line', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelLine.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataLine = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataLine = true;
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