require('dotenv').config(); // Load environment variables

const ibm_key = process.env.IBM_KEY; // key from environment variable

// Use IBM library for processing analysis
var NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
var nlu = new NaturalLanguageUnderstandingV1({

	// Use API key
	iam_apikey: ibm_key,
	version: '2018-04-05',

	// API endpoint
	url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

/**
 * Processes analysis on each of the given article.
 * Returns an array of objects containing the emotional
 * analysis
 * 
 * @param {*} articles 		An array of objects containing, author, 
 * 							date published, article content
 */
async function buildAnalytics(articles) {

	// Pass the url for each article for analysis
	const articlesPromises = articles.map(async (value) => {

		// Create object with values
		var params = {
			'url': value.url,
			'features': {
				'emotion': {},
			}
		}
		try {
			// return when analysis is complete
			return await nlu.analyze(params);
		} catch(e) {
			// If error (site denies analysis), store null
			return null;
		}

	});

	// Assign value when all articles have been analysed
	let result = await Promise.all(articlesPromises)
	// console.log(result);
	const outcome = [];

	// Checks null values in result. Replace null with object full of zeros
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