var express = require('express'),
	bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
	app = express();

// ENVIRONMENT CONFIG
var port = 3000;
var router = express.Router();

// EXPRESS CONFIG
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

// stripe config
var stripe = require('stripe')('sk_test_r8J9ojeuViaXIHLAacNQyF9x00QlwOYfMY');

// ROUTES
router.post('/charge', function(req, res){

	// trigger charge
	stripe.charges.create(req.body, function(err, charge) {
		// send response
		if (err){
			console.error(err);
			res.json({ error: err, charge: false });
		} else {
			// send response with charge data
			res.json({ error: false, charge: charge });
		}
	});
});

// PING --> PONG
app.get('/status', (request, response) => {
    response.send('running');
});

app.use('/', router);

// Start server
app.listen(port, function(){
  console.log('Server listening on port ' + port)
});