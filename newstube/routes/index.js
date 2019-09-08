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
    // console.log(response);
    let articles = processNews.buildArticles(response);
    // console.log(articles);
    extractContent.extractNewsContent(articles).then((response) => {
      console.log(response);
      res.render('index', {title: title, data: response});

    }).catch((err) => {
      console.log("error extracting content");
    })
    // console.log(content);
    // let text_analysis = processAnalysis.buildAnalytics(articles);
    // console.log(text_analysis);
    // res.render('index', {title: title, data: text_analysis});

    // processAnalysis.buildAnalytics(articles, function(text_analysis){
    //   console.log(text_analysis);
    //   res.render('index', {title: title, data: response.data, analytics: text_analysis});
    // }).catch((err) => {
    //   res.render('error', { message: "An Error Occured analysing content", error: err })
    // })
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