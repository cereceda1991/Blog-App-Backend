const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({
      message: `Email ${email} is already registered`,
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    status: 'success',
    message: 'The user has been created successfully',
  });
});

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: `User with email ${email} not found`,
    });
  }

  if (user.password !== password) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect password',
    });
  }

  res.status(200).json({
    status: 'success',
    message: `User with email ${email} has been found`,
    data: {
      user: user,
    },
  });
};
