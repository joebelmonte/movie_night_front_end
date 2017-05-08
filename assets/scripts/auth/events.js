const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')

let movieID = 0

const onSignUp = function (event) {
  console.log("In onSignUp")
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .then(() => {
      api.signInAuto(data)
        .then(ui.autoSignInSuccess)
        .catch(ui.autoSignInFailure)
    })
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
  console.log("completed onSignIn")
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

const onAddNewMovie = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log(data)
  // console.log(data.submit)
  // console.log(data.movie.name)
  api.addNewMovie(data)
    .then(ui.addNewMovieSuccess)
    .catch(ui.addNewMovieFailure)
  console.log('completed onSignIn')
}

const getAllMovies = function (event) {
  event.preventDefault()
  // console.log(data)
  // console.log(data.submit)
  // console.log(data.movie.name)
  console.log('result of the api call for all movies is ', api.getUsersMovies())
  api.getUsersMovies()
    .then(ui.getAllMoviesSuccess)
    // .catch(ui.addNewMovieFailure)
  console.log('completed get users movies')
}

const showOneMovie = (event) => {
  console.log('In showOneMovie')
  // console.log(event)
  console.log($(event.target).attr('data-id'))
  movieID = $(event.target).attr('data-id')
  console.log('movieID is ', movieID)
  api.getSelectedMovie(movieID)
    .then(ui.getSelectedMovieSuccess)
}

const showUpdatedMovie = (movieID) => {
  console.log('In showUpdatedMovie and movie id is', movieID)
  api.getSelectedMovie(movieID)
    .then(ui.getSelectedMovieSuccess)
}

const onUpdateMovie = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('In onUpdateMovie and data is', data)
  api.updateMovie(data, movieID)
    .then(ui.onUpdateMovieSuccess)
    .then(() => {
      showUpdatedMovie(movieID)
    })
    .catch(ui.onUpdateMovieFailure)
}

const onDeleteMovie = function (event) {
  event.preventDefault()
  // const data = getFormFields(this)
  console.log('In onDeleteMovie and movieID is', movieID)
  api.deleteMovie(movieID)
}

let allMovies = {}

const assignAllMovies = function (data) {
  allMovies = data
  console.log('in assignAllMovies and data is ', allMovies)
}

function filterMovies (query) {
  console.log('in filterMovies and allMovies is', allMovies)
  return allMovies.movies.filter(function (el) {
    return el.name.toLowerCase().indexOf(query.toLowerCase()) > -1
  })
}

const onSearchByTitle = function (event) {
  event.preventDefault()
  console.log('In onSearchByTitle')
  const data = getFormFields(this)
  console.log(data)
  console.log(data.movie.name)
  let filterMoviesResults = []
  // allMovies = api.getUsersMovies()
  // console.log('in onSeachByTitle and allMovies is ', allMovies)
  const searchCriteria = data.movie.name
  console.log('search criteria is ', searchCriteria)
  api.getUsersMovies()
    .then(assignAllMovies)
    .then(() => {
      filterMoviesResults = filterMovies(searchCriteria)
      console.log('the result of the filter is ', filterMoviesResults)
      ui.getSearchedMoviesSuccess(filterMoviesResults)
    })
  // console.log('right before I send it to the filter allMovies is ', allMovies)
  // const filterMoviesResults = filterMovies(searchCriteria)
  // console.log('the filtered movies are: ', filterMoviesResults)
  // console.log('the result of the filter is ', filterMoviesResults)
}

const onSearchOMDb = function (event) {
  event.preventDefault()
  console.log('In onSearchByTitle2')
  const data = getFormFields(this)
  console.log('Get form fields is ', data)
  const searchCriteria = data.movie.name
  console.log('searchCriteria is ', searchCriteria)
  const searchCriteriaForAPI = searchCriteria.split(' ').join('+')
  console.log('searchCriteriaForAPI is ', searchCriteriaForAPI)
  api.searchOMDb(searchCriteriaForAPI)
    .then(ui.searchOMDbSuccess)
}

const onShowOMDbMovie = function (event) {
  event.preventDefault()
  console.log('In showOMDbMovie')
  console.log($(event.target).attr('data-id'))
  const movieID = $(event.target).attr('data-id')
  console.log(movieID)
  api.showOMDbMovie(movieID)
    .then(ui.showOMDbMovieSuccess)
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
}

module.exports = {
  addHandlers
}
