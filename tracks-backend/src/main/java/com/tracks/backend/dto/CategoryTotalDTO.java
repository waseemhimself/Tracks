package com.tracks.backend.dto;

import java.math.BigDecimal;

public record CategoryTotalDTO(
        String category,
        BigDecimal total
) {}
