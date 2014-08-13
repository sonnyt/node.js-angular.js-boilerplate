var express = require( 'express' ),
    app = express();

app.set( 'views', './app/jade' );
app.set( 'view engine', 'jade' );

require( './routes' )( app );

app.listen( 3000, function() {
    console.log( 'Server listening on port 3000' );
});