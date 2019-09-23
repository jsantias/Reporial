# Reporial

Reporial provides users the latest news information with an emotional analysis of the content. Utilising the NewsAPI, IBM Watson Natural Language Understanding and Google Charts, users can search for articles based on any topic and be presented with graphed information based on the emotions expressed in the article. Articles presented to the user can come from thousands of other news sources.
When a user searches for a topic, the website will automatically fill up with articles in a tile card format. Each card contains a headline, image, description and a graph displaying the emotional analysis.

# Prerequisites 

```
- NodeJS 10.15 and above
- API keys for News API, IBM Watson Natural Understanding
```



# Deployment

API keys are not included in this repository for security reasons. They are added as environment variables. 

1. Run `npm install`

2. Create a new file called `.env` and save it in the root directory of the project. File's contents should look like this:

   ```
   NEWS_KEY = XXXXXXXXXXXXXX
   IBM_KEY = XXXXXXXXXXXXXX
   ```