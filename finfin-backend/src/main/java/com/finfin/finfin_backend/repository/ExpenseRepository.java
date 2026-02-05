package com.finfin.finfin_backend.repository;

import com.finfin.finfin_backend.dto.CategoryTotalDTO;
import com.finfin.finfin_backend.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByDateBetween(LocalDate start, LocalDate end);

    List<Expense> findByCategoryAndDateBetween(
            String category,
            LocalDate start,
            LocalDate end
    );

    @Query("""
        SELECT new com.finfin.finfin_backend.dto.CategoryTotalDTO(
            e.category,
            SUM(e.amount)
        )
        FROM Expense e
        WHERE e.date BETWEEN :start AND :end
        GROUP BY e.category
    """)
    List<CategoryTotalDTO> sumByCategory(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );

    @Query("""
        SELECT COALESCE(SUM(e.amount), 0)
        FROM Expense e
        WHERE e.date BETWEEN :start AND :end
    """)
    BigDecimal totalSpent(
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );

}
