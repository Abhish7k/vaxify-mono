package com.vaxify.app.dtos.appointment;

import lombok.Data;

@Data
public class BookAppointmentRequest {
    private Long centerId;
    private Long vaccineId;
    private String date;
    private String slot;
}
