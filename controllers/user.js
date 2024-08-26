const {
  validateSignUpData,
  validateLogInData,
  createHashPassword,
} = require("../lib/user");
const user = require("../model/user");
const jwt = require("jsonwebtoken");

const handleSignUp = async (req, res) => {
  //validating signup
  console.log(req.body);
  const safeparseData = validateSignUpData(req.body);
  if (!safeparseData) return res.json({ message: "validation failed!" });

  try {
    const { firstName, lastName, age, email, password } = safeparseData.data;

    //creating hash
    const { hashedpassword, salt } = createHashPassword(password);

    //Adding Data to MongoDB
    const newUserData = await user.create({
      firstName,
      lastName,
      age,
      email,
      password: hashedpassword,
      salt,
    });

    //generating token
    const token = jwt.sign({ userID: newUserData._id }, process.env.JWT_SECRET);

    res.json({ message: "User Added", id: newUserData._id, token: token });
  } catch (err) {
    res.json({ error: err });
  }
};

const handleLogIn = async (req, res) => {
  //validating signup
  const safeparseData = validateLogInData(req.body);
  if (!safeparseData) return res.json({ message: "validation failed!" });

  try {
    // Find in DB
    const newData = await user.findOne({ email: safeparseData.data.email });
    if (!newData) return res.json({ message: "Invalid Email" });

    // Hash the password
    const { hashedpassword } = createHashPassword(
      safeparseData.data.password,
      newData.salt
    );

    //matching hashed with Database hash
    if (hashedpassword === newData.password) {
      //JWT Creation
      const token = jwt.sign({ userID: newData._id }, process.env.JWT_SECRET);
      return res.json({
        message: "Log In Successfull",
        userId: newData._id,
        token: token,
      });
    }
    return res.json({ message: "Credentials Did'nt matched Currectly." });
  } catch (err) {
    res.json({ error: err });
  }
};

const handleGetUserProfile = async (req, res) => {
  if (!req.userId) return res.json({ profile: null });

  //Getting Date from the database
  const userInDB = await user.findById(req.userId);

  res.json({
    profile: {
      firstName: userInDB.firstName,
      lastName: userInDB.lastName,
      age: userInDB.age,
      email: userInDB.email,
    },
  });
};

module.exports = {
  handleSignUp,
  handleLogIn,
  handleGetUserProfile,
};
