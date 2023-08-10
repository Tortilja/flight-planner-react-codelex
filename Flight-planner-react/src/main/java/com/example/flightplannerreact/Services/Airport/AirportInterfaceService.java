package com.example.flightplannerreact.Services.Airport;

import com.example.flightplannerreact.Entity.Airport;

import java.util.List;

public interface AirportInterfaceService {
    List<Airport> getAllAirport();
    Airport getAirportById(Long id);
    Airport addAirport(Airport airport);
    Airport updateAirport(Airport airport);
    void deleteAirport(Long id);
    List<Airport> searchAirports(String searchTerm) ;

}
