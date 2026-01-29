import { supabase } from "../config/supabse.js";

export const signup = async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) return res.status(400).json ({error: "Missing required feilds" });

    const {data , error} = await supabase.from('users2').insert([{name, email, password}]).select();

    if (error) return res.status(400).json({error: error.message});
    res.status(201).json({message: "User registered", user: data[0]});

};

export const deleteUser = async (req, res) => {
    const {userId} = req.params;
    const {error} = await supabase
    .from('users2')
    .delete()
    .eq('id', userId );

    if (error) return res.status(400).json({error: error.message});
    res.status(200).json({message: "User and all related todos deleted successfully (Cascade)."});
};