# Bookkeeping API

Bookkeeping API with JWT authentication, user roles, server side pagination, filtering, sorting, CRUD & borrow funcionability for books made with Node.js, mongoDB, EJS & CSS documented with Swagger and containerized with Docker


## Prerequisites

- [MongoDB](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Node](https://nodejs.org/en/download/)

## Setup

Set up config.env with a default port like so:

```env
PORT=3000
```

### Setup Database

Setup a mongoDB database and connect it by adding your conn string to config.env .

```env
PORT=3000
MONGO_URL=mongodb+srv://username:password@...
```

### Setup config.env

Add a few more enviroment variables to finish up your config.env

```env
PORT=3000
MONGO_URL=mongodb+srv://username:password@...
ACCESSTOKENSECRET=yourTokenSecret                            e.g. DWII295NI21R3CACD
EXPIRE_TOKEN=tokenExpiryTime                                 e.g. 1*60*60*1000
NODE_ENV=development
HASH_SALT=saltUsedInSlowHashingOnLogin                       e.g. 53cddc9ba8d0398c
```

### Seed database with data

Add your conn string to mongoose.connect method in seeder.js as the first parameter

If You use my example for the HASH_SALT variable in .env file, you can seed the database with mock data in seeder.js by navigating yourself to the database folder and running "node seeder.js" .

(It would be better to set your own HASH_SALT value and update the hashedpasswords mock data correspondingly)

```node
cd server
```

```node
cd database
```

```node
node seeder.js
```

User "Dorian" has the admin role thus CRUD funcionality enabled.
User "Ivo" is just a regular user.

Passwords for each user match their username!

## Starting API

Navigate inside the project root directory and then install the needed dependecies

```node
npm install
```

Start API with the following command:

```node
npm run start
```

## Using the API

Firstly,the user needs the login on the home page. Next the user is redirected to a book gallery ("/gallery") where he can borrow available books. On the /gallery/borrowed page the user can see the books he has borrowed and return them.

Admin has the ability to access the Backoffice where he can manage the books in the API.

## API Documentation

See all of the exposed endpoints in this API by running the app and clicking on this [link](http://localhost:3000/api-docs/)
