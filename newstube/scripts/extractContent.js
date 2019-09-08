const {
	extract 
  } = require('article-parser');
  const stripHtml = require("string-strip-html");
   
async function extractNewsContent(articles){
	return new Promise((resolve, reject) => {
		const urlArray = [];
		let finalArray = [];
		let finalValue = {"content": {}};
		// console.log(articles);
		articles.forEach(element => {
			urlArray.push(element.url);
		});
		// console.log(urlArray);

		urlArray.forEach((value) => {
			finalArray.push(extract(value).then((result) => {
				finalValue.content = result.content;
				return finalValue;
			}));
		});
		const resolvedFinal = Promise.all(finalArray);
		resolve(resolvedFinal);
	});
	// const urlArray = [];
	// let finalArray = [];
	// let finalValue = {"content": {}};
	// // console.log(articles);
	// articles.forEach(element => {
	// 	urlArray.push(element.url);
	// });
	// // console.log(urlArray);

	// urlArray.forEach((value) => {
	// 	finalArray.push(extract(value).then((result) => {
	// 		finalValue.content = result.content;
	// 		return finalValue;
	// 	}));
	// });
	// const resolvedFinal = await Promise.all(finalArray);
	// return resolvedFinal;
	// console.log(resolvedFinal);
	// for (let i = 0; i < finalValue.length; i++){
	// 	resolvedFinal[i].content = stripHtml(resolvedFinal[i].content);
	// 	// console.log(resolvedFinal);
	// }
	// resolve(resolvedFinal);
	
	
	// for (let i = 0; i < articles.length; i++){
	// 	let url = articles[i].url;
   
	// 	extract(url).then((article) => {
	// 		var content = stripHtml(article.content);
	// 		articles[i].content = content;
	// 		// console.log(stripHtml(content));
	// 		// return articles[i];
			
	// 	}).catch((err) => {
	// 	  console.log(err);
	// 	});
	// }
	// console.log(articles);
	// return articles;
}

module.exports.extractNewsContent = extractNewsContent;
