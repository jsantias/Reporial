require('dotenv').config() // Load environment variables

const NewsAPI = require('newsapi'); // key from environment variable
const newsapi = new NewsAPI(process.env.NEWS_KEY);

/**
 * Obtains the TOP articles for the given search query
 * 
 * @param {*} query 		Topic user searched
 */
async function getTopArticles(query) {
	return new Promise((resolve, reject) => {
		newsapi.v2.topHeadlines({
			q: query,
			language: 'en',
			pageSize: 50,
		}).then(response => {

			// articles found for the search query
			if (response.totalResults !== 0) {
				resolve(response);
			} 
			
			// No articles found
			else if (response.articles.length === 0) {
				reject("We could not find any articles for: " + query);
			} 
			
			// Promise rejected
			else {
				reject(response);
			}
		});
	});
}

/**
 * Obtains ALL the articles for the given search query
 * 
 * @param {*} query 		Topic user searched
 */
async function getAllArticles(query) {
	return new Promise((resolve, reject) => {
		newsapi.v2.everything({
			q: query,
			language: 'en',
			sortBy: 'publishedAt',
			pageSize: 25,
		}).then(response => {

			// articles found for the search query
			if (response.totalResults !== 0) {
				resolve(response);
			} 
			
			// No articles found
			else if (response.articles.length === 0) {
				reject("We could not find any articles for: " + query);
			} 
			
			// Promise rejected
			else {
				reject(response);
			}
		});
	});
}

/**
 * Obtains all the articles from a particular source
 * for the given search query
 * 
 * @param {*} query 		Topic user searched
 */
function getSourceArticles(query){
	return new Promise((resolve, reject) => {
		newsapi.v2.sources({
			category: query,
			language: 'en',
			country: 'us'
		}).then(response => {

			// articles found for the search query
			if (response.totalResults !== 0) {
				resolve(response);
			} 
			
			// No articles found
			else if (response.articles.length === 0) {
				reject("We could not find any articles for: " + query);
			} 
			
			// Promise rejected
			else {
				reject(response);
			}
		});
	});
}

module.exports.getTopArticles = getTopArticles;
module.exports.getAllArticles = getAllArticles;
module.exports.getSourceArticles = getSourceArticles;
