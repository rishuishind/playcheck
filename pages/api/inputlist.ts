const xml = require('xml')

async function handler(req: any, res: any) {
	const list = [{
		"listings":[
			{ "_attr": {
					"xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance",
					"xsi:noNamespaceSchemaLocation":"http://www.gstatic.com/localfeed/local_feed.xsd"
			}}, 
			{"language":"en"},
			{"listing":[
				{"id":"f9EVYs1fi61PbFlI5JeR"},
				{"name": "Hotel Aira Xing by Staybook @ Paharganj"},
				{"address": "police station, 1/5, Desh Bandhu Gupta Rd, opposite paharganj, Motia Khan, Paharganj, New Delhi, Delhi 110055"},
				{"country": "IN"},
				{"latitude": "28.646037"},
				{"longitude": "77.2092899"},
				{"phone": [{"_attr":{"type":"mobile"}},"08373929299"]},
			]},
			{"listing":[
				{"id":"4are7ydYu81Sr9r5WeL9"},
				{"name": "Staybook Jyoti Mahal"},
				{"address": "2488 - 90, Nalwa Street Aram Bagh, Chuna Mandi, Paharganj, New Delhi, Delhi 110055"},
				{"country": "IN"},
				{"latitude": "28.642036"},
				{"longitude": "77.6010818"},
				{"phone": [{"_attr":{"type":"mobile"}},"+918373929299"]},
			]},
			{"listing":[
				{"id":"IU9PgpwPMC8vGjF9A2FC"},
				{"name": "Staybook Hotel Jai Balaji New Delhi Railway Station"},
				{"address": "Second Floor, 9918/5, Multani Dhanda Paharganj, New Delhi, Delhi 110055"},
				{"country": "IN"},
				{"latitude": "12.9252026"},
				{"longitude": "77.209601"},
				{"phone": [{"_attr":{"type":"mobile"}},"09810922782"]},
			]},
			{"listing":[
				{"id":"Z3K9NsOfqLcOUWYYG2Rt"},
				{"name": "Staybook Hotel Pinky Villa"},
				{"address": "XV-2463-N, Nalwa St, Chuna Mandi, Paharganj, New Delhi, Delhi 110055"},
				{"country": "IN"},
				{"latitude": "28.6420735"},
				{"longitude": "77.2115974"},
				{"phone": [{"_attr":{"type":"mobile"}},"+918527703312"]},
			]},
			{"listing":[
				{"id":"C3bwTxeH3UUcvVF889ig"},
				{"name": "Staybook Atlanta New Delhi Train Station"},
				{"address": "7971, Arakashan Rd, Arakashan, Paharganj, New Delhi, Delhi 110055"},
				{"country": "IN"},
				{"latitude": "28.6461917"},
				{"longitude": "77.2140662"},
				{"phone": [{"_attr":{"type":"mobile"}},"09910638216"]},
			]},
			{"listing":[
				{"id":"01BmNrtoJMtFdJQDKaRH"},
				{"name": "Staybook WoodsView Mall Road Mussorie"},
				{"address": "Camels Back Rd, near Ambedkar Chowk Library, The Mall Road, Mussoorie, Uttarakhand 248179"},
				{"country": "IN"},
				{"latitude": "30.4612101"},
				{"longitude": "78.0673074"},
				{"phone": [{"_attr":{"type":"mobile"}},"+918373929299"]},
			]},
			{"listing":[
				{"id":"zF3Cw4NzJIELkN5C82ub"},
				{"name": "ame>Staybook Shivdev New Delhi Railway Station"},
				{"address": "851822 Arakashan Road, Behind Sheila Cinema, Arya Nagar, Paharganj, Delhi, 110055"},
				{"country": "IN"},
				{"latitude": "28.645671"},
				{"longitude": "77.216748"},
				{"phone": [{"_attr":{"type":"mobile"}},"08373929299"]},
			]},
			{"listing":[
				{"id":"t1DotlhL7GamLthnTwyE"},
				{"name": "Staybook BlueSky Camp, Manali"},
				{"address": "Kullu - Naggar - Manali Rd, Chotipatlikul Sarsai, Haripur, Himachal Pradesh 175136"},
				{"country": "IN"},
				{"latitude": "32.1432555"},
				{"longitude": "77.1715881"},
				{"phone": [{"_attr":{"type":"mobile"}},"09318621000"]},
			]},
			{"listing":[
				{"id":"oGVUvCbJc9kydI1KuH2N"},
				{"name": "Staybook@South Delhi"},
				{"address": "B-14, B Block, East of Kailash, New Delhi, Delhi 110065"},
				{"country": "IN"},
				{"latitude": "28.5577775"},
				{"longitude": "77.2500378"},
				{"phone": [{"_attr":{"type":"mobile"}},"+918373929299"]},
			]},
			{"listing":[
				{"id":"sMgr8o8kbEoOyZxnkKhN"},
				{"name": "Staybook City Stories New Delhi Train Station"},
				{"address": "1/5, Desh Bandhu Gupta Rd, opposite paharganj, Motia Khan, Paharganj, New Delhi, Delhi 110055"},
				{"country": "IN"},
				{"latitude": "28.6460631"},
				{"longitude": "77.2091493"},
				{"phone": [{"_attr":{"type":"mobile"}},"+91-837393929299"]},
			]},
			{"listing":[
				{"id":"289U7Qc76XW4wp1nHUYY"},
				{"name": "Corbett Paradiso Resorts"},
				{"address": "Dhikuli, Corbett, Ram Nagar, Ramnagar, Uttarakhand 244715"},
				{"country": "IN"},
				{"latitude": "29.4688914"},
				{"longitude": "79.1489769"},
				{"phone": [{"_attr":{"type":"mobile"}},"09045094733"]},
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
