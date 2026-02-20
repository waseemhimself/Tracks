package com.tracks.backend.service;

import com.tracks.backend.dto.CategoryTotalDTO;
import com.tracks.backend.dto.MonthlyInsightsDTO;
import com.tracks.backend.entity.Expense;
import com.tracks.backend.entity.User;
import com.tracks.backend.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // CREATE
    public Expense addExpense(Expense expense, User user) {
        expense.setUser(user);
        return expenseRepository.save(expense);
    }

    // MONTHLY
    public List<Expense> getMonthlyExpenses(int year, int month, User user) {

        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        return expenseRepository.findByUserAndDateBetween(user, start, end);
    }

    // MONTHLY BY CATEGORY
    public List<Expense> getMonthlyExpensesByCategory(
            int year,
            int month,
            String category,
            User user
    ) {

        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        return expenseRepository.findByUserAndCategoryAndDateBetween(
                user, category, start, end
        );
    }

    // DELETE
    public void deleteExpense(Long id, User user) {

        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized delete attempt");
        }

        expenseRepository.delete(expense);
    }

    // INSIGHTS
    public MonthlyInsightsDTO getMonthlyInsights(int year, int month, User user) {

        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        BigDecimal total = expenseRepository.totalSpent(user, start, end);

        List<CategoryTotalDTO> byCategory =
                expenseRepository.sumByCategory(user, start, end);

        return new MonthlyInsightsDTO(total, byCategory);
    }

    // UPDATE
    public Expense updateExpense(Long id, Expense updated, User user) {

        Expense existing = expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!existing.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized update attempt");
        }

        existing.setAmount(updated.getAmount());
        existing.setCategory(updated.getCategory());
        existing.setDate(updated.getDate());
        existing.setNote(updated.getNote());

        return expenseRepository.save(existing);
    }
}
