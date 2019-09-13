const extract = require('article-parser');
const stripHtml = require("string-strip-html");
   
async function extractNewsContent(articles){
	const urlArray = [];
	articles.forEach(element => {
		urlArray.push(element.url);
	});	

	const articlesPromises = urlArray.map(async (value) => {		
		try {
			return await extract(value);
		} catch(e) {
			return null;
		}

	});
	let result = await Promise.all(articlesPromises);

	const outcome = [];
	result.forEach((element) => {
		outcome.push(stripHtml(element));
	});
	return outcome;
}

module.exports.extractNewsContent = extractNewsContent;
