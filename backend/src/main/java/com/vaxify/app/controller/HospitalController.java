package com.vaxify.app.controller;

import com.vaxify.app.dtos.hospital.HospitalResponse;
import java.util.List;
import com.vaxify.app.service.HospitalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.vaxify.app.dtos.StaffHospitalRegistrationDTO;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalService hospitalService;

    @GetMapping
    public ResponseEntity<List<HospitalResponse>> getAllHospitals() {
        return ResponseEntity.ok(hospitalService.getAllHospitals());
    }

    // @PostMapping("/register")
    // public HospitalResponse registerHospital(
    // @Valid @RequestBody StaffHospitalRegisterRequest request,
    // @AuthenticationPrincipal UserDetails principal
    // ) {
    // return hospitalService.registerHospital(
    // request,
    // principal.getUsername() // email
    // );
    // }

    @PostMapping("/register")
    public ResponseEntity<String> registerHospitalStaff(@Valid @RequestBody StaffHospitalRegistrationDTO dto) {
        hospitalService.registerHospitalStaff(dto);
        return ResponseEntity.ok("Hospital registration submitted for approval");
    }

    @GetMapping("/my")
    public HospitalResponse getMyHospital() {

        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return hospitalService.getMyHospital(email);
    }

}
