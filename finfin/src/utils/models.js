export function createExpense({ Amount, Category, Date, Note = "" }) {
  return {
    Id: crypto.randomUUID(),
    Amount,
    Category,
    Date,                  // single source of truth
    Note,
    CreatedAt: new globalThis.Date().toISOString(),
  };
}


export function createCategory(Name) {
  return {
    Id: crypto.randomUUID(),
    Name,
    CreatedAt: new Date().toISOString(),
  };
}

export function createGoal({ Type, Limit, Category = null, StartDate, EndDate }) {
  return {
    Id: crypto.randomUUID(),
    Type,
    Limit,
    Category,
    StartDate,
    EndDate,
    CreatedAt: new Date().toISOString(),
  };
}

export function createUserProfile() {
  return {
    Name: "User",
    Income: null,
    Currency: "INR",
    WeeklyLimit: null,
    MonthlyLimit: null,
    Theme: "auto",
    CreatedAt: new Date().toISOString(),
  };
}

export function createStreak() {
  return {
    Current: 0,
    Longest: 0,
    LastLoggedDate: null,
  };
}
