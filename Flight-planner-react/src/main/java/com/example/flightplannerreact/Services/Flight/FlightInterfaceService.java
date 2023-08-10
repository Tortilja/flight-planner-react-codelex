package com.example.flightplannerreact.Services.Flight;

import com.example.flightplannerreact.Entity.Flight;

import java.util.List;

public interface FlightInterfaceService {
    List<Flight> getAllFlights();
    Flight getFlightById(Long id);
    Flight addFlight(Flight flight);
    Flight updateFlight(Flight flight);
    void deleteFlight(Long id);
    void deleteAllFlights();
    public List<Flight> searchFlights(String searchTerm);

}
