const express = require('express');
const processor = require('../scripts/process_news');
const NewsAPI = require('newsapi');

var router = express.Router();

//News API key
const newsapi = new NewsAPI('bf12e04bc8c446c0862f63962dff0bad');

router.get('/', function(req, res, next) {
	const title = 'Top Articles from BuzzFeed'
	// Retrieve the top headlines from Buzzfeed
	processor.getTopArticles().then((response) => {
		// Filter the responses and create objects to be displayed
        let articles = processor.buildArticles(response);
        
        //render the page
        res.render('index', {title: title});

		// Apply tones to the objects
	}).catch((err) => {
	  res.render('error', { message: "An Error Occured Fetching Articles", error: err });
	});
});