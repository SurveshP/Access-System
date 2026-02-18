import User from '../models/user.model.js'

export const createUser = async (req, res) => {
  try {

    if (!req.session.user) {
      return res.status(401).json({ message: "Please login first" });
    }

    if (req.session.user.role !== "admin") {
      return res.status(403).json({ 
        message: "Only admin can create users" 
      });
    }

    const user = await User.create(req.body);

    const totalUsers = await User.countDocuments();

    res.status(201).json({
      message: "User created successfully",
      data: user,
      totalUsers
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* first add admin from this */
// export const createUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     console.log("user", user);

//     const totalUsers = await User.countDocuments();

//     res.status(201).json({
//       message: "User registered successfully",
//       data: user,
//       totalUsers,
//     });

//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      totalUsers,
      users
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    const user = await User.findOne({ emailAddress });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    req.session.user = {
      id: user._id,
      firstName: user.firstName,
      emailAddress: user.emailAddress,
      role: user.role
    };

    res.json({
      message: "Login successful",
      sessionData: req.session.user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    // cookie clear karo (default session cookie name: connect.sid)
    res.clearCookie("connect.sid");

    res.json({ message: "Logout successful" });
  });
};