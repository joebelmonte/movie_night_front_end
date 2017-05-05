const store = require('../store.js')

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
  console.log("sign out failure")
  $('#sign-up').show()
  $('#sign-in').show()
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
  autoSignInFailure
}
