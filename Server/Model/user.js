const con = require("./db_connect")

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS User (
    UserID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(255) NOT NULL UNIQUE,
    LastName VARCHAR(255) NOT NULL UNIQUE,
    Username VARCHAR(255) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    CONSTRAINT userPK PRIMARY KEY(userID)
  );`

  await con.query(sql);  
}

createTable()

// CRUD functions will go here 
//R for READ -- get all users
async function getAllUsers() {
  let sql = `SELECT * FROM user;`
  return await con.query(sql)
}

async function userExists(Username) {
  let sql = `SELECT * FROM user 
    WHERE Username = "${Username}"
  `
  return await con.query(sql) 
}

async function emailExists(Email) {
  let sql = `SELECT * FROM user 
    WHERE Email = "${Email}"
  `
  return await con.query(sql) 
}

 let user = {
  FirstName: "J",
  LastName: "Doe",
  Username: "jake",
  Email: "JJ@fakemail.com",
  Password: "icecream123"
 }
// register(user)`
// login(user)

// CREATE in CRUD

async function register(user) {
  
  let cUser = await userExists(user.Username)
  if(cUser.length > 0) throw Error("Username Already in Use!")
  
  let email = await emailExists(user.Email)
  if(email.length > 0) throw Error("Account with Email already in use")

  let sql = `
    INSERT INTO User(FirstName,LastName,Username, Password, Email)
    VALUES("${user.FirstName}", "${user.LastName}",  "${user.Username}", "${user.Password}", "${user.Email}")
  `
  await con.query(sql)
  const u = await userExists(user.Username)
  console.log(u)
  return u[0]
}


// READ in CRUD
async function login(user) {
  let currentUser = await userExists(user.Username)
  if(!currentUser[0]) throw Error("Username does not exist!")
  if(user.Password !== currentUser[0].Password) throw Error("Password does not match!")

  return currentUser[0]
}

// UPDATE in CRUD
async function editUsername(user) {
  let sql = `
    UPDATE User SET
    Username = "${user.Username}"
    WHERE UserID = ${user.UserID}
  `
  await con.query(sql)

  let updatedUser = await userExists(user.Username)
  return updatedUser[0]
}

// DELETE in CRUD
async function deleteAccount(user) {
  let sql = `
    DELETE FROM User
    WHERE UserID = ${user.UserID}
  `
  await con.query(sql)
}

module.exports = { getAllUsers, login, register, editUsername, deleteAccount }