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

Setup a mongoDB database and create two collections named "bookdbs" and "userdbs",
then add your conn string to config.env .

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
  
## Starting API

Navigate inside the project root directory and then install the needed dependecies

```node
npm install
```

Start API with the following command:

```node
npm run start
```

## API Documentation

See all of the exposed endpoints in this API by running the app and clicking on this [link](http://localhost:3000/api-docs/)

