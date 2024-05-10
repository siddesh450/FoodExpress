import { fetchData } from "./main.js"

let regform = document.getElementById("regform")

if(regform) regform.addEventListener('submit', register)

function register(e) {
  e.preventDefault()
  let firstname = document.getElementById("fname").value
  let lastname = document.getElementById("lname").value
  let username = document.getElementById("Username").value
  let password = document.getElementById("Password").value
  let cPassword = document.getElementById("Confirm_Password").value
  let email = document.getElementById("email").value

  if (Password !== Confirm_Password) {
    document.querySelector(".error").innerText = "Passwords Must Match!"
    document.getElementById("Password").value = ""
    document.getElementById("Confirm_Password").value = ""
  } else {
    const user = {
      Username: username,
      Password: password,
      Email: email
    }
    // make a call to the server
    fetchData('/users/register', user, 'POST')
      .then(data => {
        if (!data.message) {
          setCurrentUser(data)
          window.location.href = "index.html"
        }
      })
      .catch(err => {
        let error = document.querySelector(".error")
        error.innerHTML = `${err.message}`
      })

    document.getElementById("welcome").innerText = `Welcome ${username}!`
  }

}

let logForm = document.getElementById("signin")

if(signin) signin.addEventListener('submit', login)

function login(e) {
  e.preventDefault()

  let username = document.getElementById("Username").value
  let password = document.getElementById("Password").value

  const user = {
    Username: username,
    Password: password
  }
  // make a call to the server
  fetchData('/users/login', user, 'POST')
    .then(data => {
      if (!data.message) {
        setCurrentUser(data)
        window.location.href = "index.html"
      }
    })
    .catch(err => {
      let error = document.querySelector(".error")
      error.innerHTML = `${err.message}`
    })

  document.getElementById("welcome").innerText = `Welcome ${username}!`
}

// code to add event listener to third form of some kind
function someOtherFunction(e) {
  // your code to read in your third form
}

// configuring local storage
function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'))
}

function removeUser() {
  localStorage.removeItem('user')
  window.location.href = 'index.html'
}

export {getCurrentUser, setCurrentUser, removeUser}