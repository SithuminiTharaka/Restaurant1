import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

function RestaurantForm() {
  const [restaurant, setRestaurant] = useState({ id:'',customeId: '', name: '', address: '', telephone: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:5000/create', { customeId: restaurant.id, name: restaurant.name, address: restaurant.address, telephone: restaurant.telephone })
      .then(res => {
        if (201 === res.status) {
          alert("Restaurant Inserted")
          navigate('/')
        } else {
          alert("Something went wrong")
        }
      }).catch(err => alert(err))
  }


  return (
    <div className='relative max-w-xl mx-auto mt-6'>
      <h1 className="text-2xl font-bold mb-10">{id ? 'Edit Restaurant' : 'Add Restaurant'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-500 text-base font-medium mt-4 mb-1" htmlFor="id">ID</label>
          <input name="id" value={restaurant.id} onChange={handleChange} className="w-full mb-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-base font-medium mt-4 mb-1" htmlFor="name">Name</label>
          <input name="name" value={restaurant.name} onChange={handleChange} className="w-full mb-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-base font-medium mt-4 mb-1" htmlFor="address">Address</label>
          <input name="address" value={restaurant.address} onChange={handleChange} className="w-full mb-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-base font-medium mt-4 mb-1" htmlFor="telephone">Telephone</label>
          <input name="telephone" value={restaurant.telephone} onChange={handleChange} className="w-full mb-3" />
        </div>
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => navigate('/')} className="btn btn-secondary mt-9">Back</button>
          <button type="submit" className="btn btn-primary relative mt-10 w-52">Save</button>
        </div>
      </form>
    </div>
  );
}

export default RestaurantForm;
