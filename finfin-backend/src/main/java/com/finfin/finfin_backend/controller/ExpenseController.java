package com.finfin.finfin_backend.controller;

import com.finfin.finfin_backend.dto.MonthlyInsightsDTO;
import com.finfin.finfin_backend.entity.Expense;
import com.finfin.finfin_backend.entity.User;
import com.finfin.finfin_backend.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public Expense addExpense(
            @RequestBody Expense expense,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        return expenseService.addExpense(expense, user);
    }

    @GetMapping("/monthly")
    public List<Expense> getMonthlyExpenses(
            @RequestParam int year,
            @RequestParam int month,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        return expenseService.getMonthlyExpenses(year, month, user);
    }

    @GetMapping("/monthly/category")
    public List<Expense> getMonthlyExpensesByCategory(
            @RequestParam int year,
            @RequestParam int month,
            @RequestParam String category,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        return expenseService.getMonthlyExpensesByCategory(
                year, month, category, user
        );
    }

    @GetMapping("/insights")
    public MonthlyInsightsDTO getInsights(
            @RequestParam int year,
            @RequestParam int month,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        return expenseService.getMonthlyInsights(year, month, user);
    }

    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody Expense updated,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        return expenseService.updateExpense(id, updated, user);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(
            @PathVariable Long id,
            Authentication authentication
    ) {
        User user = (User) authentication.getPrincipal();
        expenseService.deleteExpense(id, user);
    }
}
