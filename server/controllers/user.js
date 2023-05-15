import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import userModal from "../models/user.js";

const secret = "secret";

export const signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const oldUser = await userModal.findOne({ email: email });

    if (oldUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await userModal.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ id: result._id, email: result.email }, secret, {
      expiresIn: "1h",
    });
    await res.status(201).json({
      result,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userOld = await userModal.findOne({ email });
    if (!userOld) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, userOld.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Password is incorrect" });

    const token = jwt.sign({ email: userOld.email, id: userOld._id }, secret, {
      expiresIn: "1h",
    });
    await res.status(200).json({ result: userOld, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const googleSignin = async (req, res) => {
  const { email, name, token, googleId } = req.body;
  try {
    const oldUser = await userModal.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token });
    }
    const newUser = await userModal.create({
      email,
      name,
      googleId,
    });

    res.status(200).json({ newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
