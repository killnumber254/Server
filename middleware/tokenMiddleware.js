const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const tokenList = req.headers.cookie.split("access_token=")[1];
  console.log(tokenList);
  if (!tokenList) {
    res.status(403);
  }
  try {
    const data = jwt.verify(tokenList, process.env.JWT_KEY);
    console.log(data);
    req.user = data.user;
    // res.status(200).json({ user: data.id });
  } catch (e) {
    res.status(405).json({ err: "Пользователь не найден" });
  }
  next();
}
module.exports = authMiddleware;
