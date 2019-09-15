FROM node:10
MAINTAINER John Santias
Add . /App
EXPOSE 3000
WORKDIR /App/reporial
ENV NEWS_KEY xxxxxxxxxxxxxxxxx
ENV IBM_KEY xxxxxxxxxxxxxxxxx
RUN npm install
CMD npm start