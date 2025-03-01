var jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const JWT_SECRET = process.env.JWT_SECRET || "MessiTheGoat";
const fetchuser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send({ error: "Please authneticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authneticate using a valid token" });
  }
};

module.exports = fetchuser;
