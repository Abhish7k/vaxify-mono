package com.vaxify.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vaxify.app.entities.VaccineStock;

import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface VaccineStockRepository extends JpaRepository<VaccineStock, Long> {
    Optional<VaccineStock> findByHospitalIdAndVaccineId(Long hospitalId, Long vaccineId);
}
