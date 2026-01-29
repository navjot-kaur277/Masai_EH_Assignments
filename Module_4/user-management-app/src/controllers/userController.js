const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");

// 1. Create User
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // CHANGE: 'users' -> 'users1'
    const { data, error } = await supabase
      .from("users1")
      .insert([
        { name, email, password: hashedPassword, age, role: role || "user" },
      ])
      .select();

    if (error) {
      if (error.code === "23505")
        return res.status(400).json({ error: "Email already exists" });
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// 2. Fetch All Users
exports.getAllUsers = async (req, res) => {
  // CHANGE: 'users' -> 'users1'
  const { data, error } = await supabase
    .from("users1")
    .select("id, name, email, age, role, created_at");
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
};

// 3. Fetch Single User
exports.getUserById = async (req, res) => {
  // CHANGE: 'users' -> 'users1'
  const { data, error } = await supabase
    .from("users1")
    .select("*")
    .eq("id", req.params.id)
    .single();
  if (error || !data) return res.status(404).json({ error: "User not found" });
  res.status(200).json(data);
};

// 4. Update User
exports.updateUser = async (req, res) => {
  // CHANGE: 'users' -> 'users1'
  const { data, error } = await supabase
    .from("users1")
    .update(req.body)
    .eq("id", req.params.id)
    .select();
  if (error || !data.length)
    return res.status(404).json({ error: "Update failed" });
  res.status(200).json(data[0]);
};

// 5. Delete User
exports.deleteUser = async (req, res) => {
  // CHANGE: 'users' -> 'users1'
  const { error } = await supabase
    .from("users1")
    .delete()
    .eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: "User deleted successfully" });
};
