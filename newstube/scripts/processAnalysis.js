require('dotenv').config();
const extractContent = require('./extractContent');

var NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');

const ibm_key = process.env.IBM_KEY;

async function sentimentAnalysis(query) {
    return new Promise((resolve, reject) => {
		var nlu = new NaturalLanguageUnderstandingV1({
			iam_apikey: ibm_key,
			version: '2018-04-05',
			url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
		  });
		   
		  nlu.analyze(
			{
			  url: query, // Buffer or String
			  features: {
				concepts: {},
				categories: {},
				// keywords: {},
				sentiment: {},
				emotion: {},
				semantic_roles: {}
			  }
			})
			.then(result => {
				var re = extractContent.extractNewsContent(query);
				// console.log(result);
				resolve(result);
			})
			.catch(err => {
			  console.log('error:', err);
			});
    });
}

module.exports.sentimentAnalysis = sentimentAnalysis;