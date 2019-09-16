const express = require('express');
const processNews = require('../scripts/processNews');
const processAnalysis = require('../scripts/processAnalysis');
const manageArticles = require('../scripts/manageArticles');

var router = express.Router();

/**
 * Landing/Home page
 * Renders layout.pug with logo, search box and button
 */
router.get('/', function(req, res, next) {
  var title = "Reporial";
  res.render('layout', {title: title});
});

/**
 * When user searches for a topic, run POST request
 * Runs NewsAPI to search and obtain articles.
 * Cleans the article objects, processes anlaysis
 * Renders the results in index.pug
 */
router.post('/', function(req, res, next) {

  // Store search query
  let query = req.body.query;

  // Set the title
  var title = "Results for '" + query + "'";

  // Obtain all the articles from NewsAPI
  processNews.getAllArticles(query).then((response) => {

    // Obtain certain values from the NewsAPI response
    let articles = manageArticles.buildArticles(response);

    // Run emotional analysis on each article
    processAnalysis.buildAnalytics(articles).then((analyticResults) => {

      //reder all results on index.pug
      res.render('index', {title: title, reports: articles, analytics: analyticResults});
    })
    
    // Render error page when analysis is processed incorrectly
    .catch((err) => {
      res.render('error', { message: "An Error Occured Analysing Content", error: err });
    });
  })
  
  // Render error page when NewsAPI is processed incorrectly
  .catch((err) => {
    res.render('error', { message: "An Error Occured Getting News", error: err });
  });
});

module.exports = router;