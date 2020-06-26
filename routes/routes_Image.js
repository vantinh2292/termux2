var express = require('express');
var router = express.Router();
var modelImage = require('../models/model_image');
var mongoose = require('mongoose');
var Variables = require('../Variable.js');
const mime = require('mime');

router.get('/getdata', (req, res) => {
    Variables.refreshDataImage=true;
    res.send(Variables.resultImage)
})
router.post('/upload', (request, res, next) => {
    console.log(request.body)
    var matches = request.body.dataTransfer.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
    console.log(matches.length)
    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let fileName = "image." + extension;
    // try {
    //     fs.writeFileSync("./images/" + fileName, imageBuffer, 'utf8');
    //     return res.send({ "status": "success" });
    // } catch (e) {
    //     next(e);
    // }
    const newImage = new modelImage({
        imageData: imageBuffer,
        contentType: extension,
        dataString:request.body.dataTransfer
    })
    newImage.save((err) => {
        if (err) {
            res.json({
                result: "error",
                data: {},
                message: `Error is: ${err}`
            });
            console.log("insert db error", err);
        } else {
            res.json({
                result: "success",
                message: 'Add BitAdjust Success',
                data: {
                    imageData: imageBuffer,
                    contentType: extension,
                    dataString:request.body.dataTransfer
                }
            });
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