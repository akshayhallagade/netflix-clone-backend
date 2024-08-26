const { z } = require("zod");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET;

// validating JWT data
function validateJWTData(payload) {
  const jwtSchema = z.object({
    token: z.string(),
  });
  const safeparseData = jwtSchema.safeParse(payload);
  return safeparseData;
}

//validiting Sign Up Data
function validateSignUpData(payload) {
  const signUpSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.string(),
    email: z.string(),
    password: z.string(),
  });
  const safeparseData = signUpSchema.safeParse(payload);
  return safeparseData;
}

//validiting Log in Data
function validateLogInData(payload) {
  const logInSchema = z.object({
    email: z.string(),
    password: z.string(),
  });
  const safeparseData = logInSchema.safeParse(payload);
  return safeparseData;
}

//creating hash
function createHashPassword(password, salt = uuidv4()) {
  const hashedpassword = crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  return { hashedpassword, salt };
}

function verifyToken(token) {
  const user = jwt.verify(token, jwt_secret);
  const safeparseData = validateJWTData({ token });
  console.log(safeparseData);
  if (!user) return res.json({ Message: "Token Expired" });
  return user.userID;
}

module.exports = {
  validateSignUpData,
  validateLogInData,
  createHashPassword,
  verifyToken,
  validateJWTData,
};
