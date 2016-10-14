# liri
In this project, I made LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

#Utilizing liri.js

To use use liri.js you need to create a keys.js file. 
In your keys.js file supply the information Twitter needs to access your account. 
Your keys.js file should look exactly like this:

exports.twitterKeys = {
  consumer_key: 'paste your key here',
  consumer_secret: 'paste your key here',
  access_token_key: 'paste your token key here',
  access_token_secret: 'paste your token secret here',}

#liri command lines

####node liri.js my-tweets

Will console.log your 20 most recent tweets

####node liri.js spotify-this-song "song title"

Will pull up the top request with this song title from Spotify
If no song title is given, defaults to search for Mr Jones by the Counting Crows
Song search should be in quotes, but works without them as well

####node liri.js movie-this "movie title"

Will pull up the top request with this movie title from the OMDb api
If no movie title is given,data from the movie 12 Monkeys will be displayed
Movie search should be in quotes, but works without them as well

####node liri.js do-what-it-says

Reads the file "random.txt" and returns a response.

log.txt saves the information of your inquiries
