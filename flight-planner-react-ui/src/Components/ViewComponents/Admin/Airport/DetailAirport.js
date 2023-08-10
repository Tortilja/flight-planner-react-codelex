import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function DetailAirport() {
  const { id } = useParams();
  const [airport, setAirport] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/airport/${id}`)
      .then(response => response.json())
      .then(data => setAirport(data))
      .catch(error => {
        console.error('Error fetching airport details', error);
      });
  }, [id]);

  if (!airport) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container text-center">
        <h2>Airport Details</h2>

        <div className='row'>
            <div className='col-lg-4 col-sm-none'>
            </div>
            <div className='col-lg-4 col-sm-12'>
                <table className="table">
                <tbody>
                <tr>
                    <td>ID:</td>
                    <td>{airport.id}</td>
                </tr>
                <tr>
                    <td>Country:</td>
                    <td>{airport.country}</td>
                </tr>
                <tr>
                    <td>City:</td>
                    <td>{airport.city}</td>
                </tr>
                <tr>
                    <td>Airport:</td>
                    <td>{airport.airport}</td>
                </tr>
                </tbody>
                </table>
                <Link to="/adminAirport" className="btn btn-outline-primary mt-2">
                    Back to Airport List
                </Link>
      
            </div>
            <div className='col-lg-4 col-sm-none'>
            </div>
        </div>
    </div>
  );
}

export default DetailAirport;
