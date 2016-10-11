// ==== code written on Oct 10, 2016, -LIRI- © George Ramirez ====

// All require files needed for app

    var fs = require('fs');
    var twitter = require('twitter');
    var spotify = require('spotify');
    var request = require('request');
    var inquirer = require('inquirer');
    var keys = require('./keys');
    // var responseData = "";
    


// user input
var ask = process.argv[2];
var titleTrack = process.argv[3];

// Data needed for Twitter api
var grphoto = new twitter(keys.twitterKeys)
var params = {screen_name: 'grphoto1111', count: 20};

// function switch based on user input
switch(ask){

    case 'my-tweets':
        Tweets();
        break;

    case 'spotify-this-song':
        Spotify();
        break;

    case 'movie-this':
        movie();
        break;

    case 'do-what-it-says':
        Random();
        break;

    default:
    console.log("Invalid input, please select: 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says', thank you. ")
};

//                  === callbacks ===

// === Titter ===

function Tweets(){
        grphoto.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                // console.log(tweets);
                for(var i = 0; i < 20; i++) {
                        console.log(tweets[i].text);
                        console.log("Created At: " + tweets[i].created_at);
                        console.log("===================================");

	  		fs.appendFile("log.txt", tweets[i].text + "\nCreated At: " + tweets[i].created_at + "\n \n", function(err){
                  if(err) 
                  throw err;});

                }
            }
        });
    };
// === end of Tweet call back & write to log.txt ===

//  === Spotify ===

function Spotify(){
    // if no song is provided your default response will be mr jones from the counting crows
    if (titleTrack == undefined){

        spotify.search({ type: 'track', query: 'mr jones' }, function(err, data) {
                if ( err ) {
                    console.log('Error occurred: ' + err);
                    return;
                }
            
                // console.log(data);
                console.log("===DEFAULT SPOTIFY DATA=== artist : " + data.tracks.items[0].artists[0].name);
                console.log("===DEFAULT SPOTIFY DATA=== song : " + data.tracks.items[0].name);
                console.log("===DEFAULT SPOTIFY DATA=== link: " + data.tracks.items[0].preview_url);
                console.log("===DEFAULT SPOTIFY DATA=== album : " + data.tracks.items[0].album.name);
            });

    }else{

                spotify.search({ type: 'track', query: titleTrack }, function(err, data) {
                if ( err ) {
                    console.log('Error occurred: ' + err);
                    return;
                }
            
                // console.log(data);
                console.log("\n============Spotify Data================\n")
                console.log("artist : " + data.tracks.items[0].artists[0].name);
                console.log("song : " + data.tracks.items[0].name);
                console.log("link: " + data.tracks.items[0].preview_url);
                console.log("album : " + data.tracks.items[0].album.name);
                console.log("\n============End of Spotify Data================\n")

                fs.appendFile("log.txt", "\n====== Spotify Data ======\n\nSong Name: " + data.tracks.items[0].name + "\nArtist: " +
                data.tracks.items[0].artists[0].name + "\nAlbum: " + data.tracks.items[0].album.name +
                "\nPreview Link: " + data.tracks.items[0].preview_url + "\n\n", function(err) {if(err) throw err;});
            });
    };

};/**End of Spitify function */

//  === End of Spotify ===

//  === OMDB ===

