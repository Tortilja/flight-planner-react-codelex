package com.example.flightplannerreact.Controller.Admin;

import com.example.flightplannerreact.Entity.Airport;
import com.example.flightplannerreact.Entity.Flight;
import com.example.flightplannerreact.Services.Flight.FlightInterfaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class FlightController {
    private final FlightInterfaceService flightService;

    public FlightController(FlightInterfaceService flightService) {
        this.flightService = flightService;
    }
    @GetMapping("/flightList")
    public List<Flight> getAllFlights() {
        return  flightService.getAllFlights();
    }
    @GetMapping("/flight/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {
        Flight flight = flightService.getFlightById(id);
        if (flight != null) {
            return ResponseEntity.ok(flight);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/addFlight")
    public ResponseEntity<?> addFlight(@RequestBody Flight flight) {
        try {
            Flight addedFlight = flightService.addFlight(flight);
            return ResponseEntity.ok(addedFlight);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/updateFlight/{id}")
    public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @RequestBody Flight updatedFlight) {
        try {
            Flight existingFlight = flightService.getFlightById(id);
            if (existingFlight == null) {
                return ResponseEntity.notFound().build();
            }

            existingFlight.setFrom(updatedFlight.getFrom());
            existingFlight.setTo(updatedFlight.getTo());
            existingFlight.setCarrier(updatedFlight.getCarrier());
            existingFlight.setDepartureTime(updatedFlight.getDepartureTime());
            existingFlight.setArrivalTime(updatedFlight.getArrivalTime());

            Flight editedFlight = flightService.updateFlight(existingFlight);
            return ResponseEntity.ok(editedFlight);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/deleteFlight/{id}")
    public ResponseEntity<Void> deleteFlight(@PathVariable Long id) {
        Flight flight = flightService.getFlightById(id);

        if (flight == null) {
            return ResponseEntity.notFound().build();
        }

        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/deleteAllFlights")
    public ResponseEntity<String> deleteAllFlights() {
        flightService.deleteAllFlights();
        return ResponseEntity.ok("All flights deleted successfully");
    }
    @GetMapping("/searchFlights")
    public List<Flight> searchFlights(@RequestParam String searchTerm) {
        return flightService.searchFlights(searchTerm);
    }
}
