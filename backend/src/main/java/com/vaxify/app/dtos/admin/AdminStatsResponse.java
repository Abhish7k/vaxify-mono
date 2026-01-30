package com.vaxify.app.dtos.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminStatsResponse {
    private long totalHospitals;
    private long pendingApprovals;
    private long totalUsers;
    private long activeCenters;
    private long totalAppointments;
}
