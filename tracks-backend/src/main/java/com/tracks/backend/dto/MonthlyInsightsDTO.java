package com.tracks.backend.dto;

import java.math.BigDecimal;
import java.util.List;

public record MonthlyInsightsDTO(
        BigDecimal totalSpent,
        List<CategoryTotalDTO> byCategory
) {}

