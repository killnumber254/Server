const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../Model/userModel");
const LocalStrategy = require("passport-local").Strategy;
// const jwt = require("jsonwebtoken");
// const generateToken = require("./generateToken/generateToken");
// проверка юзера при регистрации
passport.use(
	new LocalStrategy(function (username, password, done) {
		User.findOne({ limit: 5, where: { username: username } })
			.then((user) => {
				bcrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;

					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, { message: "wrong" });
					}
				});
			})
			.catch((err) => {
				return done(null, false, { message: err });
			});
	})
);

async function auth(req, res, next) {
	//авторизация
	passport.authenticate("local", function (err, user) {
		console.log(user);
		console.log(user);
		if (err) {
			return res.status(400).json({ error: err });
		}
		if (!user) {
			return res.status(404).json({ error: "No users" });
		}
		req.logIn(user, function (err) {
			// если юзер есть то добовляется кукии с токеном
			if (user) {
				// const token = jwt.sign({ user: user.username }, process.env.JWT_KEY, {
				// 	expiresIn: "24h",
				// });
				// console.log(token);
				// console.log(req.headers);
				// res.cookie("access_token", token, {
				// 	expires: new Date(Date.now() + 9999999),

				// 	httpOnly: true,
				// 	path: "/",
				// 	sameSite: "None", // отправка cookie
				// 	secure: true, // отправление запроса на сервер
				// });
				return res.status(200).json({ user: user });
			}
			return res.status(402).json({ error: err });
		});
	})(req, res, next);
}

module.exports = auth;
