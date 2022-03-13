const { User } = require("../models/user");

class UserController {
  constructor() {}

  userLogin = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({
          message: "Invalid email",
        });
      } else if (user.password !== req.body.password) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }
      return res.status(200).json({
        message: `Welcome ${user.name}`,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  getUsers = async (req, res) => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;
    try {
      const users = await User.find({}).limit(limit).sort({ username: sort });
      if (Object.keys(users).length === 0) {
        return res.status(404).json({ message: "Collection is empty" });
      }
      return res.status(200).json({ users: users });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  getUser = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      return res.status(200).json({ user: user });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  userRegistration = async (req, res) => {
    try {
      await User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        name: {
          firstname: req.body.name.firstname,
          lastname: req.body.name.lastname,
        },
        address: {
          city: req.body.address.city,
          street: req.body.address.street,
          number: req.body.address.number,
          zipcode: req.body.address.zipcode,
        },
        phone: req.body.phone,
      });
      return res.status(201).json({ message: "Successfully Created" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const filter = { _id: req.params.id };
      const update = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        name: {
          firstname: req.body.name.firstname,
          lastname: req.body.name.lastname,
        },
        address: {
          city: req.body.address.city,
          street: req.body.address.street,
          number: req.body.address.number,
          zipcode: req.body.address.zipcode,
        },
        phone: req.body.phone,
      };
      await User.findOneAndUpdate(filter, update);
      return res.status(200).json({
        message: "User Successfully Updated",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      await User.findOneAndRemove({ _id: req.params.id });
      return res.status(200).json({
        message: "User Successfully Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
}
module.exports = new UserController();
