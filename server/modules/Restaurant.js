const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    customeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
});

// Create the Restaurant model
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// Finding Methods

// Find all
const findAll = async () => {
    try {
        const Restaurants = await Restaurant.find();
        return { Restaurants };
    } catch (error) {
        console.error('Error listing restaurant:');
        throw error;
    }
};

// Find by costomeId, 
const find = async (id) => {
    try {
        const Restaurants = await Restaurant.find({ customeId: id });
        return { Restaurants };
    } catch (error) {
        console.error('Error finding restaurant:');
        throw error;
    }
};

// CRUD operations

// Create a new restaurant
const createRestaurant = async (restaurantData) => {
    try {
        const restaurant = await Restaurant.create(restaurantData);
        return restaurant;
    } catch (error) {
        console.error('Error creating restaurant:');
        throw error;
    }
};

// Update a restaurant by id
const updateRestaurant = async (data) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(data.selectedId, data, { new: true });
        return restaurant;
    } catch (error) {
        console.error('Error updating restaurant:', error);
        throw error;
    }
};

// Delete a restaurant by id
const deleteRestaurant = async (id) => {
    try {
        await Restaurant.findByIdAndDelete(id);
        return { message: 'Restaurant deleted successfully' };
    } catch (error) {
        console.error('Error deleting restaurant:');
        throw error;
    }
};

module.exports = { 
    Restaurant,
    findAll,
    find,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant 
}