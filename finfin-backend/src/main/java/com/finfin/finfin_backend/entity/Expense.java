package com.finfin.finfin_backend.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "expenses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private BigDecimal amount;

    @NotBlank
    private String category;

    @NotNull
    private LocalDate date;

    private String note;

    private LocalDateTime createdAt = LocalDateTime.now();

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
