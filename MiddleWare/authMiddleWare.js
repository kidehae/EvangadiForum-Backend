const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
  //  removing bearer prefix from the authHeader

  const token = authHeader.split(" ")[1];
  const JWT_SECRET = "wjiLHtT2OgGnVlfZZzywl0cb9DzvWRHx";

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = { username: data.username, userid: data.userid };

    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Token expired"
        : "Authentication invalid";

    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: message });
  }
}

module.exports = authMiddleware;
