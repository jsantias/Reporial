const {
	extract 
  } = require('article-parser');
  const stripHtml = require("string-strip-html");
   
async function extractNewsContent(articles){
	const urlArray = [];
	articles.forEach(element => {
		urlArray.push(element.url);
	});
	// console.log(urlArray);
	

	const articlesPromises = urlArray.map(async (value) => {
		//count++;
		
		try {
			return await extract(value);
		} catch(e) {
			return null;
		}

	});
	let result = await Promise.all(articlesPromises);
	// console.log(result);
	// console.log('before filter', result.length)
	// result = result.filter(r => r);
	// console.log('filtered', result.length)
	// console.log("result", result);
	return result;
}

module.exports.extractNewsContent = extractNewsContent;
