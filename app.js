const express = require("express");
const cors = require("cors");
const useRouter = require("./router/router");
const app = express();
const passport = require("passport");
const User = require("./Model/userModel");

app.use(cors());

// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
// 	User.findById(id, function (err, user) {
// 		done(err, user);
// 	});
// });

// app.use(express.session({ secret: "Secret" }));

// app.use(passport.initialize());
// app.use(passport.session());
app.use(useRouter);

module.exports = app;
