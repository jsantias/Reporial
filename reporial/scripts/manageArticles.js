const stripHtml = require("string-strip-html");

async function updateArticleContent(articles){
    const contentArray = [];
	articles.forEach(element => {
		contentArray.push(element.content);
	});
	

	const articlesPromises = contentArray.map(async (value) => {
		
		try {
			return await stripHtml(value);
		} catch(e) {
			return null;
		}

	});
	let result = await Promise.all(articlesPromises)
	result = result.filter(r => r);
	return result;
}

// Cleaning the responses
function buildArticles(response) {
	let articles = [];
	for (let i = 0; i < response.articles.length; i++) {
		let response_item = response.articles[i];
		let article = {
			title: response_item.title,
			source: response_item.source.name,
			author: response_item.author,
			date: response_item.publishedAt.replace('T', ' ').replace('Z', ''),
			description: response_item.description, //.replace('View Entire Post ›', ''),
			url: response_item.url,
			image: response_item.urlToImage,
			div: 'chart' + i,
		}

		if (article.image == null){
			article.image = 'https://avante.biz/wp-content/uploads/TV-Backgrounds/TV-Backgrounds-019.jpg';
		}

		articles[i] = article;
	}
	return articles;
}

module.exports.updateArticleContent = updateArticleContent;
module.exports.buildArticles = buildArticles;