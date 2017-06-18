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
					f.txt(sender, response.text);
					if(response.image) {
						f.img(sender, response.image);
					}
				})
				.catch(error => console.log(error));
		}
	// 
	// 	console.log(postback);
	//
	// });
	//
	//    if (req.body.object == "page") {
  //   // Iterate over each entry
  //   // There may be multiple entries if batched
  //   req.body.entry.forEach(function(entry) {
  //     // Iterate over each messaging event
  //     entry.messaging.forEach(function(event) {
  //       if (event.postback) {
  //         processPostback(event);
  //       }
  //     });
  //   });
	//
  //   res.sendStatus(200);
  // }
	//
	// return next();
});

function processPostback(event) {
  var senderId = event.sender.id;
  var payload = event.postback.payload;

  if (payload === "GET_STARTED_PAYLOAD") {
    // Get user's first name from the User Profile API
    // and include it in the greeting
    request({
      url: "https://graph.facebook.com/v2.6/" + senderId,
      qs: {
        access_token: process.env.PAGE_ACCESS_TOKEN,
        fields: "first_name"
      },
      method: "GET"
    }, function(error, response, body) {
      var greeting = "";
      if (error) {
        console.log("Error getting user's name: " +  error);
      } else {
        var bodyObj = JSON.parse(body);
        name = bodyObj.first_name;
        greeting = "Hi " + name + ". ";
      }
      var message = greeting + "My name is SP Movie Bot. I can tell you various details regarding movies. What movie would you like to know about?";
      f.txt(senderId, {text: message});
    });
  }
}

// Persistent Menu
f.showPersistent([
	{
		type: "postback",
		title: "My Watchlist",
		payload: "menu:Show my watchlist"
	},
	{
		type: "postback",
		title: "Watch later",
		payload: "menu:Show my reminders"
	}
]);




// Subscribe
f.subscribe();

server.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
