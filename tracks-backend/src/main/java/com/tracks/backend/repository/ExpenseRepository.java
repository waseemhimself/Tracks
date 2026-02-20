package com.tracks.backend.repository;

import com.tracks.backend.dto.CategoryTotalDTO;
import com.tracks.backend.entity.Expense;
import com.tracks.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByUserAndDateBetween(
            User user,
            LocalDate start,
            LocalDate end
    );

    List<Expense> findByUserAndCategoryAndDateBetween(
            User user,
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
        WHERE e.user = :user
        AND e.date BETWEEN :start AND :end
        GROUP BY e.category
    """)
    List<CategoryTotalDTO> sumByCategory(
            @Param("user") User user,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );

    @Query("""
        SELECT COALESCE(SUM(e.amount), 0)
        FROM Expense e
        WHERE e.user = :user
        AND e.date BETWEEN :start AND :end
    """)
    BigDecimal totalSpent(
            @Param("user") User user,
            @Param("start") LocalDate start,
            @Param("end") LocalDate end
    );
}