const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();
const path = require('path')
const multer = require('multer');

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


app.use(passport.initialize());

// app.use(multer({ dest: `./uploads/`,
//   rename: function (fieldname, filename) {
//     return filename;
//   },
//  }));
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);


if(process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
  })
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));