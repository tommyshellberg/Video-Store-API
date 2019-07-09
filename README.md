# Video-Store-API
A REST API for a video store using Node, Express, and Mongoose

## Installation and Setup

* Clone the repository and `cd` to the repository directory.
* Run `npm install` to install dependencies.
* Set the JWT private key env variable to your own string: `export vidly_jwtPrivateKey=myKey`
* Run `mongod` in a new terminal window to start MongoDB
* Run `nodemon index.js` to start up the server. 
* You can now make API calls to the app!

## API Calls

Here are the available endpoints:

'/api/genres'    - GET, PUT, POST, DELETE movie genres.
'/api/customers' - GET, PUT, POST, DELETE customers.
'/api/films'     - GET, PUT, POST, DELETE films.
‘/api/auth'      - POST to the auth endpoint after registering to get a JWT token. 
'/api/users'     - GET, PUT, POST, DELETE users. `UserName`, `password`, `email` are required in the request.

## Usage

* You will first need to create a user by POSTing to '/api/users'. Include in the body of the request `UserName`, `password`, `email`.
* You can now log in as the user by POSTing to ‘/api/auth' using the `email` and `password` in the body.
* If successful, you'll receive a JWT in the response. Include this in future requests.
* Some API commands, including DELETE commands, will require not only JWT validation but also checks if the user is an admin. 
For now, setting a user as an admin is done manually.

## App structure

/config.     - Config settings, including a variable which links to an environment variable.
/middleware/ - Custom middleware, including JWT token validation.
/models/     - Data models for the app(MongoDB schemas and validation).
/routes/     - Express routes for handling API requests.
index.js     - the entry point of the app. Execute this using `nodemon index.js` to rebuild when changes are made.
