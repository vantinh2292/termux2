var express = require('express');
var router = express.Router();
var modelPoint = require('../models/model_point');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    console.log('have get request');
    Variables.refreshDataPoint = true;
    res.send(Variables.resultpoint)
})
router.post('/insert_point', (request, response, next) => {
    const newPoint = new modelPoint({
        type: parseInt(Variables.TypeCobot),
        number: parseInt(request.body.number),
        offsetInX: parseInt(request.body.offsetInX),
        offsetInY: parseInt(request.body.offsetInY),
        offsetInZ: parseInt(request.body.offsetInZ),
        offsetInR: parseInt(request.body.offsetInR),
        offsetInAddX: parseInt(request.body.offsetInAddX),
        offsetInAddY: parseInt(request.body.offsetInAddY),
        PlaceX: parseInt(request.body.PlaceX),
        PlaceY: parseInt(request.body.PlaceY),
    });
    newPoint.save((err) => {
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
                data: {
                    type: parseInt(Variables.TypeCobot),
                    number: parseInt(request.body.number),
                    offsetInX: parseInt(request.body.offsetInX),
                    offsetInY: parseInt(request.body.offsetInY),
                    offsetInZ: parseInt(request.body.offsetInZ),
                    offsetInR: parseInt(request.body.offsetInR),
                    offsetInAddX: parseInt(request.body.offsetInAddX),
                    offsetInAddY: parseInt(request.body.offsetInAddY),
                    PlaceX: parseInt(request.body.PlaceX),
                    PlaceY: parseInt(request.body.PlaceY),
                },
                message: 'Add data success'
            });
            Variables.refreshDataPoint = true;
            console.log("insert db ok");
        }
    });
});
router.put('/update_point', (request, response, next) => {
    console.log(request.body);
    let conditions = {};
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        conditions._id = mongoose.Types.ObjectId(request.body._id);
        let newValue = {};
        if (typeof (Variables.TypeCobot) !== 'undefined') { newValue.type = Variables.TypeCobot; }
        if (typeof (request.body.number) !== 'undefined') { newValue.number = request.body.number; }
        if (typeof (request.body.offsetInX) !== 'undefined') { newValue.offsetInX = request.body.offsetInX; }
        if (typeof (request.body.offsetInY) !== 'undefined') { newValue.offsetInY = request.body.offsetInY; }
        if (typeof (request.body.offsetInZ) !== 'undefined') { newValue.offsetInZ = request.body.offsetInZ; }
        if (typeof (request.body.offsetInR) !== 'undefined') { newValue.offsetInR = request.body.offsetInR; }
        if (typeof (request.body.offsetInAddX) !== 'undefined') { newValue.offsetInAddX = request.body.offsetInAddX; }
        if (typeof (request.body.offsetInAddY) !== 'undefined') { newValue.offsetInAddY = request.body.offsetInAddY; }
        if (typeof (request.body.PlaceX) !== 'undefined') { newValue.PlaceX = request.body.PlaceX; }
        if (typeof (request.body.PlaceY) !== 'undefined') { newValue.PlaceY = request.body.PlaceY; }
        const options = {
            new: true,
        }
        modelPoint.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
                Variables.refreshDataPoint = true;
            } else {
                response.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataPoint = true;
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
router.delete('/delete_point', (request, response) => {
    if (mongoose.Types.ObjectId.isValid(request.body._id) == true) {
        modelPoint.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataPoint = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataPoint = true;
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