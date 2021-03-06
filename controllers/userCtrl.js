const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Courses = require("../models/courseModel");

const userCtrl = {
  register: async (req, res) => {
    try {
      const {
        userName,
        name,
        email,
        password,
        rePassword,
        number,
        country,
        region,
      } = req.body;

      if (
        !userName ||
        !name ||
        !email ||
        !password ||
        !rePassword ||
        !number ||
        !country ||
        !region
      ) {
        return res.status(400).json({ msg: "Invalid Creadentials" });
      }
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ msg: "Email Already Exists" });
      }
      const existingUser = await User.findOne({ userName });
      if (existingUser) {
        return res.status(400).json({ msg: "User Name Already Exists" });
      }
      if (password.length < 4) {
        return res.status(400).json({ msg: "Password must be 4 lengths long" });
      }
      if (password !== rePassword) {
        return res.status(400).json({ msg: "Password Doesn't Match" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      const newUser = new User({
        userName,
        name,
        email,
        password: hashPass,
        number,
        country,
        region,
      });

      await newUser.save();
      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: async (req, res) => {
    const rf_token = req.cookies.refreshToken;
    if (!rf_token) {
      return res.status(400).json({ msg: "Please Login or Register" });
    }
    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ msg: "Please Login or Register" });
      }
      const accessToken = createAccessToken({ id: user.id });

      res.json({ accessToken });
    });
  },
  login: async (req, res) => {
    try {
      const { userName, password } = req.body;
      if (!userName || !password) {
        return res.status(400).json({ msg: "Invalid Creadential" });
      }
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({ msg: "User Doesn't Exists" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect Password" });
      }

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      });
      return res.json({ msg: "Logged Out" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(400).json({ msg: "User Doesn't Exists" });
      }
      res.json({ user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  addList: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          list: req.body.list,
        }
      );

      user.list.filter((item) => {
        return enrolled(item._id, item.enrolled);
      });

      return res.json({ msg: "Enrolled" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { name, password, rePassword, number, country, region, image } =
        req.body;
      if (
        !name ||
        !password ||
        !rePassword ||
        !number ||
        !country ||
        !region ||
        !image
      ) {
        return res.status(400).json({ msg: "Invalid Creadentials" });
      }
      if (password.length < 4) {
        return res.status(400).json({ msg: "Password must be 4 lengths long" });
      }
      if (password !== rePassword) {
        return res.status(400).json({ msg: "Password Doesn't Match" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          password: hashPass,
          number,
          country,
          region,
          image,
        }
      );
      res.json({ msg: "profile updated" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const enrolled = async (id, oldEnrolled) => {
  await Courses.findOneAndUpdate(
    { _id: id },
    {
      enrolled: 2 + oldEnrolled,
    }
  );
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCtrl;
