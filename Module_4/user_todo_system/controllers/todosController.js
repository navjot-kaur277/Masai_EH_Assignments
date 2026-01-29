import { supabase } from "../config/supabse.js";

export const addTodo = async(req, res) => {
    const {title, description, userId} = req.body;
    if (!title || !userId) return res.status(400).json({error: "Tittle and userId are required"});

    const {data , error} = await supabase.from('todos').insert([{title,description,user_id:userId}]).select();

    if (error) return res.status(400).json({error:error.message});
    res.status(201).json(data[0]);
};

export const getMyTodo = async (req, res) => {
    const {userId} = req.params;
    const {data, error} = await supabase.from('todos').select('*').eq('user_id', userId);

    if (error) return res.status(400).json ({error: error.message});
    if (data.length === 0) return res.status(404).json({message:"No todos found for this user"});
    res.status(200).json(data);
};

export const updateTodo = async (req, res) => {
    const {todoId} = req.params;
    const {title, description,is_completed} = req.body;

    const {data, error} = await supabase.from('todos')
    .update({title, description, is_completed})
    .eq('id' , todoId)
    .select();

    if (error || data.length === 0) return res.status(404).json({error: "Todo not found"});
    res.status(200).json(data[0]);
};

export const deleteTodo = async (req, res) => {
    const {todoId} = req.params;
    const {error} = (await supabase.from('todos').delete()).eq('id', todoId);

    if (error) return res.status(400).json({error: error.message});
    res.status(200).json({message: "Todo deleted"});
};