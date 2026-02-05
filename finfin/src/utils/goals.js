import { getMonthlyExpenses } from "./insights";

export function createGoal({ Type, Limit, Category = null }) {
  return {
    Id: crypto.randomUUID(),
    Type,        // "monthly" | "category"
    Limit,       // number
    Category,    // string | null
    CreatedAt: new Date().toISOString(),
  };
}

export function computeGoalProgress(goal, expenses, year, month) {
  const monthlyExpenses = getMonthlyExpenses(expenses, year, month);

  let spent = 0;

  if (goal.Type === "monthly") {
    spent = monthlyExpenses.reduce((s, e) => s + e.Amount, 0);
  }

  if (goal.Type === "category") {
    spent = monthlyExpenses
      .filter((e) => e.Category === goal.Category)
      .reduce((s, e) => s + e.Amount, 0);
  }

  const remaining = Math.max(goal.Limit - spent, 0);
  const percent = Math.min((spent / goal.Limit) * 100, 100);

  return { spent, remaining, percent };
}