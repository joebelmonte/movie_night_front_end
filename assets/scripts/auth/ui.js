const store = require('../store.js')
const showMoviesTemplate = require('../templates/movie-listing.handlebars')
const showMovieTemplate = require('../templates/single-movie-listing.handlebars')

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

const getAllMoviesSuccess = (data) => {
  console.log('the response is ' + data)
  console.log('the name of movie 1 ' + data.movies[0].name)
  console.log('the length of the movie array is ' + data.movies.length)
  const showMoviesHTML = showMoviesTemplate({ movies: data.movies })
  $('tbody').html(showMoviesHTML)
  // $('.rows').click(function () {
  //   alert('click')
  // })
}

const getSelectedMovieSuccess = (data) => {
  console.log('in getSelectedMovieSuccess and the data is ', data)
  console.log('in getSelectedMovieSuccess and the data.movie is ', data.movie)
  console.log('in getSelectedMovieSuccess and the data.movie.name is ', data.movie.name)
  const showMovieHTML = showMovieTemplate({ movies: data })
  $('tbody').html(showMovieHTML)
  // $('.rows').click(function () {
  //   alert('click')
  // })
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
  getSelectedMovieSuccess
}
