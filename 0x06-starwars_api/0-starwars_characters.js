#!/usr/bin/node
// star wars api using nodejs

const request = require('request');

const movieId = process.argv[2];
const movieEndpoint = 'https://swapi-api.alx-tools.com/api/films/' + movieId;

function sendReq (characterName, index) {
  if (characterName.length === index) {
    return;
  }

  request(characterName[index], (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.parse(body).name);
      sendReq(characterName, index + 1);
    }
  });
}

request(movieEndpoint, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    const characterName = JSON.parse(body).characters;

    sendReq(characterName, 0);
  }
});
