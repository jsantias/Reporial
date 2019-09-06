require('dotenv').config();
const AYLIENTextAPI = require('aylien_textapi')

// Text Analysis API Key
const textapi_key = process.env.ANALYSIS_KEY;
const textapi_id = process.env.ANALYSIS_ID;


async function extractNewsContent(link){
	// var content;
	// return new Promise((resolve, reject) => {
	// 	var textapi = new AYLIENTextAPI({
	// 		application_id: textapi_id,
	// 		application_key: textapi_key
	// 	});

	// 	textapi.extract({
	// 		url: link, 
	// 		best_image: false
	// 	})
	// 	.then(response => {
	// 		resolve(result);
	// 	})
	// 	.catch(err => {
	// 		console.log('error: ', err);
	// 	});
	// });
	
	
	var textapi = new AYLIENTextAPI({
		application_id: textapi_id,
		application_key: textapi_key
	});

	let content2 = await textapi.extract({url: link, best_image: false}, function(error, response) {
		content = response.article;
		// console.log(response);
		return content;

	});
	console.log(content2);
	return content2;
}

module.exports.extractNewsContent = extractNewsContent;
