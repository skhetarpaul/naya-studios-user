const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const multer = require('multer')
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateMakerInput = require('../../validation/maker')
const validateDesignerInput = require('../../validation/designer')

const User = require("../../models/User");
const Maker = require('../../models/Maker')
const UploadImage = require('../../models/UploadImage')
const Designer = require('../../models/Designer')

router.post("/register", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          genre: req.body.genre
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  router.get("/view-user",(req, res) => {
    const _id = req.query.id
    // const _id = `5e8c2067169e892fd8ffdfc7`
    User.findOne({_id}).then(user => {
      if (!user) {
        return res.status(404).json({ emailnotfound: "no user found with these credentials" });
      }
      else {
        console.log(user, "view-user data fetched")
        res.json(user)
      }
    })
  })

  router.post("/login", (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
  const password = req.body.password;

    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 172800 // 2 days in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  router.post("/create-maker", (req, res) => {

    const { errors, isValid } = validateMakerInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    try {
      const newMaker = new Maker({
        noOfProjects: req.body.noOfProjects,
        material: req.body.material,
        location : req.body.location,
      });
      newMaker
        .save()
        .then(maker => res.json(maker))
        .catch(err => {
          console.log(err)
          res.json(err)});
    }
    catch(err) {
      console.log(err)
      res.json(err)
    }  
  });

  router.get('/view-maker', (req, res) => {
    Maker.find(function(err, makers) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        res.json(makers);
        console.log(makers);
      }
    });
  })

  router.post("/create-designer", (req, res) => {
    const { errors, isValid } = validateDesignerInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newDesigner = new Designer({
      timeDevoted: req.body.timeDevoted,
      type: req.body.type,
      education: req.body.education
    });

    newDesigner
      .save()
      .then(designer => {res.json(designer)
      console.log(designer)})
      .catch(err => {
        console.log(err)
        res.json(err)
      });
  });

  router.get('/view-designer', (req, res) => {
    Designer.find(function(err, designers) {
      if (err) {
          console.log(err);
          res.json(err)
      } else {
          res.json(designers);
          console.log(designers);
      }
    });
  })



  //for image upload

  var Storage = multer.diskStorage({
    destination: "../../public/uploads/",
    filename:(req, file,cb) => {
      cb(null, file.fieldname + "_" + Date.now()+ Path2D.extname(file.originalname))
    }
  })
  var upload = multer({
    storage: Storage
  }).single('file');
  router.post('/upload', upload, function(req, res) {
    var imageFile = req.file.filename;
    var success= req.file.filename + "uploaded successfully"
    var imageDetails = new UploadImage({
      img: imageFile
    })
    imageDetails.save(function(err, data) {
      if (err) throw err
      res.render('upload-file', {title: 'Upload File', success: success})
    })
  })
  module.exports = router;