const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '47cfbb94b9234f59b4332c21a70d786e'
});

const handleApicall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)  //'a403429f2ddf4b49b307e318f00e528b' => Model id
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('unable to work with api'))
}


const handleImage = (req, res, db)=>{
	const { id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=> {
		res.json(entries[0]);
	})
	.catch(err => status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApicall
}