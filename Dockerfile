FROM node:10
RUN mkdir /app
ADD quotes.json /app
ADD package.json /app
ADD main.js /app
WORKDIR /app
RUN npm i
CMD npm start
