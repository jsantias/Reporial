const express = require('express');
const processNews = require('../scripts/processNews');
const processAnalysis = require('../scripts/processAnalysis');
const processYouTubeVideos = require('../scripts/processYouTubeVideos');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {reports: '', analytics: ''});
});

router.post('/', function(req, res, next) {
  let query = req.body.query;
  var title = "Results for '" + query + "'";
  processNews.getAllArticles(query).then((response) => {
    // console.log(response);
    let articles = processNews.buildArticles(response);
    processAnalysis.buildAnalytics(articles).then((response) => {
      processYouTubeVideos.searchVideos(articles);
      res.render('index', {title: title, reports: articles, analytics: response});
    }).catch((err) => {
      res.render('error', { message: "An Error Occured Analysing Content", error: err });
    });
  }).catch((err) => {
    res.render('error', { message: "An Error Occured Getting News", error: err });
  });
});

module.exports = router;