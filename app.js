const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const userRouter = require("./router/router");
const User = require("./Model/userModel");

const app = express();

// const cors = require("cors");
// const sequelize = new Sequelize(`${db.url}`);
// let token = {
//   tokens: hat(),
// };

// app.use(cookieParser(process.env.JWT_KEY));
// app.use(
//   expressSession({
//     secret: hat(),
//     resave: false,
//     saveUninitialized: true,
//     session: true,
//     cookie: {
//       httpOnly: true,
//       path: "/log",
//       maxAge: 3600 * 8,
//     },
//   })
// );

app.use(cookieParser());

app.use(express.json());

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

// console.log(corsOptions);

// app.use(cors(corsOptions));

app.use(function (req, res, next) {
	const allowedOrigins = ["http://127.0.0.1:3001", "http://localhost:3001"];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}
	// res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
		"application/json;charset=UTF-8"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT");
	next();
});

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		// err ? done(err) : done(null, user);
		done(err, user);
	});
});

app.use(expressSession({ secret: "Secret" }));

app.use(passport.initialize());
app.use(passport.session());
app.use(userRouter);

module.exports = app;
