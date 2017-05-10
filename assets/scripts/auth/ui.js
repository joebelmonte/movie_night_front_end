const store = require('../store.js')
const showMoviesTemplate = require('../templates/movie-listing.handlebars')
const showMovieTemplate = require('../templates/single-movie-listing.handlebars')
const showOMDbSearchTemplate = require('../templates/movie-listing-OMDB-search.handlebars')
const showOMDbSingleMovie = require('../templates/single-movie-listing-OMDb.handlebars')

const signUpSuccess = (data) => {
  $('#AccountCreationSuccess').modal('show')
}

const signUpFailure = (error) => {
  console.error(error)
  $('#AccountCreationFailure').modal('show')
}

const signInSuccess = (data) => {
  store.user = data.user
  $('#signOut').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#change-password').show()
  $('#LogInSuccess').modal('show')
  $('.status-message').text('Use the buttons to the left to view your database, or search IMDB via the Open Movie Database.')
  $('.movie-controls').show()
}

const signInFailure = (error) => {
  console.error(error)
  $('#LogFailure').modal('show')
}

const autoSignInSuccess = (data) => {
  store.user = data.user
  $('#signOut').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#change-password').show()
  $('.status-message').text('Use the buttons to the left to view your database, or search IMDB via the Open Movie Database.')
  $('.movie-controls').show()
}

const autoSignInFailure = (error) => {
  console.error(error)
  $('#LogFailure').modal('show')
}

const changePasswordSuccess = (data) => {
  $('#passWordChangeSuccess').modal('show')
  // document.getElementById("change-password").reset()
  // $('#change-password').reset()
  $('#change-password').trigger('reset')
}

const changePasswordFailure = (data) => {
  $('#passWordChangeFailure').modal('show')
  $('#change-password').trigger('reset')
}

const signOutSuccess = (data) => {
  store.user = null
  $('#sign-up').show()
  $('#sign-in').show()
  $('#signOut').hide()
  $('#change-password').hide()
  $('#signOutSuccess').modal('show')
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
  $('#change-password').trigger('reset')
  $('#new-movie').trigger('reset')
  $('#update-movie').trigger('reset')
  $('#search-by-title').trigger('reset')
  $('#search-OMDB').trigger('reset')
  $('.your-movies').hide()
  $('#update-movie').hide()
  $('#delete-movie').hide()
  $('.omdb-search-results').hide()
  $('.omdb-search-results-details').hide()
  $('.new-movie-entry-instructions').hide()
  $('.movie-controls').hide()
}

const signOutFailure = (data) => {
  $('#sign-up').show()
  $('#sign-in').show()
}

const addNewMovieSuccess = (data) => {
  $('#createMovieSuccess').modal('show')
  $('#new-movie').trigger('reset')
  $('.new-movie-entry-instructions').hide()
}

const onUpdateMovieSuccess = (data) => {
  $('#update-movieSuccess').modal('show')
  $('#update-movie').trigger('reset')
}

const onUpdateMovieFailure = (data) => {
  $('#update-movieFailure').modal('show')
}

const addNewMovieFailure = (data) => {
  $('#createMoviefailure').modal('show')
}

function dynamicSort (property) {
  let sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function (a, b) {
    const result = (a[property].toUpperCase() < b[property].toUpperCase()) ? -1 : (a[property].toUpperCase() > b[property].toUpperCase()) ? 1 : 0
    return result * sortOrder
  }
}

const getAllMoviesSuccess = (data) => {
  const sortedMovies = data.movies.sort(dynamicSort('name'))
  const showMoviesHTML = showMoviesTemplate({ movies: sortedMovies })
  $('.all-movies-table').html(showMoviesHTML)
  $('#update-movie').hide()
  $('#delete-movie').hide()
  $('.omdb-search-results').hide()
  $('.omdb-search-results-details').hide()
  $('.new-movie-entry-instructions').hide()
  $('.your-movies').show()
  $('.your-movies-subheading').text('Click on a movie to edit it.')
  $('#search-OMDB').trigger('reset')
  $('#search-by-title').trigger('reset')
}

const getSearchedMoviesSuccess = (data) => {
  const sortedMovies = data.sort(dynamicSort('name'))
  const showMoviesHTML = showMoviesTemplate({ movies: sortedMovies })
  $('.all-movies-table').html(showMoviesHTML)
  $('#search-by-title').trigger('reset')
  $('#update-movie').hide()
  $('#delete-movie').hide()
  $('.omdb-search-results').hide()
  $('.omdb-search-results-details').hide()
  $('.new-movie-entry-instructions').hide()
  $('.your-movies').show()
  $('#search-OMDB').trigger('reset')
}

const getSelectedMovieSuccess = (data) => {
  const showMovieHTML = showMovieTemplate({ movies: data })
  $('.all-movies-table').html(showMovieHTML)
  $('#update-movie').show()
  $('#delete-movie').show()
  $('.your-movies-subheading').text('Use the form below to update information about the movie or delete it from your database')
  $('.omdb-search-results').hide()
  $('.omdb-search-results-details').hide()
  $('.new-movie-entry-instructions').hide()
}

const searchOMDbSuccess = (data) => {
  const sortedMovies = data.Search.sort(dynamicSort('Title'))
  const showMovieHTML = showOMDbSearchTemplate({ movies: sortedMovies })
  $('.search-OMDB-movies-table').html(showMovieHTML)
  $('.omdb-search-results').show()
  $('.omdb-search-results-details').hide()
  $('.your-movies').hide()
  $('#update-movie').hide()
  $('#delete-movie').hide()
  $('.new-movie-entry-instructions').hide()
  $('#search-by-title').trigger('reset')
}

const showOMDbMovieSuccess = (movie) => {
  const singleMovieArray = []
  singleMovieArray.push(movie)
  const showMovieHTML = showOMDbSingleMovie({ movies: singleMovieArray })
  $('.OMDB-movie-detail-table').html(showMovieHTML)
  $('.omdb-search-results-details').show()
  $('.omdb-search-results').hide()
}

const deleteMovieSuccess = (data) => {
  $('#delete-movie-success').modal('show')
  $('#update-movie').hide()
  $('#delete-movie').hide()
}

const deleteMovieFailure = (error) => {
  console.error(error)
  $('#delete-movie-failure').modal('show')
}

const addNewMovieFromOMDbSuccess = (data) => {
  $('#add-OMDB-success').modal('show')
  $('.omdb-search-results-details').hide()
  $('#search-OMDB').trigger('reset')
}

const addNewMovieFromOMDbFailure = (error) => {
  console.error(error)
  $('#add-OMDb-movie-failure').modal('show')
}

const getAllMoviesFailure = (error) => {
  console.error(error)
  $('#get-All-Movies-Failure').modal('show')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  autoSignInSuccess,
  autoSignInFailure,
  getAllMoviesSuccess,
  getSelectedMovieSuccess,
  addNewMovieSuccess,
  addNewMovieFailure,
  onUpdateMovieSuccess,
  onUpdateMovieFailure,
  getSearchedMoviesSuccess,
  searchOMDbSuccess,
  showOMDbMovieSuccess,
  deleteMovieSuccess,
  deleteMovieFailure,
  addNewMovieFromOMDbSuccess,
  addNewMovieFromOMDbFailure,
  getAllMoviesFailure
}
