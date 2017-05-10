const config = require('../config.js')
const store = require('../store.js')

const signUp = (data) => {
  console.log('in signUp and data is ', data)
  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

const signInAuto = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const addNewMovie = (data) => {
  console.log('in addNewMovie and data is ', data)
  return $.ajax({
    url: config.apiOrigin + '/movies',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const addNewMovieFromOMDb = (movie) => {
  console.log('in addNewMovie and data is ', movie)
  return $.ajax({
    url: config.apiOrigin + '/movies',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: movie
  })
}

const getUsersMovies = (data) => {
  return $.ajax({
    url: config.apiOrigin + '/movies',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getSelectedMovie = (movieID) => {
  return $.ajax({
    url: config.apiOrigin + '/movies/' + movieID,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateMovie = (data, movieID) => {
  return $.ajax({
    url: config.apiOrigin + '/movies/' + movieID,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteMovie = (movieID) => {
  return $.ajax({
    url: config.apiOrigin + '/movies/' + movieID,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const searchOMDb = (data) => {
  return $.ajax({
    url: 'https://www.omdbapi.com/?s=' + data,
    method: 'GET'
  })
}

const showOMDbMovie = (data) => {
  return $.ajax({
    url: 'https://www.omdbapi.com/?i=' + data,
    method: 'GET'
  })
}

module.exports = {
  signUp,
  signIn,
  signInAuto,
  changePassword,
  signOut,
  addNewMovie,
  getUsersMovies,
  getSelectedMovie,
  updateMovie,
  deleteMovie,
  searchOMDb,
  showOMDbMovie,
  addNewMovieFromOMDb
}
