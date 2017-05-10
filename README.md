# MyMDb
## Joe Belmonte - May 10 2017
## General Assembly, WDI-017

## URLs

-   [Front End Repo](https://github.com/joebelmonte/movie_night_front_end/)
-   [Back End Deployed](https://joebelmonte.github.io/movie_night_front_end//)
-   [Back End Repo](https://github.com/joebelmonte/movie_night_back_end/)
-   [Back End Deployed](https://salty-badlands-93517.herokuapp.com/)


## Planning, Development, and Problem Solving

My app is called MyMDb, a play on IMDb - because it's designed to be a personal movie database.

The idea was to build a personal database of movies that a user could populate and maintain
that included various datapoints about each movie - title, director, MPAA rating, a personal assessment
from the user, number of times watched, date of last viewing, etc.

I used HTML/CSS/JavaScript for the front end and a rails DB for the back end.

The database itself is a relatively simple 1 to many relationship between users and movies.

I wanted my app to be highly functional and easy to use.  Therefore, I spent a lot of time
on some features that don't necessarily standout in the abstract but would be sorely missed
if they were to be taken away.

For example, when the user shows all movies in their DB, I have them sorted in alphabetical
order in the table.  In order to do this, I found a JavaScript function that can sort
an object based on the value of a specified key.  When the app receives the object containing
the user's  movies, it's sent through this function prior to being sent to handlebars for
display on the page.

I also built in the ability to search by film name.  Again, I had to find a JavaScript
function that would filter an array of objects and modify that to handle the data passed
back from the API.

Since I had some extra time, I decided to tackle one of the additional challenges of
incorporating a 3rd party API.  IMDb would have been ideal, but they don't have an official
I found the Open Movie Database (http://www.omdbapi.com/) which is a user supported
API that I found to be fairly accurate and easy to incorporate into my site.

In general, I spent a lot of time thinking about what elements of the page should be displayed/
hidden based on user action - what would be simplest/easiest/most intuitive for the user.

## Unsolved Problems/Enhancements

I don't believe my current app has any bugs or is missing any features that are
necessary for meeting requirements.  However, there were a number of features I
would have liked to implement given more time.  For example:

* Better overall aesthetic/prettier in general.
* Make the search feature for the user database dynamic, meaning you would see
search results after each keystroke.
* Ability to sort on any field
* Ability to search based on multiple criteria in addition to name.
* Ability to update data for a movie currently in the user DB based on data in the
OMDb.
* Ability to check for duplicates on entry into the database.

## Wireframes and User Stories

* Wireframes can be found in this repo (Belmonte-WDI-017-Project-2-Wireframes-2017-04-27.pdf)

* Here are a few of the user stories that I wrote before starting.  Some of them
haven't been fully implemented yet.

1.	See a list of movies that I could potentially watch, and filter by the fields above to answer questions like the following:
  a.	What movies have I watched recently?
  b.	What movies have I not watched in a while?
  c.	What movies should I consider watching that I haven’t before?
  d.	What movies have I watched many times?
  e.	What movies do I rate the highest?
2.	Have the DB pick a random movie for me to watch
  a.	Subject to some criteria, i.e., I own it but haven’t watched it recently or it’s below a given length.
3.	Easily record each time I watch a movie. Timestamp should auto-update and counter should increment.
