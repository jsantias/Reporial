const express = require('express');
const processNews = require('../scripts/processNews');
const processAnalysis = require('../scripts/processAnalysis');
const extractContent = require('../scripts/extractContent');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {reports: '', analytics: ''});
});

router.post('/', function(req, res, next) {
  let query = req.body.query;
  var title = "Results for '" + query + "'";
  processNews.getTopArticles(query).then((response) => {
    let articles = processNews.buildArticles(response);
    // let content = extractContent.extractNewsContent(articles);
    // console.log(content);
    processAnalysis.buildAnalytics(articles).then((response) => {

      res.render('index', {title: title, reports: articles, analytics: response});
    }).then((err) => {
      console.log(err);
    });
  }).catch((err) => {
    res.render('error', { message: "An Error Occured Extracting Content", error: err });
  });
});

module.exports = router;