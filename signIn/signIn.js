const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const generateToken = require("../token/tokenGenerate");
const refreshToken = require("../token/refreshTokenGenerate");
const User = require("../Model/userModel");
const Token = require("../Model/tokenModel");

const tokenList = {};

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
		if (err) {
			return res.status(400).json({ error: err });
		}
		if (!user) {
			return res.status(404).json({ error: "No users" });
		}
		req.logIn(user, async function (err) {
			// если юзер есть то добовляется кукии с токеном
			if (user) {
				const token = generateToken(user.id);
				const refresh = refreshToken(user.id);

				await Token.create({ userId: user.id, token: token });

				// const token = jwt.sign({ user: user.username }, process.env.JWT_KEY, {
				// 	expiresIn: "24h",
				// });

				const response = {
					satus: "Logged in",
					token: token,
					refresh: refresh,
				};

				res.cookie("access_token", token, {
					expires: new Date(Date.now() + 9999999),

					httpOnly: true,
					path: "/",
					sameSite: "None", // отправка cookie
					secure: true, // отправление запроса на сервер
				});

				tokenList[refresh] = response;

				return res.status(200).json({ user: user, res: response });
			}
			return res.status(402).json({ error: err });
		});
	})(req, res, next);
}

module.exports = auth;
