import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateFlight() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flight, setFlight] = useState({});
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await fetch(`http://localhost:8080/flight/${id}`);
        const data = await response.json();
        setFlight(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flight', error);
      }
    };

    const fetchAirports = async () => {
      try {
        const response = await fetch('http://localhost:8080/airportList');
        const data = await response.json();
        setAirports(data);
      } catch (error) {
        console.error('Error fetching airports', error);
      }
    };

    fetchFlight();
    fetchAirports();
  }, [id]);


  const formatDatetime = datetime => {
    if (!datetime) return null;
    const formattedDate = new Date(datetime);
    const year = formattedDate.getFullYear();
    const month = ('0' + (formattedDate.getMonth() + 1)).slice(-2);
    const day = ('0' + formattedDate.getDate()).slice(-2);
    const hours = ('0' + formattedDate.getHours()).slice(-2);
    const minutes = ('0' + formattedDate.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleUpdate = async () => {

    console.log( flight)

    try {
      const response = await fetch(`http://localhost:8080/updateFlight/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                from: flight.from ,
                to: flight.to,
                carrier: flight.carrier,
                departureTime: formatDatetime(flight.departureTime),
                arrivalTime: formatDatetime(flight.arrivalTime),
              }
        ),
      });
      if (response.ok) {
        console.log('Flight updated successfully');
        navigate('/adminFlight');

      } else {
        console.error('Error updating flight');
      }
    } catch (error) {
      console.error('Error updating flight', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Flight</h2>
      <div>
        <label>From:</label>
        <select value={flight.from && flight.from.id} onChange={e => setFlight({ ...flight, from: { id: e.target.value } })}>
          <option value="">Select an airport</option>
          {airports.map(airport => (
            <option key={airport.id} value={airport.id}>{airport.airport}</option>
          ))}
        </select>
      </div>
      <div>
        <label>To:</label>
        <select value={flight.to && flight.to.id} onChange={e => setFlight({ ...flight, to: { id: e.target.value } })}>
          <option value="">Select an airport</option>
          {airports.map(airport => (
            <option key={airport.id} value={airport.id}>{airport.airport}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Carrier:</label>
        <input type="text" value={flight.carrier} onChange={e => setFlight({ ...flight, carrier: e.target.value })} />
      </div>
      <div>
        <label>Departure Time:</label>
        <DatePicker
          selected={flight.departureTime && new Date(flight.departureTime)}
          onChange={date => setFlight({ ...flight, departureTime: date })}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="yyyy-MM-dd HH:mm"
        />
      </div>
      <div>
        <label>Arrival Time:</label>
        <DatePicker
          selected={flight.arrivalTime && new Date(flight.arrivalTime)}
          onChange={date => setFlight({ ...flight, arrivalTime: date })}
          minDate={flight.departureTime && new Date(flight.departureTime)} // Set minimum date to departureTime
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="yyyy-MM-dd HH:mm"
        />
      </div>
      <button onClick={handleUpdate}>Update Flight</button>
    </div>
  );
}

export default UpdateFlight;
