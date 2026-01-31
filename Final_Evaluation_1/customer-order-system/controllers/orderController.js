import { supabase } from "../config/supabase.js";

export const addOrder = async (req, res) => {
  const { product_name, quantity, price, customerId } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        product_name,
        quantity,
        price,
        customer_id: customerId,
      },
    ])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
};

export const getMyOrders = async (req, res) => {
  const { customerId } = req.params;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", customerId);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { quantity, price, order_status } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .update({ quantity, price, order_status })
    .eq("id", orderId)
    .select();

  if (error || data.length === 0) {
    return res.status(404).json({ error: "Order not found or update failed" });
  }
  res.json(data[0]);
};

export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  const { error } = await supabase.from("orders").delete().eq("id", orderId);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Order deleted successfully" });
};
