/**
 * The bootstrap
 */

 
 
var requirejs = require('requirejs');

requirejs.config({
  baseUrl: __dirname + '/scripts'
});

requirejs(['server'], function(Server) {
  //console.log(server.address().address);		
  var server = new Server();
  server.initialize().start();
});
