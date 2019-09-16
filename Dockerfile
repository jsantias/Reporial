FROM node:10
MAINTAINER John Santias
Add . /App
EXPOSE 3000
WORKDIR /App/reporial
ENV NEWS_KEY xxxxxxxxxxxxxxxxxxxxxxx
ENV IBM_KEY xxxxxxxxxxxxxxxxxxxxxxx
RUN npm install
CMD npm start
