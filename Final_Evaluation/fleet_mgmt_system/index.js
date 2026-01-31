const express = require ('express');
const {logger,rateLimiter, handle404} = require ('./middlewares');
const fleet = require ('./controllers/fleet.controllers');

const app = express();
app.use(express.json());
app.use(logger);

// Routes
app.post ('/users/signup', fleet.signUp);
app.post('/vehicles/add', rateLimiter, fleet.addVehicle);
app.patch('/vehicles/assign-driver/:vehicleId', fleet.assignDriver);
app.post ('/trips/create', fleet.createTrip);
app.patch('/trips.end/:tripId', fleet.endTrip);
app.get('/analytics', fleet.getAnalytics);

// Handle
app.use(handle404);

app.listen(3000, () => 
  console.log(`Server is running on port 3000`)
);

