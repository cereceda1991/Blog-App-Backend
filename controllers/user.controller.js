const User = require('../models/user.model');

exports.findAll = async (req, res) => {
  try {
    const { status } = req.body;

    const users = await User.findAll({
      where: {
        status: 'active',
      },
    });

    res.status(200).json({
      message: 'The query has been donde success',
      results: users.length,
      data: {
        user: users,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
      error,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'active',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: `User with id ${id} not found`,
      });
    }

    res.status(200).json({
      message: `The user with id ${id} has been donde success`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
      error,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'active',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: `User with id ${id} not found`,
      });
    }

    await user.update({
      status: 'disabled',
    });

    res.status(200).json({
      message: `The user with id ${id} has been deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
      error,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'active',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        message: `User with id ${id} not found`,
      });
    }
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: `Email ${email} is already registered`,
      });
    }

    await user.update({
      name,
      email,
      password,
    });

    res.status(200).json({
      message: `The user with id ${id} has been update`,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong',
      error,
    });
  }
};
