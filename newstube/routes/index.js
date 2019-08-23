const express = require('express');
const processor = require('../scripts/processNews');

var router = express.Router();

router.get('/', function(req, res, next) {
  // Get the request params
  var id = req.query.id;
  // console.log(id);


	const title = 'NewsTube'
  // Retrieve the top headlines
  processor.getTopArticles().then((response) => {
    res.render('index', {title: title, articles: response});
    // console.log(response);

  }).catch((err) => {
    res.render('error', { message: "An Error Occured Fetching Articles", error: err });
  });
});

module.exports = router;