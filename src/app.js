const express = require("express");
const app = express();
app.use(
  "/user",
  (req, res,next) => {
    next()
    
  },
  (req, res,next) => {
    next()
   
  },
    (req, res) => {
    res.send("3rd route handler");
  },
 
);

app.listen(7777, () => {
  console.log("server is running on port 7777");
});
