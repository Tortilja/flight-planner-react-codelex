package com.example.flightplannerreact.Controller.Admin;

import com.example.flightplannerreact.Entity.Airport;
import com.example.flightplannerreact.Services.Airport.AirportInterfaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class AirportController {

    private final AirportInterfaceService airportService;

    public AirportController(AirportInterfaceService airportService) {
        this.airportService = airportService;
    }
    @GetMapping("/airportList")
    public ResponseEntity<List<Airport>> getAllAirport() {
        List<Airport> authors = airportService.getAllAirport();
        return ResponseEntity.ok(authors);
    }

    @GetMapping("/airport/{id}")
    public ResponseEntity<Airport> getAirportById(@PathVariable Long id){
        Airport airport = airportService.getAirportById(id);
        if(airport == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(airport);
    }

    @PostMapping("/addAirport")
    public ResponseEntity<Airport> addAuthor(@RequestBody Airport airport) {
        Airport newAirport = airportService.addAirport(airport);
        return ResponseEntity.status(HttpStatus.CREATED).body(newAirport);
    }
    @PutMapping("/updateAirport/{id}")
    public ResponseEntity<Airport> updateAirport(@PathVariable Long id, @RequestBody Airport updatedAirport){
        Airport existingAirport = airportService.getAirportById(id);

        if (existingAirport == null) {
            return ResponseEntity.notFound().build();
        }

        existingAirport.setCountry(updatedAirport.getCountry());
        existingAirport.setCity(updatedAirport.getCity());
        existingAirport.setAirport(updatedAirport.getAirport());

        Airport updatedAirportData = airportService.updateAirport(existingAirport);
        return ResponseEntity.ok(updatedAirportData);
    }

    @DeleteMapping("/deleteAirport/{id}")
    public ResponseEntity<Void> deleteAirport(@PathVariable Long id) {
        Airport airport = airportService.getAirportById(id);

        if (airport == null) {
            return ResponseEntity.notFound().build();
        }

        airportService.deleteAirport(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/searchAirports")
    public ResponseEntity<List<Airport>> searchAirports(@RequestParam String searchTerm) {
        List<Airport> foundAirports = airportService.searchAirports(searchTerm);
        return ResponseEntity.ok(foundAirports);
    }
}
