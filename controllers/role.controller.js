import Role from '../models/role.model.js'

export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    console.log("role", role);

    const totalRoles = await Role.countDocuments();

    res.status(201).json({
      message: "Role registered successfully",
      data: role,
      totalRoles,
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    const totalRoles = await Role.countDocuments();

    res.status(200).json({
      totalRoles,
      roles
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};