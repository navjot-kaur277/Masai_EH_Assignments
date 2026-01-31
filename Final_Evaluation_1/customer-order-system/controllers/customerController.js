import { supabase } from "../config/supabase.js";

export const registerCustomer = async (req, res) => {
  const { full_name, email, phone } = req.body;

  if (!full_name || !email || !phone) {
    return res
      .status(400)
      .json({ error: "full_name, email, and phone are required" });
  }

  const { data, error } = await supabase
    .from("customers")
    .insert([{ full_name, email, phone }])
    .select();

  if (error) {
    if (error.code === "23505")
      return res.status(400).json({ error: "Email already exists" });
    return res.status(400).json({ error: error.message });
  }
  res.status(201).json(data[0]);
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("customers").delete().eq("id", id);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Customer and all related orders deleted successfully" });
};
