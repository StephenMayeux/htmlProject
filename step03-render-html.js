const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const axios = require('axios');
const _ = require('lodash');

const titles = [
  'The Martian Chronicles',
  'Harry Potter',
  'Pale Blue Dot',
  'The Jungle Book',
  'The Sun Also Rises'
];

const apiBaseUrl = 'http://openlibrary.org/search.json?title=';

const getAllBooks = async (arrayOfBooks) => {

  const promises = arrayOfBooks.map(async (title) => {
    const queryString = title.split(' ').map(word => word.toLowerCase()).join('+');
    const response = await axios(`${apiBaseUrl}${queryString}`);
    return response.data;
  });

  const results = await Promise.all(promises);

  const filteredResults = results.map(result => {

    // for each result object from the npm api, you are interested in the readme
    // result.collected.metadata.readme
    // return result.collected.metadata.readme

    // TODO: the results of the readme are in markdown language
    // you will have to learn how to convert it to html and/or a simple string
    const { docs } = result;
    const firstResult = _.head(docs);
    const { author_name } = firstResult;
    const firstAuthorName = _.head(author_name);
    return firstAuthorName
  });

  ejs.renderFile(path.join(__dirname, 'views/template.ejs'), { authors: filteredResults }, (err, str) => {
    if (err) {
      console.log('Error writing HTML file', err);
      process.exit(1);
    }

    fs.writeFile('authors.html', str, 'utf8', (err) => {
      if (err) {
        process.exit(1);
      }
    });
  });
};

getAllBooks(titles);
