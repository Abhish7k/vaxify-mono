package com.vaxify.app.service.impl;

import com.vaxify.app.dtos.hospital.HospitalResponse;
import com.vaxify.app.dtos.hospital.StaffHospitalRegisterRequest;
import com.vaxify.app.dtos.hospital.UpdateHospitalRequest;
import com.vaxify.app.entities.Hospital;
import com.vaxify.app.entities.User;
import com.vaxify.app.entities.enums.HospitalStatus;
import com.vaxify.app.entities.enums.Role;
import com.vaxify.app.repository.HospitalRepository;
import com.vaxify.app.repository.UserRepository;
import com.vaxify.app.service.HospitalService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import com.vaxify.app.dtos.StaffHospitalRegistrationDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalServiceImpl implements HospitalService {

        private final HospitalRepository hospitalRepository;
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;

        // for staff
        @Override
        public HospitalResponse registerHospital(
                        StaffHospitalRegisterRequest request,
                        String staffEmail) {

                User staffUser = userRepository.findByEmail(staffEmail)
                                .orElseThrow(() -> new IllegalStateException("Staff user not found"));

                if (staffUser.getRole() != Role.STAFF) {
                        throw new AccessDeniedException("Only hospital staff can register hospitals");
                }

                hospitalRepository.findByStaffUser(staffUser)
                                .ifPresent(h -> {
                                        throw new IllegalStateException(
                                                        "Hospital already registered for this staff");
                                });

                Hospital hospital = Hospital.builder()
                                .name(request.getName())
                                .address(request.getAddress())
                                .staffUser(staffUser)
                                .status(HospitalStatus.PENDING)
                                .createdAt(LocalDateTime.now())
                                .build();

                Hospital saved = hospitalRepository.save(hospital);
                return toResponse(saved);
        }

        @Override
        public HospitalResponse getMyHospital(String staffEmail) {

                User staffUser = userRepository.findByEmail(staffEmail)
                                .orElseThrow(() -> new IllegalStateException("Staff user not found"));

                Hospital hospital = hospitalRepository.findByStaffUser(staffUser)
                                .orElseThrow(() -> new IllegalStateException("No hospital found for this staff"));

                return toResponse(hospital);
        }

        @Override
        @Transactional
        public HospitalResponse updateHospital(UpdateHospitalRequest request, String staffEmail) {
                User staffUser = userRepository.findByEmail(staffEmail)
                                .orElseThrow(() -> new IllegalStateException("Staff user not found"));

                Hospital hospital = hospitalRepository.findByStaffUser(staffUser)
                                .orElseThrow(() -> new IllegalStateException("No hospital found for this staff"));

                hospital.setName(request.getName());
                hospital.setAddress(request.getAddress());
                hospital.setCity(request.getCity());
                hospital.setState(request.getState());
                hospital.setPincode(request.getPincode());
                hospital.setDocumentUrl(request.getDocumentUrl());

                return toResponse(hospitalRepository.save(hospital));
        }

        @Override
        public HospitalResponse getHospitalById(Long id) {
                Hospital hospital = hospitalRepository.findById(id)
                                .orElseThrow(() -> new IllegalStateException("Hospital not found"));
                return toResponse(hospital);
        }

        @Override
        public List<HospitalResponse> getApprovedHospitals() {
                return hospitalRepository.findByStatus(HospitalStatus.APPROVED)
                                .stream()
                                .map(this::toResponse)
                                .toList();
        }

        @Override
        public List<HospitalResponse> getAllHospitals() {
                return hospitalRepository.findAll()
                                .stream()
                                .map(this::toResponse)
                                .toList();
        }

        @Override
        public List<HospitalResponse> getPendingHospitals() {
                return hospitalRepository.findByStatus(HospitalStatus.PENDING)
                                .stream()
                                .map(this::toResponse)
                                .toList();
        }

        @Override
        public HospitalResponse approveHospital(Long hospitalId) {

                Hospital hospital = getPendingHospital(hospitalId);

                hospital.setStatus(HospitalStatus.APPROVED);

                return toResponse(hospitalRepository.save(hospital));

        }

        @Override
        public HospitalResponse rejectHospital(Long hospitalId) {

                Hospital hospital = getPendingHospital(hospitalId);

                hospital.setStatus(HospitalStatus.REJECTED);

                return toResponse(hospitalRepository.save(hospital));

        }

        // helpers
        private Hospital getPendingHospital(Long id) {
                Hospital hospital = hospitalRepository.findById(id)
                                .orElseThrow(() -> new IllegalStateException("Hospital not found"));

                if (hospital.getStatus() != HospitalStatus.PENDING) {
                        throw new IllegalStateException("Hospital is not pending");
                }
                return hospital;
        }

        private HospitalResponse toResponse(Hospital hospital) {
                return HospitalResponse.builder()
                                .id(hospital.getId())
                                .name(hospital.getName())
                                .address(hospital.getAddress())
                                .licenseNumber(hospital.getLicenseNumber())
                                .documentUrl(hospital.getDocumentUrl())
                                .city(hospital.getCity())
                                .state(hospital.getState())
                                .pincode(hospital.getPincode())
                                .status(hospital.getStatus())
                                .build();
        }

        // regiter staff and hospital
        @Override
        @Transactional
        public void registerHospitalStaff(StaffHospitalRegistrationDTO dto) {
                // check if email already exists
                if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
                        throw new RuntimeException("Email already registered");
                }

                // create staff user
                User staffUser = new User();
                staffUser.setName(dto.getStaffName());
                staffUser.setEmail(dto.getEmail());
                staffUser.setPassword(passwordEncoder.encode(dto.getPassword()));
                staffUser.setPhone(dto.getPhone());
                staffUser.setRole(Role.STAFF);
                staffUser.setCreatedAt(LocalDateTime.now());

                userRepository.save(staffUser);

                // create hospital
                Hospital hospital = new Hospital();
                hospital.setName(dto.getHospitalName());
                hospital.setAddress(dto.getHospitalAddress());
                hospital.setLicenseNumber(dto.getLicenseNumber());
                hospital.setDocumentUrl(dto.getDocument());
                hospital.setCity(dto.getCity());
                hospital.setState(dto.getState());
                hospital.setPincode(dto.getPincode());

                hospital.setStaffUser(staffUser);
                hospital.setStatus(HospitalStatus.PENDING);
                hospital.setCreatedAt(LocalDateTime.now());

                hospitalRepository.save(hospital);

        }

}
