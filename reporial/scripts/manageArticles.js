const stripHtml = require("string-strip-html");

/**
 * Obtain certain values for display
 * Returns an array of article objects
 * 
 * 
 * @param {*} response 		An array of objects containing author,
 * 							date published, article content, image
 */
function buildArticles(response) {
	let articles = [];

	// Loop through each article and store certain values
	for (let i = 0; i < response.articles.length; i++) {
		let response_item = response.articles[i];
		let article = {

			// Sets article title
			title: response_item.title,

			// Name of the source
			source: response_item.source.name,

			// Name of the author
			author: response_item.author,

			// The date and time published. Removes 'T' and 'Z' (2019-08-21T20:31:00Z)
			date: response_item.publishedAt.replace('T', ' ').replace('Z', ''),
			
			// Description of the article
			description: response_item.description, //.replace('View Entire Post ›', ''),
			
			// Link to the full article
			url: response_item.url,

			// Image from the article
			image: response_item.urlToImage,

			// div id for Google chart
			div: 'chart' + i,
		}

		// Replace empty image with a regular picture
		if (article.image == null){
			article.image = 'https://avante.biz/wp-content/uploads/TV-Backgrounds/TV-Backgrounds-019.jpg';
		}

		//store the final object in the array
		articles[i] = article;
	}
	return articles;
}


/**
 * Strips all the html tags from the extracted content

 * @param {*} articles		An array of objects containing, author, 
 * 							date published, article content
 */
async function updateArticleContent(articles){
	const contentArray = [];
	
	// Stores each article content in an array
	articles.forEach(element => {
		contentArray.push(element.content);
	});
	
	// Strip html tags in each article cotent
	const articlesPromises = contentArray.map(async (value) => {
		
		try {
			return await stripHtml(value);
		} catch(e) {
			return null;
		}

	});

	// Assign value when all articles have been processed
	let result = await Promise.all(articlesPromises)

	// Filters results, removes null values
	result = result.filter(r => r);
	return result;
}


module.exports.updateArticleContent = updateArticleContent;
module.exports.buildArticles = buildArticles;