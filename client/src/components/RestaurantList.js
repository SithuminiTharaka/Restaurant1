import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("")
  useEffect(() => {
    fetchRestaurants();
  }, []);

  const searchHanlde = (e) => {
    setSearchText(e.target.value)
    searchRestaurants()
  }

  const searchRestaurants = async () => {
    setTimeout(async () => {
      if (searchText) {
        fetchRestaurants()
      } else {

        await axios.post('http://localhost:5000/find', { id: searchText })
          .then(res => {
            setRestaurants(res.data.Restaurants);
          }).catch(err => alert(err))
      }
    }, 100)
  }
  const fetchRestaurants = async () => {

    await axios.post('http://localhost:5000/')
      .then(res => {
        if (200 === res.status) {
          setRestaurants(res.data.Restaurants);
        } else {
          alert("Something went wrong")
        }
      }).catch(err => alert(err))
  }

const deleteRestaurant = async (id) => {
  await fetch(`/api/restaurants/${id}`, { method: 'DELETE' });
  fetchRestaurants();
};

return (
  <div>
    <div className='relative w-full h-56 banner' />
    <h1 className="text-5xl absolute font-bold w-full left-24 top-28 text-white">Restaurants</h1>

    <input className='input mt-10 w-[calc(100%-216px)]' type='search' placeholder='Search Restaurant..' value={searchText} onChange={searchHanlde} />
    <Link to="/add">
      <button className="btn relative btn-primary mt-10 w-48 float-right font-semibold">Add New</button>

    </Link>
    <table className="relative mt-12 table-auto w-full rounded-xl overflow-hidden">
      <thead className='bg-slate-100 text-slate-600'>
        <tr>
          <th className='py-2 font-semibold text-left px-4'>ID</th>
          <th className='py-2 font-semibold text-left px-4'>Name</th>
          <th className='py-2 font-semibold text-left px-4'>Address</th>
          <th className='py-2 font-semibold text-left px-4'>Telephone</th>
          <th className='py-2 font-semibold text-left px-4 w-44'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant) => (
          <tr key={restaurant.id}>
            <td className='font-medium text-sm text-slate-600 py-3 px-4'>{restaurant.customeId}</td>
            <td className='font-medium text-sm text-slate-600 py-3 px-4'>{restaurant.name}</td>
            <td className='font-medium text-sm text-slate-600 py-3 px-4'>{restaurant.address}</td>
            <td className='font-medium text-sm text-slate-600 py-3 px-4'>{restaurant.telephone}</td>
            <td className='font-medium text-sm text-slate-600 py-3 px-4'>

              <Link to={`/edit/${restaurant.id}`}>
                <button className="btnEdit">Edit</button>
              </Link>

              <button onClick={() => deleteRestaurant(restaurant.id)} className="btn btnDelete">Delete</button>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  </div>
);
}

export default RestaurantList;
