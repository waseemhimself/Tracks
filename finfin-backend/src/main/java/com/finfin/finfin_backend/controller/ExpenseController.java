package com.finfin.finfin_backend.controller;

import com.finfin.finfin_backend.dto.MonthlyInsightsDTO;
import com.finfin.finfin_backend.entity.Expense;
import com.finfin.finfin_backend.service.ExpenseService;
import jakarta.validation.Valid;
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
    public Expense addExpense(@Valid @RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    @GetMapping("/monthly")
    public List<Expense> getMonthlyExpenses(
            @RequestParam int year,
            @RequestParam int month,
            @RequestParam(required = false) String category
    ) {
        if (category != null && !category.isBlank()) {
            return expenseService.getMonthlyExpensesByCategory(
                    year, month, category
            );
        }

        return expenseService.getMonthlyExpenses(year, month);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }

    @GetMapping("/insights")
    public MonthlyInsightsDTO getInsights(
            @RequestParam int year,
            @RequestParam int month
    ) {
        return expenseService.getMonthlyInsights(year, month);
    }

}
