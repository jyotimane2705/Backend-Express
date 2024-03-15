
const express = require('express');
const locationController = require("../Controller/location");
const mealtypeController = require("../Controller/mealtype");
const restaurantController = require("../Controller/restaurant");


const route = express.Router();

route.get('/location', locationController.getLocation);
route.get('/mealtype', mealtypeController.getMealtype);


//filter

route.get('/restaurant', restaurantController.getRestaurant);
route.post('/filter', restaurantController.filteredRestaurant);


module.exports = route;