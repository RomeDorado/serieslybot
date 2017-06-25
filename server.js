'use strict';
const config = require('./config');
// create an API server
const Restify = require('restify');
const server = Restify.createServer({
	name: 'Bot'
});
const PORT = process.env.PORT || 3000;

// FBeamer
const FBeamer = require('./fbeamer');
const f = new FBeamer(config.FB);

server.use(Restify.jsonp());
server.use(Restify.bodyParser());
server.use((req, res, next) => f.verifySignature(req, res, next));

// WIT.AI
const Wit = require('node-wit').Wit;
const wit = new Wit({
	accessToken: config.WIT_ACCESS_TOKEN
});

//OMDB
const omdb = require('./omdb');
const createResponse = require('./utils');
const createResponsePerson = require('./person');
const createBiography = require('./bio');
// Register the webhooks
server.get('/', (req, res, next) => {
	f.registerHook(req, res);
	return next();
});

// Handle incoming
server.post('/', (req, res, next) => {
	f.incoming(req, res, msg => {
		const {
			sender,
			postback,
			message
		} = msg;

		if(message.text) {
			// Process the message here
			// f.txt(sender, `You said: ${message.text}`);

			//WIT Message API
			wit.message(message.text, {})
				.then(omdb)
				.then(response => {					
					console.log(JSON.stringify(response) + "This is the response");
					f.txt(sender, response.text);
					if(response.image) {
						f.img(sender, response.image);
					}else 
					if (response.jsonfile){
						//console.log(JSON.stringify(response.jsonfile));
						f.card(sender, response.jsonfile)

					}
				})
				.catch(error => f.text(error));
				
				//console.log(error + "this is the error at server.js"));
		}
		console.log(postback + "This is postback");
		})
});


// Persistent Menu
f.showPersistent([
	{
		type: "postback",
		title: "My Reminders",
		payload: "menu:Show my reminders"
	}
]);

// Subscribe
f.subscribe();

server.listen(PORT, () => console.log(`Bot running on port ${PORT}`));

//packshet
