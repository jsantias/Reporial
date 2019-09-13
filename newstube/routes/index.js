const express = require('express');
const processNews = require('../scripts/processNews');
const processAnalysis = require('../scripts/processAnalysis');
const manageArticles = require('../scripts/manageArticles');

var router = express.Router();

router.get('/', function(req, res, next) {
  var title = "Reporial";
  res.render('layout', {title: title});
});

router.post('/', function(req, res, next) {
  let query = req.body.query;
  var title = "Results for '" + query + "'";
  processNews.getAllArticles(query).then((response) => {
    let articles = manageArticles.buildArticles(response);
    processAnalysis.buildAnalytics(articles).then((analyticResults) => {
      res.render('index', {title: title, reports: articles, analytics: analyticResults});
    }).catch((err) => {
      res.render('error', { message: "An Error Occured Analysing Content", error: err });
    });
  }).catch((err) => {
    res.render('error', { message: "An Error Occured Getting News", error: err });
  });
});

module.exports = router;