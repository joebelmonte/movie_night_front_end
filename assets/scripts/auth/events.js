const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')

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
  console.log($(event.target).attr("data-id"))
  // console.log(event.currentTarget)
  // console.log((event.target).attr("data-id"))
  console.log('the id of the book to be deleted is ', event)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#signOut').on('submit', signOut)
  $('#new-movie').on('submit', addNewMovie)
  $('#show-all-movies').on('submit', getAllMovies)
  $('.all-movies-table').on('click', showOneMovie)
}

module.exports = {
  addHandlers
}
