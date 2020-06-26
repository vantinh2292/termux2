var Variables = require('./Variable.js');
var SubFunction = require('./SubFunction.js');
exports = module.exports = function (io, client, clientMB) {
  io.sockets.on('connection', function (socket) {
    console.log("co nguoi ket noi" + socket.id);
    socket.emit('BitAdjust', { 'data': Variables.BitAdjust });
    socket.emit('BitDisplay', { 'data': Variables.BitDisplay });
    socket.emit('WordAdjust', { 'data': Variables.WordAdjust });
    socket.emit('WordDisplay', { 'data': Variables.WordDisplay });
    socket.emit('DWordAdjust', { 'data': Variables.DWordAdjust });
    socket.emit('DWordDisplay', { 'data': Variables.DWordDisplay });

    socket.on("disconnect", function () {
      console.log("ngat kekt noi");
    });
    setInterval(function () {
      socket.emit('BitAdjust', { 'data': Variables.BitAdjust });
      socket.emit('BitDisplay', { 'data': Variables.BitDisplay });
      socket.emit('WordAdjust', { 'data': Variables.WordAdjust });
      socket.emit('WordDisplay', { 'data': Variables.WordDisplay });
      socket.emit('DWordAdjust', { 'data': Variables.DWordAdjust });
      socket.emit('DWordDisplay', { 'data': Variables.DWordDisplay });
    }, 10000);

    setInterval(function () {
      if (SubFunction.CheckChangeValue(Variables.BitAdjust, Variables.OldBitAdjust)) {
        Variables.OldBitAdjust = Variables.BitAdjust;
        Variables.haveChangeBitAdjust = true
      }
      if (SubFunction.CheckChangeValue(Variables.BitDisplay, Variables.OldBitDisplay)) {
        Variables.OldBitDisplay = Variables.BitDisplay;
        Variables.haveChangeBitDisplay = true
      }
      if (SubFunction.CheckChangeValue(Variables.WordAdjust, Variables.OldWordAdjust)) {
        Variables.OldWordAdjust = Variables.WordAdjust;
        Variables.haveChangeWordAdjust = true
      }
      if (SubFunction.CheckChangeValue(Variables.WordDisplay, Variables.OldWordDisplay)) {
        Variables.OldWordDisplay = Variables.WordDisplay;
        Variables.haveChangeWordDisplay = true
      }
      if (SubFunction.CheckChangeValue(Variables.DWordAdjust, Variables.OldDWordAdjust)) {
        Variables.OldDWordAdjust = Variables.DWordAdjust;
        Variables.haveChangeDWordAdjust = true
      }
      if (SubFunction.CheckChangeValue(Variables.DWordDisplay, Variables.OldDWordDisplay)) {
        Variables.OldDWordDisplay = Variables.DWordDisplay;
        Variables.haveChangeDWordDisplay = true
      }
    }, 200);

    //WRITE TO PLC
    socket.on("Client-send-data", function (data) {
      data = data.split('_');
      console.log(data);

      if (data[0] == "MobileRobot") {
        var str = data[1];
        console.log(str)
        var arrOut = SubFunction.StringToAscii(str)
        client.write('D520', arrOut);
      }
      if (data[0] == "BitAdjust") {
        if (Variables.ChoiseOmron) {
          var valueIndexBitAdjust = parseInt(data[1]);
          client.write('D500', [100, 0, valueIndexBitAdjust, 100, 0, valueIndexBitAdjust, 2]);
        }
        if (Variables.ChoiseModbus) {
          if(data[1]==='phai'){
            let arr = [SubFunction.CheckNegativeNumber(Variables.WordAdjust[1] + Variables.WordAdjust[10])]
              clientMB.writeMultipleRegisters(Variables.WordAdjustCobotStart+1, arr)
                .then(function (resp) {
                  console.log(resp);
                }, console.error);
          }
          if(data[1]==='trai'){
            let arr = [SubFunction.CheckNegativeNumber(Variables.WordAdjust[1] - Variables.WordAdjust[10])]
              clientMB.writeMultipleRegisters(Variables.WordAdjustCobotStart+1, arr)
                .then(function (resp) {
                  console.log(resp);
                }, console.error);
          }
          if(data[1]==='toi'){
            let arr = [SubFunction.CheckNegativeNumber(Variables.WordAdjust[0] - Variables.WordAdjust[10])]
              clientMB.writeMultipleRegisters(Variables.WordAdjustCobotStart+0, arr)
                .then(function (resp) {
                  console.log(resp);
                }, console.error);
          }
          if(data[1]==='lui'){
            let arr = [SubFunction.CheckNegativeNumber(Variables.WordAdjust[0] + Variables.WordAdjust[10])]
              clientMB.writeMultipleRegisters(Variables.WordAdjustCobotStart+0, arr)
                .then(function (resp) {
                  console.log(resp);
                }, console.error);
          }
          if(data[1]==='len'){
            let arr = [SubFunction.CheckNegativeNumber(Variables.WordAdjust[2] + Variables.WordAdjust[10])]
              clientMB.writeMultipleRegisters(Variables.WordAdjustCobotStart+2, arr)
                .then(function (resp) {
                  console.log(resp);
                }, console.error);
          }
          if(data[1]==='xuong'){
            let arr = [SubFunction.CheckNegativeNumber(Variables.WordAdjust[2] - Variables.WordAdjust[10])]
              clientMB.writeMultipleRegisters(Variables.WordAdjustCobotStart+2, arr)
                .then(function (resp) {
                  console.log(resp);
                }, console.error);
          }
          if(data[1]==='kep'){
            let arr = [1]
              clientMB.writeMultipleRegisters(Variables.WordAdjustCobotStart+6, arr)
                .then(function (resp) {
                  console.log(resp);
                }, console.error);
          }
          if(data[1]==='nha'){
            let arr = [2]
              clientMB.writeMultipleRegisters(Variables.WordAdjustCobotStart+6, arr)
                .then(function (resp) {
                  console.log(resp);
                }, console.error);
          }
          if(data[1]==='xoaytrai'){
            let arr = [SubFunction.CheckNegativeNumber(Variables.WordAdjust[5] + Variables.WordAdjust[11])]
              clientMB.writeMultipleRegisters(Variables.WordAdjustCobotStart+5, arr)
                .then(function (resp) {
                  console.log(resp);
                }, console.error);
                
          }
          if(data[1]==='xoayphai'){
            let arr = [SubFunction.CheckNegativeNumber(Variables.WordAdjust[5] - Variables.WordAdjust[11])]
              clientMB.writeMultipleRegisters(Variables.WordAdjustCobotStart+5, arr)
                .then(function (resp) {
                  console.log(resp);
                }, console.error);
          }
        }
      }
      if (data[0] == "AdjustWord") {
        var indexAdjustWord = parseInt(data[1]);
        var valueAdjustWord = SubFunction.CheckNegativeNumber(parseInt(data[2]));
        if (Variables.ChoiseOmron) {
          client.write('D500', [101, indexAdjustWord, valueAdjustWord, 101, indexAdjustWord, valueAdjustWord]);
        }
        if (Variables.ChoiseModbus) {
          let arr = [valueAdjustWord]
              clientMB.writeMultipleRegisters(Variables.WordAdjustCobotStart+indexAdjustWord, arr)
                .then(function (resp) {
                  console.log(resp);
                }, console.error);
        }
      }
      if (data[0] == "DWordAdjus") {
        var indexDWordAdjust = parseInt(data[1].substring(11));
        var valueAdjustDWord = parseInt(data[2]);
        var heightValueDWordAdjust = parseInt(valueAdjustDWord / 65536);
        var lowValueDWordAdjust = parseInt(valueAdjustDWord % 65536);
        client.write('D500', [102, indexDWordAdjust, heightValueDWordAdjust, lowValueDWordAdjust, 102, indexDWordAdjust, heightValueDWordAdjust, lowValueDWordAdjust]);
      }

    });
    socket.on('initial', function () {
      console.log('INITIAL');
      socket.emit('BitAdjust', { 'data': Variables.BitAdjust });
      socket.emit('BitDisplay', { 'data': Variables.BitDisplay });
      socket.emit('WordAdjust', { 'data': Variables.WordAdjust });
      socket.emit('WordDisplay', { 'data': Variables.WordDisplay });
      socket.emit('DWordDisplay', { 'data': Variables.DWordDisplay });
      socket.emit('DWordAdjust', { 'data': Variables.DWordAdjust });
    })
    setInterval(function () {
      if (Variables.haveChangeBitAdjust) {
        Variables.haveChangeBitAdjust = false;
        io.sockets.emit('BitAdjust', { 'data': Variables.BitAdjust })
      }
    }, 100)
    setInterval(function () {
      if (Variables.haveChangeBitDisplay) {
        Variables.haveChangeBitDisplay = false;
        io.sockets.emit('BitDisplay', { 'data': Variables.BitDisplay })
      }
    }, 100)
    setInterval(function () {
      if (Variables.haveChangeWordDisplay) {
        Variables.haveChangeWordDisplay = false;
        io.sockets.emit('WordDisplay', { 'data': Variables.WordDisplay })
      }
    }, 100)
    setInterval(function () {
      if (Variables.haveChangeWordAdjust) {
        Variables.haveChangeWordAdjust = false;
        io.sockets.emit('WordAdjust', { 'data': Variables.WordAdjust })
      }
    }, 100)
    setInterval(function () {
      if (Variables.haveChangeDWordDisplay) {
        Variables.haveChangeDWordDisplay = false;
        io.sockets.emit('DWordDisplay', { 'data': Variables.DWordDisplay })
      }
    }, 100)
    setInterval(function () {
      if (Variables.haveChangeDWordAdjust) {
        Variables.haveChangeDWordAdjust = false;
        io.sockets.emit('DWordAdjust', { 'data': Variables.DWordAdjust })
      }
    }, 100)
  });
}