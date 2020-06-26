var express = require('express');
var router = express.Router();
var modelPointPickPlace = require('../models/model_point_pick_place');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');

router.get('/getdata', (req, res) => {
    console.log('have get request');
    Variables.refreshDataPointPickPlace = true;
    res.send(Variables.resultpointPickPlace)
})
router.post('/insert_point', (request, response, next) => {
    const newPoint = new modelPointPickPlace({
        type: parseInt(Variables.TypeCobot),
        pickX: parseInt(request.body.pickX),
        pickY: parseInt(request.body.pickY),
        placeX: parseInt(request.body.placeX),
        placeY: parseInt(request.body.placeY),
        placeZ_Layer1: parseInt(request.body.placeZ_Layer1),
        placeZ_Layer2: parseInt(request.body.placeZ_Layer2),
        placeZ_Layer3: parseInt(request.body.placeZ_Layer3),
        placeZ_Layer4: parseInt(request.body.placeZ_Layer4),
    });
    console.log(request.body)
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
                message: 'Add Point PickPlace Success',
                data: {
                    type: parseInt(Variables.TypeCobot),
                    pickX: parseInt(request.body.pickX),
                    pickY: parseInt(request.body.pickY),
                    placeX: parseInt(request.body.placeX),
                    placeY: parseInt(request.body.placeY),
                    placeZ_Layer1: parseInt(request.body.placeZ_Layer1),
                    placeZ_Layer2: parseInt(request.body.placeZ_Layer2),
                    placeZ_Layer3: parseInt(request.body.placeZ_Layer3),
                    placeZ_Layer4: parseInt(request.body.placeZ_Layer4),
                },
            });
            Variables.refreshDataPointPickPlace = true;
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
        // if (typeof (request.body.type) !== 'undefined') { newValue.type = request.body.type; }
        if (typeof (request.body.pickX) !== 'undefined') { newValue.pickX = request.body.pickX; }
        if (typeof (request.body.pickY) !== 'undefined') { newValue.pickY = request.body.pickY; }
        if (typeof (request.body.placeX) !== 'undefined') { newValue.placeX = request.body.placeX; }
        if (typeof (request.body.placeY) !== 'undefined') { newValue.placeY = request.body.placeY; }
        if (typeof (request.body.placeZ_Layer1) !== 'undefined') { newValue.placeZ_Layer1 = request.body.placeZ_Layer1; }
        if (typeof (request.body.placeZ_Layer2) !== 'undefined') { newValue.placeZ_Layer2 = request.body.placeZ_Layer2; }
        if (typeof (request.body.placeZ_Layer3) !== 'undefined') { newValue.placeZ_Layer3 = request.body.placeZ_Layer3; }
        if (typeof (request.body.placeZ_Layer4) !== 'undefined') { newValue.placeZ_Layer4 = request.body.placeZ_Layer4; }
        const options = {
            new: true,
        }
        modelPointPickPlace.findOneAndUpdate(conditions, { $set: newValue }, options, (err, updateData) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot update. Error is: ${err}`
                });
                Variables.refreshDataPointPickPlace = true;
            } else {
                response.json({
                    result: "success",
                    data: updateData,
                    message: "Update successfully"
                });
                Variables.refreshDataPointPickPlace = true;
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
        modelPointPickPlace.findByIdAndRemove(request.body._id, (err, data) => {
            if (err) {
                response.json({
                    result: "error",
                    data: {},
                    message: `Cannot delete. Error is: ${err}`
                });
                Variables.refreshDataPointPickPlace = true;
            }
            response.json({
                result: "success",
                data: {},
                message: "Delete successfully"
            });
            Variables.refreshDataPointPickPlace = true;
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