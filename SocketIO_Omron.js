var Variables = require('./Variable.js');
exports = module.exports = function (io, client) {
  io.sockets.on('connection', function (socket) {
    console.log("co nguoi ket noi" + socket.id);
    socket.emit('UpdateElement', Variables.resultElement);
    socket.emit('UpdateBitAdjust', Variables.resultBitAdjust);
    socket.emit('UpdateBitDisplay', Variables.resultBitDisplay);
    socket.emit('UpdateWordAdjust', Variables.resultWordAdjust);
    socket.emit('UpdateWordDisplay', Variables.resultWordDisplay);
    socket.emit('UpdateDWordAdjust', Variables.resultDWordAdjust);
    socket.emit('UpdateDWordDisplay', Variables.resultDWordDisplay);

    socket.on("disconnect", function () {
      console.log("ngat kekt noi");
    });
    setInterval(function () {
      socket.emit('UpdateElement', Variables.resultElement);
      socket.emit('UpdateBitAdjust', Variables.resultBitAdjust);
      socket.emit('UpdateBitDisplay', Variables.resultBitDisplay);
      socket.emit('UpdateWordAdjust', Variables.resultWordAdjust);
      socket.emit('UpdateWordDisplay', Variables.resultWordDisplay);
      socket.emit('UpdateDWordAdjust', Variables.resultDWordAdjust);
      socket.emit('UpdateDWordDisplay', Variables.resultDWordDisplay);
    }, 60000);

    //WRITE TO PLC
    socket.on("Client-send-data", function (data) {
      console.log(data)
      //Force 1
      if (data.NameCommand === 'ElementForce_Run' && !isNaN(data.tag)) {
        client.write('D1000', [100, 100, data.tag, data.tag]);
      }
      //Force 0
      if (data.NameCommand === 'ElementForce_Stop' && !isNaN(data.tag)) {
        client.write('D1000', [101, 101, data.tag, data.tag]);
      }
      //UnForce
      if (data.NameCommand === 'ElementForce_Auto' && !isNaN(data.tag)) {
        client.write('D1000', [102, 102, data.tag, data.tag]);
      }
      //Interlock
      if (data.NameCommand === 'ElementForce_Interlock' && !isNaN(data.tag)) {
        client.write('D1000', [103, 103, data.tag, data.tag]);
      }


      //BitAdjust
      if (data.NameCommand === 'BitAdjustForce' && !isNaN(data.tag)) {
        client.write('D1000', [110, 110, data.mode, data.mode, data.tag, data.tag]);
      }
      //WordAdjust
      if (data.NameCommand === 'WordAdjustForce' && !isNaN(data.tag)) {
        client.write('D1000', [111, 111, data.tag, data.tag, data.value, data.value]);
      }
      //DWordAdjust
      if (data.NameCommand === 'DWordAdjustForce' && !isNaN(data.tag)) {
        var heightValueDWordAdjust = parseInt(data.value / 65536);
        var lowValueDWordAdjust = parseInt(data.value % 65536);
        client.write('D1000', [112, 112, data.tag, data.tag, heightValueDWordAdjust,heightValueDWordAdjust,lowValueDWordAdjust,lowValueDWordAdjust]);
      }
    });
  });
}