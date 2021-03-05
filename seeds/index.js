const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	userNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
	console.log('Database connected!');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 300; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			// your user ID
			author: '603898fca95e28663b5f4da3',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima quae excepturi minus ab ut omnis! Ipsa quasi adipisci laboriosam, dolor laborum, sequi, eligendi voluptas voluptatem veritatis cupiditate optio quia.',
			price,
			geometry: {
				type: 'Point',
				coordinates: [ cities[random1000].longitude, cities[random1000].latitude ]
			},
			images: [
				{
					url:
						'https://res.cloudinary.com/a62262002/image/upload/v1614663778/YelpCamp/w9tugerk8r7lp8sblmhr.jpg',
					filename: 'YelpCamp/w9tugerk8r7lp8sblmhr'
				},
				{
					url:
						'https://res.cloudinary.com/a62262002/image/upload/v1614663787/YelpCamp/vv8i40n0awxoqrewdttl.jpg',
					filename: 'YelpCamp/vv8i40n0awxoqrewdttl'
				}
			]
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
