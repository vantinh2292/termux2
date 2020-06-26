var fins = require('../lib/index');

/* Connecting to remote FINS client on port 9600 with default timeout value. */
var client = fins.FinsClient(9600, '192.168.250.1');
/* Setting up our error listener */
client.on('open', function () {
  console.log("Ket noi den PLC");
});
client.on('error', function (error) {
  console.log("Error: ", error);
});
client.on('close', function (close) {
  console.log("clossing");
})
var myInt = setInterval(function () {
  client.read('D00000', 10, function (err, bytes) {
    console.log("Bytes: ", bytes);
  });
}, 1000);
/*
 Setting up the response listener
 Showing properties of a response
*/

client.on('reply', function (msg) {
  console.log("Reply from: ", msg.remotehost);
  //console.log("Replying to issued command of: ", msg.command);
  //console.log("Response code of: ", msg.code);
  console.log("Data returned: ", msg.values);
});


/* Read 10 registers starting at DM register 00000 */
// client.read('D00000',10,function(err,bytes) {
// 	console.log("Bytes: ", bytes);

// });

/* Write 1337 to DM register 00000 */
//client.write('D00000',1337)


/* Write 12,34,56 in DM registers 00000 00001 00002 */
//client.write('D00000',[12,34,56]);