function movie(){

    // if no movie is provided your default response will be ocean's eleven
    if (titleTrack == undefined){

        request("http://www.omdbapi.com/?t=12+monkeys&tomatoes=true&y=&plot=short&r=json", function (error, response, body) {

        if (!error && response.statusCode == 200) {


            // console.log("The movie's rating is: " + JSON.parse(body)["imdbRating"]);
            console.log("==DEFAULT==This movie's title is: " + JSON.parse(body).Title);
            console.log("==DEFAULT==This movie was released in: " + JSON.parse(body).Year);
            console.log("==DEFAULT==This movie is rated: " + JSON.parse(body).Rated);
            console.log("==DEFAULT==This movie was made in: " + JSON.parse(body).Country);
            console.log("==DEFAULT==This movie is in : " + JSON.parse(body).Language);
            console.log("==DEFAULT==This movie's plot is: " + JSON.parse(body).Plot);
            console.log("==DEFAULT==This movie's actors include: " + JSON.parse(body).Actors);
            console.log("==DEFAULT==This movie's Tomato Rating is: " + JSON.parse(body).tomatoRating);
            console.log("==DEFAULT==A link to reviews can be found here: " + JSON.parse(body).tomatoURL);
            console.log("==DEFAULT==This movie's made this much at the Boxoffice: " + JSON.parse(body).BoxOffice);
            // console.log(JSON.parse(body));
            
            }
    });/*end of default request*/

    }else{

        request('http://www.omdbapi.com/?t='+titleTrack+'&tomatoes=true&y=&plot=short&r=json', function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode == 200) {


                    // console.log("The movie's rating is: " + JSON.parse(body)["imdbRating"]);
                    console.log("This movie's title is: " + JSON.parse(body).Title);
                    console.log("This movie was released in: " + JSON.parse(body).Year);
                    console.log("This movie is rated: " + JSON.parse(body).Rated);
                    console.log("This movie was made in: " + JSON.parse(body).Country);
                    console.log("This movie is in : " + JSON.parse(body).Language);
                    console.log("This movie's plot is: " + JSON.parse(body).Plot);
                    console.log("This movie's actors include: " + JSON.parse(body).Actors);
                    console.log("This movie's Tomato Rating is: " + JSON.parse(body).tomatoRating);
                    console.log("A link to reviews can be found here: " + JSON.parse(body).tomatoURL);
                    console.log("This movie's made this much at the Boxoffice: " + JSON.parse(body).BoxOffice);
                    // console.log(JSON.parse(body));
                    
                    fs.appendFile("log.txt", "\n====== Movie Data ======\n\nMovie Title: " + JSON.parse(body).Title
                     + "\nReleased: " + JSON.parse(body).Year
                     + "\nRated: " + JSON.parse(body).Rated
                     + "\nMade in: " + JSON.parse(body).Country
                     + "\nLanguage in: " + JSON.parse(body).Language 
                     + "\nPlot Summary: " + JSON.parse(body).Plot
                     + "\nActors Include: " + JSON.parse(body).Actors
                     + "\nTomato Rating: " + JSON.parse(body).tomatoRating
                     + "\nLink to Reviews: " + JSON.parse(body).tomatoURL
                     + "\nMoney made at Boxoffice: " + JSON.parse(body).BoxOffice 
                     + "\n\n", function(err) {if(err) throw err;});


                    }
            });/*end of request*/

    };/*End of Else */

};/* end of movie function*/
//    === End OMDB ===

//    === Random ===
function Random(){

            fs.readFile("random.txt", "utf8", function(err, data){
            // console.log(data);
            var dArray = data.split(',');
            // console.log(dArray);
            var dArray2 = dArray.splice(1,dArray.length).toString();
            var dArray3 = dArray2.replace(/"/g, "");
            // console.log(dArray3);
            

                    spotify.search({ type: 'track', query: dArray3 }, function(err, data) {
                                if ( err ) {
                                    console.log('Error occurred: ' + err);
                                    return;
                                }
                            
                                // console.log(data);
                                console.log("artist : " + data.tracks.items[0].artists[0].name);
                                console.log("song : " + data.tracks.items[0].name);
                                console.log("link: " + data.tracks.items[0].preview_url);
                                console.log("album : " + data.tracks.items[0].album.name);

                                fs.appendFile("log.txt", "\n====== Do What It Says Info ======\n\nArtist: " + data.tracks.items[0].artists[0].name
                                + "\nSong: " + data.tracks.items[0].name
                                + "\nLink: " + data.tracks.items[0].preview_url
                                + "\nAlbum: " + data.tracks.items[0].album.name
                                + "\n\n", function(err) {if(err) throw err;});

                            });
            });

};/**end of Random fucntion */

//    === End Random ===


//              === END callbacks ====

