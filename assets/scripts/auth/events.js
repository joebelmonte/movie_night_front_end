const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')

let movieID = 0

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  console.log('and the data is ', data)
  if (data.credentials.password === data.credentials.password_confirmation) {
    console.log('passwords are the same')
    $('.sign-up-error').text('')
    api.signUp(data)
      .then(ui.signUpSuccess)
      .then(() => {
        api.signInAuto(data)
          .then(ui.autoSignInSuccess)
          .catch(ui.autoSignInFailure)
      })
      .catch(ui.signUpFailure)
  }
  if (data.credentials.password !== data.credentials.password_confirmation) {
    console.log('passwords are different')
    $('.sign-up-error').text('Your passwords do not match.  Please try again.')
  }
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const signOut = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const getAllMovies = function (event) {
  event.preventDefault()
  api.getUsersMovies()
    .then(ui.getAllMoviesSuccess)
    .catch(ui.getAllMoviesFailure)
}

const onAddNewMovie = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.addNewMovie(data)
    .then(ui.addNewMovieSuccess)
    .then(() => {
      api.getUsersMovies()
        .then(ui.getAllMoviesSuccess)
    })
    .catch(ui.addNewMovieFailure)
}

const showOneMovie = (event) => {
  movieID = $(event.target).attr('data-id')
  api.getSelectedMovie(movieID)
    .then(ui.getSelectedMovieSuccess)
}

const showUpdatedMovie = (movieID) => {
  api.getSelectedMovie(movieID)
    .then(ui.getSelectedMovieSuccess)
}

const onUpdateMovie = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.updateMovie(data, movieID)
    .then(ui.onUpdateMovieSuccess)
    .then(() => {
      showUpdatedMovie(movieID)
    })
    .catch(ui.onUpdateMovieFailure)
}

const onDeleteMovie = function (event) {
  event.preventDefault()
  api.deleteMovie(movieID)
      .then(ui.deleteMovieSuccess)
      .then(() => {
        api.getUsersMovies()
          .then(ui.getAllMoviesSuccess)
      })
      .catch(ui.deleteMovieFailure)
}

let allMovies = {}

const assignAllMovies = function (data) {
  allMovies = data
}

function filterMovies (query) {
  return allMovies.movies.filter(function (el) {
    return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1
  })
}

const onSearchByTitle = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  let filterMoviesResults = []
  const searchCriteria = data.movie.name
  api.getUsersMovies()
    .then(assignAllMovies)
    .then(() => {
      filterMoviesResults = filterMovies(searchCriteria)
      ui.getSearchedMoviesSuccess(filterMoviesResults)
    })
}

const onSearchOMDb = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  const searchCriteria = data.movie.name
  const searchCriteriaForAPI = searchCriteria.split(' ').join('+')
  api.searchOMDb(searchCriteriaForAPI)
    .then(ui.searchOMDbSuccess)
}

const onShowOMDbMovie = function (event) {
  event.preventDefault()
  const movieID = $(event.target).attr('data-id')
  api.showOMDbMovie(movieID)
    .then(ui.showOMDbMovieSuccess)
}

const AddOMDbMovieSuccess = (data) => {
  const movie = { movie: {
    last_viewing: '',
    length: data.Runtime.replace(' min', ''),
    mpaa_rating: data.Rated,
    name: data.Title,
    ownership_status: '',
    ownership_type: '',
    times_watched: '',
    user_rating: '',
    director: data.Director,
    imdbRating: data.imdbRating,
    year_released: data.Year
  }
  }
  api.addNewMovieFromOMDb(movie)
    .then(ui.addNewMovieFromOMDbSuccess)
    .then(() => {
      api.getUsersMovies()
        .then(ui.getAllMoviesSuccess)
    })
    .catch(ui.addNewMovieFromOMDbFailure)
}

const onAddOMDbMovie = function (event) {
  event.preventDefault()
  const movieID = $(event.target).attr('data-id')
  const movieToAdd = api.showOMDbMovie(movieID)
  api.showOMDbMovie(movieID)
    .then(AddOMDbMovieSuccess)
}

const showOnAddNewMovie = function (event) {
  event.preventDefault()
  $('.new-movie-entry-instructions').show()
  $('.your-movies').hide()
  $('#update-movie').hide()
  $('#delete-movie').hide()
  $('.omdb-search-results').hide()
  $('.omdb-search-results-details').hide()
  $('#new-movie').trigger('reset')
  $('#update-movie').trigger('reset')
  $('#search-OMDB').trigger('reset')
  $('#search-by-title').trigger('reset')
}

const hideOnAddNewMovie = function (event) {
  event.preventDefault()
  $('.new-movie-entry-instructions').hide()
  $('#new-movie').trigger('reset')
}

const onCancelOMDbSearch = function (event) {
  event.preventDefault()
  $('#search-OMDB').trigger('reset')
  $('.omdb-search-results').hide()
  $('.omdb-search-results-details').hide()
  $('#search-by-title').trigger('reset')
}

const onBackToOMDbSearch = function (event) {
  event.preventDefault()
  $('.omdb-search-results').show()
  $('.omdb-search-results-details').hide()
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#signOut').on('submit', signOut)
  $('#new-movie').on('submit', onAddNewMovie)
  $('#show-all-movies').on('submit', getAllMovies)
  $('.all-movies-table').on('click', showOneMovie)
  $('#update-movie').on('submit', onUpdateMovie)
  $('#delete-movie').on('submit', onDeleteMovie)
  $('#search-by-title').on('submit', onSearchByTitle)
  $('#search-OMDB').on('submit', onSearchOMDb)
  $('.search-OMDB-movies-table').on('click', onShowOMDbMovie)
  $('.OMDB-movie-detail-table').on('click', onAddOMDbMovie)
  $('.input-new-movie').on('click', showOnAddNewMovie)
  $('.cancel-input-new-movie').on('click', hideOnAddNewMovie)
  $('.cancel-OMDb-Search').on('click', onCancelOMDbSearch)
  $('.back-to-OMDb-search').on('click', onBackToOMDbSearch)
}

module.exports = {
  addHandlers
}
