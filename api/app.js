var express = require( 'express' ),
    app = express();

app.use( express.static( './public' ) );

require( './routes' )( app );

app.listen( 3000, function() {
    console.log( 'Server listening on port 3000' );
});