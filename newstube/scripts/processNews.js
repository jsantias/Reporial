require('dotenv').config() 

const NewsAPI = require('newsapi');

// News API Key
const newsapi = new NewsAPI(process.env.NEWS_KEY);

async function getTopArticles(query) {
	return new Promise((resolve, reject) => {
		newsapi.v2.topHeadlines({
			q: query,
			language: 'en',
			pageSize: 50,
		}).then(response => {
			if (response.totalResults !== 0) {
				resolve(response);
			} else if (response.articles.length === 0) {
				reject("We could not find any articles for: " + query);
			} else {
				reject(response);
			}
		});
	});
}

async function getAllArticles(query) {
	return new Promise((resolve, reject) => {
		newsapi.v2.everything({
			q: query,
			language: 'en',
			sortBy: 'publishedAt',
			pageSize: 25,
		}).then(response => {
			if (response.totalResults !== 0) {
				resolve(response);
			} else {
				reject(response);
			}
		});
	});
}

function getSourceArticles(){
	return new Promise((resolve, reject) => {
		newsapi.v2.sources({
			category: 'technology',
			language: 'en',
			country: 'us'
		}).then(response => {
			if (response.totalResults !== 0) {
				resolve(response);
			} else if (response.articles.length === 0) {
				reject("We could not find any articles for: " + query);
			} else {
				reject(response);
			}
		});
	});
}

module.exports.getTopArticles = getTopArticles;
module.exports.getAllArticles = getAllArticles;
module.exports.getSourceArticles = getSourceArticles;
