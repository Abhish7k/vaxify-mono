package com.vaxify.app.dtos;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VaccineResponseDTO {

    private Long id;
    private String name;
    private String type;
    private String manufacturer;
    private Integer stock;
    private Integer capacity;
    private String lastUpdated;
}