require('dotenv').config();

const ibm_key = process.env.IBM_KEY;

var NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
var nlu = new NaturalLanguageUnderstandingV1({
	iam_apikey: ibm_key,
	version: '2018-04-05',
	url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

async function buildAnalytics(articles) {
	const articlesPromises = articles.map(async (value) => {
		var params = {
			'url': value.url, // Buffer or String
			'features': {
				'emotion': {},
			}
		}
		try {
			return await nlu.analyze(params);
		} catch(e) {
			return null;
		}

	});
	let result = await Promise.all(articlesPromises)
	// console.log(result);
	const outcome = [];
	result.forEach((element) => {
		if (element == null){
			outcome.push(
				{
					"emotion": {
						"anger": 0,
						"disgust": 0,
						"fear": 0,
						"joy": 0,
						"sadness": 0
					}
			});
		} else {
			outcome.push(element.emotion.document);
		}
	});
	return outcome;
}

module.exports.buildAnalytics = buildAnalytics;