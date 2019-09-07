const express = require('express');
const processNews = require('../scripts/processNews');
const processAnalysis = require('../scripts/processAnalysis');
const extractContent = require('../scripts/extractContent');


var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('index', {articles: ''});
});

router.post('/', function(req, res, next) {
  let query = req.body.query;
  var title = "Results for '" + query + "'";
  processNews.getTopArticles(query).then((response) => {
    res.render('index', {title: title, articles: response.articles});
  }).catch((err) => {
    res.render('error', { message: "An Error Occured Extracting Content", error: err });
  });
  // processAnalysis.sentimentAnalysis(query).then((response) => {
  //   res.render('result', {title: title, analyse: response});
  //   // console.log(response);

  // }).catch((err) => {
  //   res.render('error', { message: "An Error Occured Extracting Content", error: err });
  // });
    // // res.render('layout');
    // // console.log(query);
    // var result = extractContent.extractArticle(query);
    // console.log(result);
  
});

module.exports = router;