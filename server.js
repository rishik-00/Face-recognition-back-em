const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'rishik_25916',
    database : 'smartbrain'
  }
});


const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
	users: [
	{
		id: '123',
		name: 'john',
		email: 'lodu@gmail.com',
		password: 'lassan',
		entries: 0,
		joined: new Date()
	},

	{
		id: '133',
		name: 'olu',
		email: 'olu@gmail.com',
		password: 'yuha',
		entries: 2,
		joined: new Date()
	}

  ]
}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) } )

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res)=> { image.handleApicall(req, res)})


app.listen(process.env.PORT || 3000, () => {
	console.log(`running on port ${process.env.PORT} `);
})

