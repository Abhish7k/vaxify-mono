package com.vaxify.app.service.impl;

import com.vaxify.app.dtos.appointment.AppointmentResponse;
import com.vaxify.app.dtos.appointment.BookAppointmentRequest;
import com.vaxify.app.entities.*;
import com.vaxify.app.entities.enums.AppointmentStatus;
import com.vaxify.app.entities.enums.SlotStatus;
import com.vaxify.app.exception.VaxifyException;
import com.vaxify.app.repository.*;
import com.vaxify.app.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final VaccineRepository vaccineRepository;
    private final SlotRepository slotRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public AppointmentResponse bookAppointment(BookAppointmentRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new VaxifyException("User not found"));

        Vaccine vaccine = vaccineRepository.findById(request.getVaccineId())
                .orElseThrow(() -> new VaxifyException("Vaccine not found"));

        List<Slot> slots = slotRepository.findByCenterIdAndDate(request.getCenterId(),
                java.time.LocalDate.parse(request.getDate()));

        Slot selectedSlot = slots.stream()
                .filter(s -> s.getStartTime().toString().equals(request.getSlot()))
                .findFirst()
                .orElseThrow(() -> new VaxifyException("No available slot found for the selected time"));

        if (selectedSlot.getStatus() == SlotStatus.FULL
                || selectedSlot.getBookedCount() >= selectedSlot.getCapacity()) {
            throw new VaxifyException("Selected slot is already full");
        }

        Appointment appointment = Appointment.builder()
                .user(user)
                .slot(selectedSlot)
                .vaccine(vaccine)
                .status(AppointmentStatus.BOOKED)
                .build();

        selectedSlot.setBookedCount(selectedSlot.getBookedCount() + 1);
        if (selectedSlot.getBookedCount() >= selectedSlot.getCapacity()) {
            selectedSlot.setStatus(SlotStatus.FULL);
        }
        slotRepository.save(selectedSlot);

        Appointment saved = appointmentRepository.save(appointment);
        return mapToResponse(saved);
    }

    @Override
    public List<AppointmentResponse> getMyAppointments(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new VaxifyException("User not found"));

        return appointmentRepository.findAll().stream()
                .filter(a -> a.getUser().getId().equals(user.getId()))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void cancelAppointment(Long appointmentId, String userEmail) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new VaxifyException("Appointment not found"));

        if (!appointment.getUser().getEmail().equals(userEmail)) {
            throw new VaxifyException("You are not authorized to cancel this appointment");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);

        Slot slot = appointment.getSlot();
        slot.setBookedCount(slot.getBookedCount() - 1);
        if (slot.getStatus() == SlotStatus.FULL && slot.getBookedCount() < slot.getCapacity()) {
            slot.setStatus(SlotStatus.AVAILABLE);
        }
        slotRepository.save(slot);

        appointmentRepository.save(appointment);
    }

    @Override
    public AppointmentResponse getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new VaxifyException("Appointment not found"));
        return mapToResponse(appointment);
    }

    private AppointmentResponse mapToResponse(Appointment a) {
        return AppointmentResponse.builder()
                .id(a.getId())
                .centerName(a.getSlot().getCenter().getName())
                .centerAddress(a.getSlot().getCenter().getAddress())
                .vaccineName(a.getVaccine().getName())
                .date(a.getSlot().getDate().toString())
                .slot(a.getSlot().getStartTime().toString())
                .status(a.getStatus())
                .createdAt(a.getCreatedAt())
                .build();
    }
}
