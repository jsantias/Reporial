const extract = require('article-parser');

/**
 * Extracts the content for each given article URL.
 * 
 * @param {*} articles		An array of objects containing, author, 
 * 							date published, article content
 */
async function extractNewsContent(articles){
	const urlArray = [];

	// Obtain URL of each article for extraction
	articles.forEach(element => {
		urlArray.push(element.url);
	});	

	// extracts content from each article
	const articlesPromises = urlArray.map(async (value) => {		
		try {
			// return when extraction complete
			return await extract(value);
		} catch(e) {
			// If error (domain denies extraction), store null
			return null;
		}

	});

	// Assign value when all articles have been processed
	let result = await Promise.all(articlesPromises);

	return result;
}

module.exports.extractNewsContent = extractNewsContent;
