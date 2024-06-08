import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantForm from './components/RestaurantForm';

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/add" element={<RestaurantForm />} />
          <Route path="/edit/:id" element={<RestaurantForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
