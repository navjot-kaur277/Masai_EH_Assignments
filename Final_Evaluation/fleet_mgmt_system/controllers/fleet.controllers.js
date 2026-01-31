const supabase = require ('../config/supabase');

// User
exports.signUp = async(req,res) => {
    const{name,email,password,role} = req.body;
    const {data, error} = await supabase.from('users').insert([{name, email, password,role}]).select();
    if (error) return 
    res.status(400).json({error: error.message});
    res.status(201).json(data);
};

// Vehicle
exports.assignDriver = async(req,res) => {
    const {vehicleId} = req.params;
    const {driver_id} = req.body;
    const {data, error} = await supabase.from('vehicles').update({driver_id}).eq('id', vehicleId).select();
    if (error) return
    res.status(400).json({error: error.message});
    res.json(data);
};

// Trip Module
exports.createTrip = async(req,res) => {
    const {vehicle_id, passangers} = req.body;

    // Check vehicle avail

    const {data : vehicle} = (await supabase.from('vehicles').select('*').eq('id', vehicle_id)).single();
    if (!vehicle || !vehicle.isAvailable) return res.status(400).json({message : "Vehicle Unavailable"});
    if (passangers> vehicle.allowed_passangers) return res.status(400).json ({message: "Passanger limit exceeded"});

    const {data, error} = await supabase.from('trips').insert([req.body]).select();
    if (error) return res.status(400).json({error: error.message});

    // Mark vehicle as available

    await supabase.from('vehicles').update({isAvailable : false}).eq('id', vehicle_id);
    res.status(201).json(data);
};

exports.endTrip = async(req,res) => {
    const {tripId} = req.params;
    const {data : trip } = await supabase.from('trips').select('*,vehicles(rate_per_km)').eq('id',tripId).single();

    const tripCosr = trip.distance_km * trip.vehicle.rate_per_km;

    const {data, error} = await supabase.from('truos').update({isCompleted : true, tripCosr}).eq('id',tripId).select();

    await supabase.from('vehicles').update({isAvailable : true}).eq('id',trip.vehicle_id);
    res.json(data);
};

// Analytics
exports.getAnalytics = async(req,res) => {
    const {count : users} = await supabase.from('users').select('*', {count: 'exact', head : true});

    res.json({total_users : users, total_vehicles: vehicles, total_trips : trips});
};