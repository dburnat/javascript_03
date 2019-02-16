const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function (ws) {
  ws.on('message', function(message) {
    console.log('received: %s', message);

    wss.clients.forEach(function e(client){
      if(client != ws)
        client.send(message);
    });
  });

  ws.on('close', function () {
    console.log("I lost a client");
   //
  });
  
});