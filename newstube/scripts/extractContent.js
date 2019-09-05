require('dotenv').config();
const AYLIENTextAPI = require('aylien_textapi')

// Text Analysis API Key
const textapi_key = process.env.ANALYSIS_KEY;
const textapi_id = process.env.ANALYSIS_ID;


function extractNewsContent(link){
	var content;
	var textapi = new AYLIENTextAPI({
		application_id: textapi_id,
		application_key: textapi_key
	});

	textapi.extract({url: link, best_image: false}, function(error, response) {
		content = response.article;
		// console.log(response);
		return content;

	});
	return content;
	// console.log(content);
}

module.exports.extractNewsContent = extractNewsContent;
