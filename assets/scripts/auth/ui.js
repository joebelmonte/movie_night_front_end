const store = require('../store.js')
const showMoviesTemplate = require('../templates/movie-listing.handlebars')
const showMovieTemplate = require('../templates/single-movie-listing.handlebars')
const showOMDbSearchTemplate = require('../templates/movie-listing-OMDB-search.handlebars')
const showOMDbSingleMovie = require('../templates/single-movie-listing-OMDb.handlebars')

const signUpSuccess = (data) => {
    console.log("In signUpSuccess")
  $('#AccountCreationSuccess').modal('show')
}

const signUpFailure = (error) => {
  // console.error(error)
    console.log("In onSignFailure")
  $('#AccountCreationFailure').modal('show')
}

const signInSuccess = (data) => {
  store.user = data.user
  console.log("on signInSuccess")
  console.log(data.user)
  $('#signOut').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#change-password').show()
  $('#LogInSuccess').modal('show')
}

const signInFailure = (error) => {
  console.error(error)
  console.log("in signInFailure")
  $('#LogFailure').modal('show')
}

const autoSignInSuccess = (data) => {
  store.user = data.user
  console.log("auto sign in success")
  console.log(data.user)
  $('#signOut').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('#change-password').show()
}

const autoSignInFailure = (error) => {
  // console.error(error)
  console.log("auto sign in failure")
  $('#LogFailure').modal('show')
}

const changePasswordSuccess = (data) => {
  console.log('change password success')
  $('#passWordChangeSuccess').modal('show')
  // document.getElementById("change-password").reset()
  // $('#change-password').reset()
  $('#change-password').trigger('reset')
}

const changePasswordFailure = (data) => {
  console.log('change password failure')
  $('#passWordChangeFailure').modal('show')
  $('#change-password').trigger('reset')
}

const signOutSuccess = (data) => {
  store.user = null
  console.log("Sign out success.")
  $('#sign-up').show()
  $('#sign-in').show()
  $('#signOut').hide()
  $('#change-password').hide()
  $('#signOutSuccess').modal('show')
  $('#sign-up').trigger('reset')
  $('#sign-in').trigger('reset')
}

const signOutFailure = (data) => {
  console.log('sign out failure')
  $('#sign-up').show()
  $('#sign-in').show()
}

const addNewMovieSuccess = (data) => {
  console.log('in addNewMovieSuccess ')
  $('#createMovieSuccess').modal('show')
  $('#new-movie').trigger('reset')
}

const onUpdateMovieSuccess = (data) => {
  console.log('in onUpdateMovieSuccess ')
  $('#update-movieSuccess').modal('show')
  $('#update-movie').trigger('reset')
}

const onUpdateMovieFailure = (data) => {
  console.log('in onUpdateMovieFailure ')
  $('#update-movieFailure').modal('show')
}

const addNewMovieFailure = (data) => {
  console.log('in addNewMovieFailure ')
  $('#createMoviefailure').modal('show')
}

function dynamicSort (property) {
  let sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function (a, b) {
    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
    return result * sortOrder
  }
}

const getAllMoviesSuccess = (data) => {
  console.log('the response is ' + data)
  console.log('data.movies is' + data.movies)
  console.log('the length of the movie array is ' + data.movies.length)
  console.log('the first movie is ' + data.movies[0])
  const sortedMovies = data.movies.sort(dynamicSort('name'))
  const showMoviesHTML = showMoviesTemplate({ movies: sortedMovies })
  $('.all-movies-table').html(showMoviesHTML)
}

const getSearchedMoviesSuccess = (data) => {
  console.log('In getSearchedMoviesSuccess and the data is ', data)
  const sortedMovies = data.sort(dynamicSort('name'))
  const showMoviesHTML = showMoviesTemplate({ movies: sortedMovies })
  $('.all-movies-table').html(showMoviesHTML)
  $('#search-by-title').trigger('reset')
}

const getSelectedMovieSuccess = (data) => {
  console.log('in getSelectedMovieSuccess and the data is ', data)
  console.log('in getSelectedMovieSuccess and the data.movie is ', data.movie)
  console.log('in getSelectedMovieSuccess and the data.movie.name is ', data.movie.name)
  const showMovieHTML = showMovieTemplate({ movies: data })
  $('.all-movies-table').html(showMovieHTML)
  // $('.rows').click(function () {
  //   alert('click')
  // })
}

const searchOMDbSuccess = (data) => {
  console.log('in searchOMDbSuccess and the data is ', data)
  console.log('in searchOMDbSuccess and the data.Search is ', data.Search)
  const sortedMovies = data.Search.sort(dynamicSort('Title'))
  console.log('sorted movies is: ', sortedMovies)
  const showMovieHTML = showOMDbSearchTemplate({ movies: sortedMovies })
  $('.search-OMDB-movies-table').html(showMovieHTML)
}

const showOMDbMovieSuccess = (movie) => {
  console.log('in showOMDbMovieSuccess and the data is ', movie)
  console.log('movie.Title is ', movie.Title)
  const singleMovieArray = []
  singleMovieArray.push(movie)
  console.log('singleMovieArray is ', singleMovieArray)
  const showMovieHTML = showOMDbSingleMovie({ movies: singleMovieArray })
  // console.log('showMovieHTML is ', showMovieHTML)
  $('.OMDB-movie-detail-table').html(showMovieHTML)
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
  showOMDbMovieSuccess
}
