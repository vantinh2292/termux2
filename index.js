var config = require('config');
const bcrypt = require('bcrypt');
const si = require('systeminformation');
const port = config.Port;
var app = require('./app_NoDatabase');
var server = require("http").Server(app);
// var server = requibre("http").Server();
var io = require("socket.io")(server);
server.listen(process.env.PORT || port, '');
var Variables = require('./Variable.js');
var SubFunction = require('./SubFunction.js');
var OldWrite=-1;
si.system()
  .then(data => {
    bcrypt.compare(data.uuid + '1101111010', config.license, function (error, res) {
      if (res === true) {
        console.log('Check LICENSE OK')
      }
      if (res === false) {
        console.log('Check LICENSE NG')
        SubFunction.saveFeedbackFile('./Store/LicenseFeedback.json', data.uuid);
        setTimeout(ExitProcess, 3000);
      }
      if (error) {
        console.error(error)
        SubFunction.saveFeedbackFile('./Store/LicenseFeedback.json', error);
        setTimeout(ExitProcess, 3000);
      }
    })
  })
  .catch(error => {
    console.error(error)
    SubFunction.saveJsonFile('./Store/LicenseFeedback.json', error);
    setTimeout(ExitProcess, 3000);
  });
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});
function getDateTime() {

  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  return hour + ":" + min + ":" + sec;

}
var sendTime = setInterval(function () {
  Variables.TextField[0] = getDateTime();
}, 1000);
//Omron
{
  if (config.PLC_Omron) {
    var fins = require('./lib/index');
    var client = fins.FinsClient(9600, config.PLC_Omron_IP);
    client.on('open', function () {
      console.log("Ket noi den PLC");
      Variables.TextField[1] = "Opening Connect to PLC";
      StatusConnectPLC = 1;
    });
    client.on('error', function (error) {
      StatusConnectPLC = 0;
      Variables.TextField[1] = "Error";
      console.log("Error: ", error);
    });
    client.on('close', function (close) {
      StatusConnectPLC = 0;
      Variables.TextField[1] = "Close";
      console.log("clossing");
    })
    client.on('reply', function (msg) {
      StatusConnectPLC = 1;
      Variables.TextField[1] = "Connected";
      if (msg.command == '0101') {
        Variables.Element=SubFunction.ReadWordOfPLC(config.PLC_Omron_WordStartElement, config.PLC_Omron_LengthOfWordElement, msg.values);
        Variables.BitAdjust = SubFunction.ReadBitOfPLC(config.PLC_Omron_WordStartBitAdjust, config.PLC_Omron_LengthOfWordBitAdjust, msg.values);
        Variables.BitDisplay = SubFunction.ReadBitOfPLC(config.PLC_Omron_WordStartBitDisplay, config.PLC_Omron_LengthOfWordBitDisplay, msg.values);
        Variables.WordDisplay = SubFunction.ReadWordOfPLC(config.PLC_Omron_WordStartWordDisplay, config.PLC_Omron_LengthOfWordWordDisplay, msg.values);
        Variables.WordAdjust = SubFunction.ReadWordOfPLC(config.PLC_Omron_WordStartWordAdjust, config.PLC_Omron_LengthOfWordWordAdjust, msg.values);
        Variables.DWordDisplay = SubFunction.ReadDWordOfPLC(config.PLC_Omron_WordStartDWordDisplay, Variables.PLC_Omron_LengthOfWordDWordDisplay, msg.values);
        Variables.DWordAdjust = SubFunction.ReadDWordOfPLC(config.PLC_Omron_WordStartDWordAdjust, config.PLC_Omron_LengthOfWordDWordAdjust, msg.values);

        // Variables.WritePosCobot=SubFunction.ReadWordOfPLC(820,10,msg.values);
        // console.log(Variables.WritePosCobot)
        // Variables.Command = SubFunction.ReadWordOfPlcToByte(Variables.Command_Start, Variables.Command_Length, msg.values)
        // Variables.Message = SubFunction.ReadWordOfPlcToByte(Variables.Message_Start, Variables.Message_Length, msg.values)
        if (config.PLC_Omron_Debug) { console.log(msg.values) }
      }
    });
    var myInt = setInterval(function () {
      client.read('D0', config.PLC_Omron_Size_D0, function (err, bytes) {
      });
    }, 200);
    var SocketIO_Web = require('./SocketIO_Omron')(io, client)
  }
}

//Call Value---------------------------------------------------------------------------------------------------------------------------
// Variables.ChoiseCobot=true;
//var SocketIO_Point = require('./SocketIO_Point')(io, clientMB)
//var modelPoint = require('./models/model_point');
// var ModbusCobot = require('./Modbus_Cobot')(clientMB, io)
// var Mongodb = require('./Mongodb')(io)

setInterval(function () {
  if (JSON.stringify(Variables.Element) !== JSON.stringify(Variables.OldElement)) {
    Variables.OldElement = Variables.Element.slice();
    Variables.haveChangeElement = true;
  }
  if (JSON.stringify(Variables.BitAdjust) !== JSON.stringify(Variables.OldBitAdjust)) {
    Variables.OldBitAdjust = Variables.BitAdjust.slice();
    Variables.haveChangeBitAdjust = true;
  }
  if (JSON.stringify(Variables.BitDisplay) !== JSON.stringify(Variables.OldBitDisplay)) {
    Variables.OldBitDisplay = Variables.BitDisplay.slice();
    Variables.haveChangeBitDisplay = true;
  }
  if (JSON.stringify(Variables.WordAdjust) !== JSON.stringify(Variables.OldWordAdjust)) {
    Variables.OldWordAdjust = Variables.WordAdjust.slice();
    Variables.haveChangeWordAdjust = true;
  }
  if (JSON.stringify(Variables.WordDisplay) !== JSON.stringify(Variables.OldWordDisplay)) {
    Variables.OldWordDisplay = Variables.WordDisplay.slice();
    Variables.haveChangeWordDisplay = true;
  }
  if (JSON.stringify(Variables.DWordAdjust) !== JSON.stringify(Variables.OldDWordAdjust)) {
    Variables.OldDWordAdjust = Variables.DWordAdjust.slice();
    Variables.haveChangeDWordAdjust = true;
  }
  if (JSON.stringify(Variables.DWordDisplay) !== JSON.stringify(Variables.OldDWordDisplay)) {
    Variables.OldDWordDisplay = Variables.DWordDisplay.slice();
    Variables.haveChangeDWordDisplay = true;
  }
  if (JSON.stringify(Variables.TextField) !== JSON.stringify(Variables.OldTextField)) {
    Variables.OldTextField = Variables.TextField.slice();
    Variables.haveChangeTextField = true;
  }
}, 200);

function ExitProcess() {
  process.exit(1);
}

//Timer Game
// setInterval(function () {
//   if (Variables.counter > 0) {
//     Variables.counter = Variables.counter - 1;
//   }
// }, 1000);