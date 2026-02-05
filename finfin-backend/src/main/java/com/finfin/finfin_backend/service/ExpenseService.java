package com.finfin.finfin_backend.service;

import com.finfin.finfin_backend.dto.CategoryTotalDTO;
import com.finfin.finfin_backend.dto.MonthlyInsightsDTO;
import com.finfin.finfin_backend.entity.Expense;
import com.finfin.finfin_backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getMonthlyExpenses(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        return expenseRepository.findByDateBetween(start, end);
    }

    public List<Expense> getMonthlyExpensesByCategory(
            int year,
            int month,
            String category
    ) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        return expenseRepository.findByCategoryAndDateBetween(
                category, start, end
        );
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public MonthlyInsightsDTO getMonthlyInsights(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        BigDecimal total = expenseRepository.totalSpent(start, end);
        List<CategoryTotalDTO> byCategory =
                expenseRepository.sumByCategory(start, end);

        return new MonthlyInsightsDTO(total, byCategory);
    }


}
