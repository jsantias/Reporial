require('dotenv').config();

var NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');

const ibm_key = process.env.IBM_KEY;

var nlu = new NaturalLanguageUnderstandingV1({
	iam_apikey: ibm_key,
	version: '2018-04-05',
	url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

async function buildAnalytics(articles) {
	// console.log(articles)
	const articlesPromises = articles.map(async (value) => {
		//count++;
		var params = {
			'url': value.url, // Buffer or String
			'features': {
				'concepts': {},
				'sentiment': {},
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
	console.log('before filter', result.length)
	result = result.filter(r => r);
	console.log('filtered', result.length)
	return result;
}

module.exports.buildAnalytics = buildAnalytics;