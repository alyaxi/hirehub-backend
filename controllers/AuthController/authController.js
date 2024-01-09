const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../../models/User/Users");
const Payment = require("../../models/Payment/Payment");
const uuid = require("uuid");
const { calculateNextPayment } = require("../../utilis/NextPaymentFunction");
const Employer = require("../../models/Employer/Employer");
const respond = require("../../utilis/responseHelper");
const { sendForgetPasswordEmail } = require("../../utilis/nodeMailer");
const CandidateProfile = require("../../models/Candidate/Candidate");

const generateAccessToken = (user) => {
  // console.log(authConfig);
  return jwt.sign({ id: user._id, role: user.role }, process.env.access_token, {
    expiresIn: "60m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.refresh_token);
};

const authController = {
  // User Login

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      let User = await Users.findOne({ email: email });
      // console.log(User);

      if (!User) {
        // return res.status(404).json({ error: "User not found" });
        return respond(res, { error: "User not found" }, 404);
      }

      const isPassValid = await bcrypt.compare(password, User.password);

      if (!isPassValid) {
        // return res.status(401).json({ error: "Invalid password" });
        return respond(res, { error: "Invalid Password" }, 402);
      }

      const accessToken = generateAccessToken(User);
      const refreshToken = generateRefreshToken(User);

      //IF PROBLEM WITH ANY COOKIES SETUP REPLACE THE SETTING OF COOKEIES BELOW COMMENTED CODE

      // res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none', secure: true}

      // Save refresh token in your database or cache

      res.cookie("refresh_token", refreshToken, { httpOnly: true });

      respond(res, {

        email: User.email,
        name: User.name,
        Role: User.role,
        Status: User.status,
        accessToken,
        refreshToken,
        Message: "Login Successfully",
      });

      // res.status(200).json({
      //   accessToken,
      //   refreshToken,
      //   user: {
      //     email: User.email,
      //     name: User.name,
      //     Role: User.role,
      //     Status: User.status,
      //   },
      //   Message: "Login Successfully",
      // });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  //Register User

  async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        name,
        email,
        password: hashedPassword,
        role,
      };

      const existingUser = await Users.findOne({ email: newUser.email });

      if (existingUser) {
        return respond(res, { error: "User already exists" }, 402);
        // return res.status(400).json({ error: "User already exists" });
      }
      const NewUserAdded = await Users.create(newUser);
      console.log(NewUserAdded);

      if (role === "employer") {
        const defaultPayment = {
          paymentId: uuid.v4(),
          amount: 0,
          plans: "Basic Plan",
          employerId: NewUserAdded._id,
          status: "Active",
          nextPayment: calculateNextPayment(),
          currentPaymentDate: new Date(),
          paymentStatus: "Free",
        };

        const payments = await Payment.create(defaultPayment);
        console.log(payments, "paymentsssssssssssss");
        await Employer.create({
          userId: NewUserAdded._id,
          payments: [payments._id],
        });
      } else if (role === "candidate") {
        await CandidateProfile.create({ userId: NewUserAdded._id })

      }

      const accessToken = generateAccessToken(NewUserAdded);
      const refreshToken = generateRefreshToken(NewUserAdded);

      //IF PROBLEM WITH ANY COOKIES SETUP REPLACE THE SETTING OF COOKEIES BELOW COMMENTED CODE

      // res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none', secure: true}

      // Save refresh token in your database or cache

      res.cookie("refresh_token", refreshToken, { httpOnly: true });

      // res
      // .status(200)
      // .json({ accessToken, refreshToken, Message: "User has been created" });
      const user = {
        ...NewUserAdded._doc,
        accessToken,
        refreshToken,
        msg:"User has been created"

      }
      respond(res, {
        user
      });
    } catch (error) {
      console.error(error);
      // res.status(400).json({ error: "Could not create employer" });
      next(error);
    }
  },

  async resetPassword(req, res, next) {
    try {
      const userId = req.user.id;
      const { password, newPassword } = req.body;
      if (!password || !newPassword) respond(res, "Missing fields", 401);
      const user = await Users.findOne({ _id: userId });
      if (!user) {
        return respond(res, "User not found", 404);
      }
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return respond(res, "Invalid Current Password", 402);
      }
      const hashedPassword = await bcrypt.hash(newPassword, 8);
      const updatedUser = await Users.updateOne(
        { _id: userId },
        { $set: { password: hashedPassword } }
      );
      if (updatedUser) {

        return respond(res, "Password has beeen changed");
      } else {
        return respond(res, "Something went Wrong", 500);

      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },


  async forgetPassword(req, res, next) {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return respond(res, "Email does not exist", 403);
      }
      console.log(user, "usererere");
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      const Message = "Please check your email to reset your password";
      const url = `http://localhost:3000/new-password/${accessToken}`;
      const html = `
      <h1>Reset Password</h1>
      <p>Please click the following link to reset your password</p>
      <a href="${url}">Reset Password</a>
      `;
      await sendForgetPasswordEmail(user.email, html);
      return respond(res, {
        Message
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },


  async recoverPassword(req, res, next) {
    const { token } = req.params;
    const { password } = req.body;

    console.log(token);

    try {
      // const isValidToken = verifyToken(token, user);
      const isValidToken = await   jwt.verify(
        token,
        process.env.access_token,
        { algorithms: ["HS256"] },
        (err, decoded) => {
          if (err) {
            return respond(res, err.message, 402);
          }
          return req.user = decoded;
        }
      );
      if (!isValidToken) {
        return respond(res, "Invalid token", 403);

      }
      const hashedPassword = await bcrypt.hash(password, 8);
      const updatedUser = await Users.updateOne(
        { _id: isValidToken.id },
        { $set: { password: hashedPassword } }
      );
      console.log(isValidToken, "validdddddddtoken")
      if (updatedUser) {

        return respond(res, {msg:"Password has beeen reset", updatedUser}, );

      } else {
        return respond(res, "Something went Wrong",500);

      }

    } catch (error) {
      next(error)
    }
  },

  // Refresh Token

  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refresh_token;
      console.log(refreshToken, "refreshtokennnnnnn");

      // Verify the refresh token here, check if it's valid
      if (refreshToken == null)
        return res
          .status(401)
          .json({ error: " refresh token is not provided" });

      jwt.verify(
        refreshToken,
        process.env.refresh_token,
        async function (err, decoded) {
          if (!decoded || err) {
            return res.sendStatus(403).json({ error: err.message });
          }
          const accessToken = generateAccessToken(decoded);
          const refreshToken = generateRefreshToken(decoded);

          //IF PROBLEM WITH ANY COOKIES SETUP REPLACE THE SETTING OF COOKEIES BELOW COMMENTED CODE

          // res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none', secure: true}

          res.cookie("refresh_token", refreshToken, { httpOnly: true });
          res.json({ accessToken, refreshToken });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteRefreshTOken(req, res) {
    try {
      res.clearCookie("refresh_token");
      return res.status(200).json({ message: "refresh token is deleted" });
    } catch (error) {
      console.log(object);
      res.status(500).json({ error: error.message });
    }
  },
  // Add other auth methods like refresh token, logout, etc.
};

module.exports = authController;
