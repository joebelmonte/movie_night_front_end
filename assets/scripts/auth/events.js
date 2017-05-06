const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')
const getFormFieldsNoEmptyStrings = require(`../../../lib/get-form-fields-remove-empty-strings`)

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

const addNewMovie = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  // console.log(data)
  // console.log(data.submit)
  // console.log(data.movie.name)
  api.addNewMovie(data)
    // .then(ui.addNewMovieSuccess)
    // .catch(ui.addNewMovieFailure)
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

// const onUpdateMovie = (event) => {
//   event.preventDefault()
//   console.log('In onUpdateMovie')
//   console.log('movieID is ', movieID)
//   const data = getFormFields(this)
//   // api.UpdateMovie(data, movieID)
//     // .then(ui.UpdateMovieSuccess)
// }

const onUpdateMovie = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('In onUpdateMovie and data is', data)
  api.updateMovie(data, movieID)
}

const onDeleteMovie = function (event) {
  event.preventDefault()
  // const data = getFormFields(this)
  console.log('In onDeleteMovie and movieID is', movieID)
  api.deleteMovie(movieID)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#signOut').on('submit', signOut)
  $('#new-movie').on('submit', addNewMovie)
  $('#show-all-movies').on('submit', getAllMovies)
  $('.all-movies-table').on('click', showOneMovie)
  $('#update-movie').on('submit', onUpdateMovie)
  $('#delete-movie').on('submit', onDeleteMovie)
}

module.exports = {
  addHandlers
}
