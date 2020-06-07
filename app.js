//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
// app.use(express.static('./dist/our-river-our-life'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function(req,res) {

// res.sendFile(path.join(__dirname,'/dist/our-river-our-life/index.html'));
  res.sendFile(path.join(__dirname, 'dist/our-river-our-life/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);


//
// //Install express server
// // var compression = require('compression');
// const express = require('express');
// const path = require('path');
//
// const app = express();
//
// app.use(compression());
// // Serve only the static files form the dist directory
// app.use(express.static(path.join(__dirname, 'dist')));
//
// app.get('*', (req,res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });
//
// // Start the app by listening on the default Heroku port
// // app.listen(process.env.PORT || 8080);
// app.set( 'port', ( process.env.PORT || 8080 ));
// app.listen( app.get( 'port' ), function() {
//   console.log( 'Node server is running on port ' + app.get( 'port' ));
//   });
