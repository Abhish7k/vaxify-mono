package com.vaxify.app.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@lombok.NoArgsConstructor
@lombok.AllArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private java.time.LocalDateTime createdAt;
}
