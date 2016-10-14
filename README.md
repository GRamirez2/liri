# liri
In this project, I made LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

#Utilizing liri.js

To use use liri.js you need to create a keys.js file. 
In your keys.js file supply the information Twitter needs to access your account. 
Your keys.js file should look exactly like this:

exports.twitterKeys = {
  consumer_key: '<input here>',
  consumer_secret: '<input here>',
  access_token_key: '<input here>',
  access_token_secret: '<input here>',}

node liri.js my-tweets

Pulls up moszabo's 20 most recent tweets
node liri.js spotify-this-song "song title"

Will pull up the top request with this song title from Spotify
If no song title is given, defaults to What's My Age Again by Blink 182
Quotes not needed but can be used
node liri.js movie-this "movie title"

Will pull up the top request with this movie title from OMDb
If no movie title is given, defaults to Mr. Nobody
Quotes not needed but can be used
node liri.js do-what-it-says

Will analyze the file "random.txt" and do one of the top 3 actions, depending what the file says
File must be formatted as action, "movie/song" (movie/song not needed if twitter request)
Needs a keys.js file with your Twitter Keys, currently in the gitignore file for privacy purposes

log.txt saves the information of your inquiries
