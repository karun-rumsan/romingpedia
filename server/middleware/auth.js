import jwt from "jsonwebtoken";
const secret = "secret";
import userModel from "../models/user.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      const decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      const googleId = decodedData?.sub.toString();
      const user = await userModel.findOne({ googleId });
      req.userId = user._id;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
export default auth;
