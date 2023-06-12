const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decode = jwt.verify(token, "Masai");
      if (decode) {
        req.body.userID = decode.userID;
        req.body.user = decode.user;
        next();
      } else {
        res.json("Not Authorized");
      }
    } catch (error) {
      res.json({ err: error });
    }
  } else {
    res.json({ msg: "please Login" });
  }
};
