package com.example.flightplannerreact.Repository;

import com.example.flightplannerreact.Entity.Airport;
import com.example.flightplannerreact.Entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByFromAndToAndCarrierAndDepartureTimeAndArrivalTime(
            Airport from,
            Airport to,
            String carrier,
            LocalDateTime departureTime,
            LocalDateTime arrivalTime
    );

    @Query("SELECT f FROM Flight f " +
            "WHERE lower(f.from.city) LIKE lower(concat('%', :searchTerm, '%')) " +
            "OR lower(f.to.city) LIKE lower(concat('%', :searchTerm, '%')) " +
            "OR lower(f.carrier) LIKE lower(concat('%', :searchTerm, '%'))")
    List<Flight> searchFlights(@Param("searchTerm") String searchTerm);

}
