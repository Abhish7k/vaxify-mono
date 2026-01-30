package com.vaxify.app.dtos.admin;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class AdminActivityResponse {
    private String id;
    private String action;
    private String target;
    private String type;
    private String status;
    private LocalDateTime timestamp;
}
