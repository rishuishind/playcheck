
const xml = require('xml')

async function handler(req: any, res: any) {

	const list = [{
		"Transaction":[
			{ "_attr": {
					"timestamp":new Date().toISOString(),
					"id":123
			}}, 
			{"language":"en"},
			{"listing":[
				{"id":"24669"},
				{"name": "Staybook- Hotel Aira Xing @ Paharganj"},
				{"address": "police station, 1/5, Desh Bandhu Gupta Rd, opposite paharganj, Motia Khan, Paharganj, New Delhi, Delhi 110055"},
				{"phone": "+918373929299"},
				{"latitude": "29.646037"},
				{"longitude": "77.2092899"},
				{"country": "IN"},
			]},
			{"listing":[
				{"id":"25095"},
				{"name": "Staybook Jyoti Mahal"},
				{"address": "7977, Main Arakasha Pathway, Arya Nagar, Paharganj, New Delhi, Delhi 110055"},
				{"phone": "+918373929299"},
				{"latitude": "28.6445779"},
				{"longitude": "77.2081547"},
				{"country": "IN"},
			]},
			{"listing":[
				{"id":"23690"},
				{"name": "Staybook Hotel Jai Balaji New Delhi Train Station"},
				{"address": "9918, Plot No. 9918, Street, Multani Dhanda, Paharganj, Delhi, 110055"},
				{"phone": "+919650839003"},
				{"latitude": "28.6466052"},
				{"longitude": "74.2119263"},
				{"country": "IN"},
			]},
			{"listing":[
				{"id":"23540"},
				{"name": "Staybook Hotel Pinky Villa"},
				{"address": "XV-2463-N, Nalwa St, Chuna Mandi, Paharganj, New Delhi, Delhi 110055"},
				{"phone": "+918527703312"},
				{"latitude": "28.6420735"},
				{"longitude": "77.2115974"},
				{"country": "IN"},
			]},
			{"listing":[
				{"id":"24712"},
				{"name": "Staybook Atlanta New Delhi Train Station"},
				{"address": "7971, Arakashan Rd, Arakashan, Paharganj, New Delhi, Delhi 110055"},
				{"phone": "08373929299"},
				{"latitude": "28.6463617"},
				{"longitude": "77.2114045"},
				{"country": "IN"},
			]},
			{"listing":[
				{"id":"12348"},
				{"name": "Staybook WoodsView Mall Road Mussorie"},
				{"address": "Camels Back Rd, near Ambedkar Chowk Library, The Mall Road, Mussoorie, Uttarakhand 248179"},
				{"phone": "+918373929299"},
				{"latitude": "30.4611914"},
				{"longitude": "77.9972672"},
				{"country": "IN"},
			]},
			{"listing":[
				{"id":"12347"},
				{"name": "Staybook Shivdev New Delhi Railway Station"},
				{"address": "851822 Arakashan Road, Behind Sheila Cinema, Arya Nagar, Paharganj, Delhi, 110055"},
				{"phone": "08373929299"},
				{"latitude": "28.6463784"},
				{"longitude": "77.2088524"},
				{"country": "IN"}
			]},
			{"listing":[
				{"id":"12349"},
				{"name": "Staybook BlueSky Camp, Manali"},
				{"address": "Kullu - Naggar - Manali Rd, Chotipatlikul Sarsai, Haripur, Himachal Pradesh 175136"},
				{"phone": "08373929299"},
				{"latitude": "32.1432555"},
				{"longitude": "77.1715881"},
				{"country": "IN"}
			]},
			{"listing":[
				{"id":"23719"},
				{"name": "Staybook@South Delhi"},
				{"address": "B-14, B Block, East of Kailash, New Delhi, Delhi 110065"},
				{"phone": "+918373929299"},
				{"latitude": "28.5577775"},
				{"longitude": "77.2500378"},
				{"country": "IN"}
			]},
			{"listing":[
				{"id":"12346"},
				{"name": "Staybook City Stories New Delhi Train Station"},
				{"address": "1/5, Desh Bandhu Gupta Rd, opposite paharganj, Motia Khan, Paharganj, New Delhi, Delhi 110055"},
				{"phone": "+91-837393929299"},
				{"latitude": "28.6463937"},
				{"longitude": "77.2094341"},
				{"country": "IN"}
			]},
			{"listing":[
				{"id":"12345"},
				{"name": "Corbett Paradiso Resort By Staybook"},
				{"address": "Dhikuli, Corbett, Ram Nagar, Ramnagar, Uttarakhand 244715"},
				{"phone": "+91-8373929299"},
				{"latitude": "29.0298066"},
				{"longitude": "77.0580596"},
				{"country": "IN"}
			]}
		]
	}]

    res.send(xml(list,{
		declaration:true
	}),
	{
		Headers:{
			"content-type": "application/xml"
		}
	});

}

export default handler;
