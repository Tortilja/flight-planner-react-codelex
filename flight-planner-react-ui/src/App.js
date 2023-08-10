import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar.js';

import AdminAirport from './Components/ViewComponents/Admin/Airport/Airport.js';
import DetailAirport from './Components/ViewComponents/Admin/Airport/DetailAirport.js';
import AddAirport from './Components/ViewComponents/Admin/Airport/AddAirport.js';
import UpdateAirport from './Components/ViewComponents/Admin/Airport/UpdateAirport.js';

import AdminFlight from './Components/ViewComponents/Admin/Flight/Flight.js';
import AddFlight from './Components/ViewComponents/Admin/Flight/AddFlight.js';
import DetailFlight from './Components/ViewComponents/Admin/Flight/DetailFlight.js';
import UpdateFlight from './Components/ViewComponents/Admin/Flight/UpdateFlight.js';

import CustomerAirport from './Components/ViewComponents/Customer/Airport/Airport.js';
import CustomerFlight from './Components/ViewComponents/Customer/Flight/Flight.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/adminAirport" element={<AdminAirport />} />
          <Route path="/airport/:id" element={<DetailAirport/>} />
          <Route path="/addAirport" element={<AddAirport/>} />
          <Route path="/updateAirport/:id" element={<UpdateAirport/>} />
          <Route path="/adminFlight" element={<AdminFlight/>} />
          <Route path="/detailFlight/:id" element={<DetailFlight/>} />
          <Route path="/addFlight" element={<AddFlight/>} />
          <Route path="/updateFlight/:id" element={<UpdateFlight />} />

          <Route path="/customerAirport" element={<CustomerAirport />} />
          <Route path="/customerFlight" element={<CustomerFlight />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
