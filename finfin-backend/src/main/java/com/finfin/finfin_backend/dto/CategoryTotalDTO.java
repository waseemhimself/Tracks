package com.finfin.finfin_backend.dto;

import java.math.BigDecimal;

public record CategoryTotalDTO(
        String category,
        BigDecimal total
) {}
