require('dotenv').config() 
const NewsAPI = require('newsapi');

const analyse = require('../scripts/processAnalysis');

// News API Key
const newsapi = new NewsAPI(process.env.NEWS_KEY);

// Retrieves top articles
async function getTopArticles() {
	// Create a promise
	return new Promise((resolve, reject) => {
		// Call the News API query for top headlines
		newsapi.v2.topHeadlines({
			// Specify the Source
			sources: 'abc-news',
			// Request 50 queries
			pageSize: 50,
		}).then(response => {
			// Check that the results are all g
			// First check see's if we get results
			if (response.totalResults !== 0) {
				// Shoot the response as the resolve for the promise
				resolve(response);
			// This handles what todo if no results are recieved
			} else if (response.articles.length === 0) {
				reject("We could not find any articles for: " + query);
			// This handles any other weird errors that occur by the API.
			} else {
				reject(response);
			}
		});
	});
}

async function getAllArticles(query) {
	return new Promise((resolve, reject) => {
		// Call the News API query for top headlines
		newsapi.v2.everything({
			// Pass the query to the paramters of the API
			q: query,
			// Specify the source
			sources: 'buzzfeed',
			// Better make sure the results are in english
			language: 'en',
			// Lets sort by popularity
			sortBy: 'popularity',
			// Request 50 queries
			pageSize: 50,
		}).then(response => {
			// Check that the results are all g
			// First check see's if we get results
			if (response.totalResults !== 0) {
				// Shoot the response as the resolve for the promise
				resolve(response);
			// This handles what todo if no results are recieved
			} else if (response.articles.length === 0) {
				reject("We could not find any articles for: " + query);
			// This handles any other weird errors that occur by the API.
			} else {
				reject(response);
			}
		});
	});
}

function getSourceArticles(){
	// Create a promise
	return new Promise((resolve, reject) => {
		// Call the News API query for top headlines
		newsapi.v2.sources({
			// Specify the Source
			category: 'technology',
			language: 'en',
			country: 'us'
		}).then(response => {
			// Check that the results are all g
			// First check see's if we get results
			if (response.totalResults !== 0) {
				// Shoot the response as the resolve for the promise
				resolve(response);
			// This handles what todo if no results are recieved
			} else if (response.articles.length === 0) {
				reject("We could not find any articles for: " + query);
			// This handles any other weird errors that occur by the API.
			} else {
				reject(response);
			}
		});
	});
}

// Cleaning the responses
function buildArticles(response) {
	// Craete an empty array to store the article objects once they are crated
	let articles = [];
	// looop through the articles in the response
	for (let i = 0; i < response.articles.length; i++) {
		// Store each response in a temporary variable to make code look cleanr (you're welcome)
		let response_item = response.articles[i];
		// Create an object
		let article = {
			// Store the title
			title: response_item.title,
			// Store the description, do a cheeky little clean to remove some excess
			//info sometimes placed on the end of the descriptions
			description: response_item.description.replace('View Entire Post ›', ''),
			// Store the article URL
			url: response_item.url,
			// Grab the associated image
			image: response_item.urlToImage,
			// Create a unique div element to display the chart in
			div: 'chart' + i,
		}
		// Stash the object into the array
		articles[i] = article;
	}
	// Return the created array full of article objects
	return articles;
}

module.exports.getTopArticles = getTopArticles;
module.exports.getAllArticles = getAllArticles;
module.exports.getSourceArticles = getSourceArticles;
module.exports.getAllArticles = buildArticles;