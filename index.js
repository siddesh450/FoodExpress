const express = require("express")
const app = express()

app.use(express.json()); // parses JSON bodies

const loginroutes = require("./Server/Routes/login")
const registerroutes = require("./Server/Routes/register")

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use('/login', loginroutes);

app.use('/register', registerroutes);
// app.use('/recipe', recipeRoutes)


const PORT = process.env.PORT || 5500

app.listen(PORT, () => console.log(`Server started!! Listening on port ${PORT}!!! :)`))