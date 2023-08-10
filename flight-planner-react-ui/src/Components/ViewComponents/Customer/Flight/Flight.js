import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FlightList() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = () => {
    fetch('http://localhost:8080/flightList')
      .then(response => response.json())
      .then(data => setFlights(data))
      .catch(error => console.error('Error fetching flights:', error));
  };



  return (


    <div className="container text-center pt-2">

        <h2>Flight List</h2>
    
              <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="col-1">ID</th>
                            <th scope="col" className="col-2">From</th>
                            <th scope="col" className="col-2">To</th>
                            <th scope="col" className="col-2">Carrie</th>
                            <th scope="col" className="col-2">Departure Time</th>
                            <th scope="col" className="col-2">Arrival Time</th>
                            <th scope="col" className="col-1">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {flights.map(flight => (
                        <tr key={flight.id}>
                            <td>{flight.id}</td>
                            <td>{flight.from.airport}</td>
                            <td>{flight.to.airport}</td>
                            <td>{flight.carrier}</td>
                            <td>{flight.departureTime}</td>
                            <td>{flight.arrivalTime}</td>
                            <td>
                                <div className="btn-group d-flex" role="group">
            
                                    <Link to={`/detailFlight/${flight.id}`} className="btn btn-outline-info" type="button">
                                      Details
                                    </Link>
                                </div>  
                            </td>
                        </tr>
                    ))}
                    </tbody>
            </table>
        </div>




    
  );
}

export default FlightList;
