const express = require('express');
const http = require('http');
const fs = require('fs');
const { execSync } = require('child_process');

class HandlerGenerator {
  get_whoami (req, res) {
      res.json({
        whoami: "Oleksa Hud"
    });
  }
}

function main () {
	let app = express();
  let handlers = new HandlerGenerator();
	const port = process.env.PORT || 8000;
   app.use(function (req, res, next){
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', '*');
   res.header('Access-Control-Allow-Credentials', 'true');
	   // The function next(); CANNOT BE REMOVED!!!
   next();
   })
  app.get('/get_whoami', handlers.get_whoami);
	var server = http.createServer(app);
	server.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();
