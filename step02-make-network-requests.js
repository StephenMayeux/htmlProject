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
    const { docs } = result;
    const firstResult = _.head(docs);
    const { author_name } = firstResult;
    const firstAuthorName = _.head(author_name);
    return firstAuthorName
  });

  console.log(filteredResults);
};

getAllBooks(titles);
