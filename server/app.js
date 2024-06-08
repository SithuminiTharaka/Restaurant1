const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const {     
    findAll,
    find,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant 
} = require ('./Modules/Restaurant')

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL, 
    secure: true,
}))

app.use(express.json())

// POST endpoint to list all restaurants
app.post('/', async (req, res) => {
    try {
        const resRestaurants = await findAll();        
        if (!resRestaurants) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        
        res.status(200).json(resRestaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST endpoint to list all restaurants
app.post('/find', async (req, res) => {
    try {
        const resRestaurants = await find(req.body.id);        
        if (!resRestaurants) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        
        res.status(200).json(resRestaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST endpoint to create a new restaurant
app.post('/create', async (req, res) => {
    console.log(req.body)
    try {
        const newRestaurant = await createRestaurant(req.body);
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST endpoint to update an existing restaurant
app.post('/update', async (req, res) => {
    try {
        const resUpdateRestaurant = await updateRestaurant(req.body);        
        if (!resUpdateRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        
        res.status(200).json(resUpdateRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST endpoint to delete a new restaurant
app.post('/delete/', async (req, res) => {
    try {
        const resDeleteRestaurant = await deleteRestaurant(req.body.id);        
        if (!resDeleteRestaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        
        res.status(200).json(resDeleteRestaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

mongoose.connect(process.env.MONGODB_CONNECTIN_STRING)
    .then(() => {
        app.listen(5000, () => {
            console.log("Server Listning on PORT 5000")
        })

    }).catch(err => { console.log(err) })