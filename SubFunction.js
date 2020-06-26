function isEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
}
function ReadBitOfPLC(WordStart, LengthOfWord, Values) {
    var Array = [];
    for (var i = WordStart; i < WordStart + LengthOfWord; i++) {
        var temp = Number(Values[i]);
        for (var j = 0; j < 16; j++) {
            Array[16 * (i - WordStart) + j] = temp & 1;
            temp = temp >> 1;
        }
    }
    return Array;
}
function ReadWordOfPLC(Start, LengthOfWord, Values) {
    var Array = [];
    for (var i = Start; i < Start + LengthOfWord; i++) {
        Array[i - Start] = (Values[i]);
    }
    return Array;
}
function ReadWordOfPlcToByte(Start, LengthOfWord, Values) {
    var byteArray = [];
    for (var index = Start; index < Start + LengthOfWord; index++) {
        var byte = Values[index] & 0xff;
        byteArray[2 * (index - Start)] = byte;
        Values[index] = (Values[index] - byte) / 256;
        byteArray[2 * (index - Start) + 1] = Values[index]
    }

    return byteArray;
}
function StringToAscii(str) {
    var code = new Array(str.length);
    for (var i = 0; i < str.length; i++) {
        code[i] = str.charCodeAt(i);
    }
    var arrOut = [], index = 0, result = 0;
    for (var i = 0; i < code.length; i++) {
        if (i % 2 === 0) {
            result = code[i]
            if (i + 1 === code.length) arrOut[index] = result;
        };
        if (i % 2 === 1) {
            result = result + code[i] * 256;
            arrOut[index] = result;
            index = index + 1;
        }
    }
    return arrOut;
}
function ReadDWordOfPLC(WordStart, LengthOfWord, Values) {
    var Array = [];
    for (var i = WordStart; i < WordStart + LengthOfWord * 2; i++) {
        if (i % 2 == 1) {
            Array[(i - WordStart - 1) / 2] = (Values[i] * 65536 + Values[i - 1]);
            if (Array[(i - WordStart - 1) / 2] < 0) {
                Array[(i - WordStart - 1) / 2] = Array[(i - WordStart - 1) / 2] + 65536;
            }
        }
    }
    return Array;
}
function ConvertArray2Text(data) {
    var temp = "";
    for (var i = 0; i < data.length; i++) {
        temp = temp + '|' + data[i];
    }
    return temp;
}
function CheckChangeValue(Variable, OldVariable) {
    var temp = false;
    if (!isEmpty(Variable)) {
        for (var i = 0; i < Variable.length; i++) {
            if (Variable[i] != OldVariable[i]) {
                temp = true;
            }
        }
    }

    return temp;
}
function CheckNegativeNumber(nb) {
    if (nb < 0) { return nb + 65536 }
    if (nb > 32767) { return nb - 65536 }
    return nb
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function saveJsonFile(path, dataStore) {
    const fs = require('fs')

    try {
        if (!fs.existsSync(path)) {
            fs.writeFile(path, JSON.stringify(dataStore), 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }

                console.log("JSON file has been saved.");
            });
        }
    } catch (err) {
        console.error(err)
    }
}
function saveFeedbackFile(path, dataStore) {
    const fs = require('fs')
    try {
        fs.writeFile(path, dataStore, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
            console.log("JSON file has been saved.");
        });
    } catch (err) {
        console.error(err)
    }
}
function getJsonFile(path, cb) {
    const fs = require('fs')
    try {
        if (fs.existsSync(path)) {
            fs.readFile(path, 'utf8', function (err, data) {
                if (err) console.log(err);
                obj = JSON.parse(data);
                cb(obj)
            });
        } else { cb('update') }
    } catch (err) {
        console.error(err)
        cb([])
    }
}
function convertPosCobot(pos0, pos1) {
    var data =  [];
    data[0]=parseInt(pos1 % 256)
    data[1]=parseInt(pos1 / 256)
    data[2]=parseInt(pos0 % 256)
    data[3]=parseInt(pos0 / 256)
    return Buffer.from([ data[3], data[2], data[1], data[0] ]).readFloatBE(0)
}
function getIndexCobotWriteMB(indexBit,index) {
    if(index%10 <= indexBit){
        return index/10
    }
    else{
        return index/10+1
    }
}
module.exports = {
    ReadWordOfPlcToByte, StringToAscii, ReadBitOfPLC, ReadWordOfPLC,
    ReadDWordOfPLC, ConvertArray2Text, CheckChangeValue, CheckNegativeNumber,
    getRandomInt, saveJsonFile, getJsonFile, saveFeedbackFile,
    convertPosCobot,getIndexCobotWriteMB
}