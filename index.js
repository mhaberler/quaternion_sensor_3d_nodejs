/**************************************************************************
 Serves static content in Public folder to browser
**************************************************************************/

var express = require('express')
var app = express();
const server_port = 3000

app.use(express.static(__dirname + '/public'));
app.listen(server_port, () => console.log(`App listening on port ${server_port}!`))

/**************************************************************************
 Reads quaternion data from imud and sends it over the websocket
**************************************************************************/

const net = require('net');
const readline = require('readline');

const client = net.createConnection({ port: 4000, host: '10.0.0.211' });

const rl = readline.createInterface({
  input: client,
});

rl.on('line', (json) => {
  sample = JSON.parse(json);
  if (ws != null) {
    obj = {
      quat_w: sample.orientation.w,
      quat_x: sample.orientation.x,
      quat_y: sample.orientation.y,
      quat_z: sample.orientation.z
    };

    json = JSON.stringify(obj);
    ws.send(json);
  }
});

/**************************************************************************
 Websocket server that communicates with browser
**************************************************************************/

const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });
var ws = null;
 
wss.on('connection', function connection(_ws) {
  ws = _ws;
});
