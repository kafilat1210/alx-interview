cat star.js                                                                                       
#!/usr/bin/node
// star wars api using nodejs

const request = require('request');

const movieId = process.argv[2];
const movieEndpoint = 'https://swapi-api.alx-tools.com/api/films/' + movieId;

function sendReq (characterNames, index) {
  if (index >= characterNames.length) {  // Ensure we don't go out of bounds
    return;
  }

  const characterUrl = characterNames[index];  // Get the character URL

  if (!characterUrl) {
    console.log(`No URL found for character at index ${index}`);
    sendReq(characterNames, index + 1);  // Skip to the next character
    return;
  }

  request(characterUrl, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      try {
        const character = JSON.parse(body);
        console.log(character.name);  // Log the character's name
      } catch (err) {
        console.log(`Error parsing character data at index ${index}:`, err);
      }
    }
    sendReq(characterNames, index + 1);  // Proceed to the next character
  });
}

request(movieEndpoint, (error, response, body) => {
  if (error) {
    console.log(error);
  } else {
    try {
      const movieData = JSON.parse(body);
      const characterNames = movieData.characters;  // Get the list of character URLs

      if (Array.isArray(characterNames) && characterNames.length > 0) {
        sendReq(characterNames, 0);  // Start processing characters
      } else {
        console.log('No characters found for this movie.');
      }
    } catch (err) {
      console.log('Error parsing movie data:', err);
    }
  }
});
