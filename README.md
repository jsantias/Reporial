# NewsTube

NewsTube aims to provide users real time news information
and videos that are related to it. Utilising the News API, YouTube data API and
TextRazor, users can search for articles on a topic or source of their choosing.
On selection of an article, they are presented with the content and an option
to view an analysis on the text. Videos related to the topic will also be shown
on the page.

# Prerequisites 

```
- NodeJS 10.15 and above
- API keys for News API, YouTube, and TextRazor. 
```



# Deployment

1. Run `npm install`

2. Create a new file called `.env` and save it in the root directory of the project (newstube/.env). File's contents should look like this:

   ```
   NEWS_KEY = XXXXXXXXXXXXXX
   YOUTUBE_KEY = XXXXXXXXXXXXXX
   TEXTRAZOR_KEY = XXXXXXXXXXXXXX
   ```