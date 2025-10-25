const User = require('../models/user');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');

const signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            // If user already exists
            if (error) return res.status(400).json({ msg: `Something went wrong`, error });
            if (user) return res.status(409).json({ msg: 'User already exits' });

            // If new user trys to login
            const { firstName, lastName, email, password, contactNumber } = req.body;
            const _user = new User({
                firstName, lastName, email, password, contactNumber,
                username: shortid.generate()
            })

            _user.save((error, data) => {
                if (error) return res.status(400).json({ msg: `Something went wrong`, error });
                if (data) return res.status(201).json({ msg: 'User Successfully register !!' });
            })
        })
}

const signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ msg: `Something went wrong`, error });
            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'client') {
                    const token = jwt.sign(
                        { id: user._id, role: user.role },
                        process.env.jwt_secret,
                        { expiresIn: '5h' }
                    )
                    const { _id, firstName, lastName, profilePicture, email, role, fullName, username, contactNumber } = user;
                    res.cookie('token', token, { expiresIn: '5h' });
                    res.status(200).json({
                        token,
                        user: {
                            _id, firstName, lastName, profilePicture, email, role, fullName, username, contactNumber
                        }
                    })
                } else {
                    return res.status(400).json({ msg: `Invalid Password` })
                }
            }
            if (!user) {
                return res.status(404).json({ msg: `User dosen't not exits` })
            }
        })
}

const UserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Check if userId is provided
    if (!userId) {
      return res.status(404).json({ msg: "User doesn't exist" });
    }

    // 2️⃣ Fetch user by ID
    const _user = await User.findById(userId);

    // 3️⃣ If user not found
    if (!_user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // 4️⃣ Send user info
    const {
      _id,
      fullName,
      firstName,
      lastName,
      profilePicture,
      email,
      role,
      username,
      contactNumber,
      createdAt
    } = _user;

    return res.status(200).json({
      user: { _id, fullName, firstName, lastName, profilePicture, email, role, username, contactNumber, createdAt }
    });

  } catch (error) {
    // 5️⃣ Catch all errors and send only one response
    return res.status(500).json({ msg: "Something went wrong", error });
  }
};



const signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ msg: `Sign-out Successfully...!` });
}

module.exports = {
    signup,
    signin,
    signout,
    UserProfile
}