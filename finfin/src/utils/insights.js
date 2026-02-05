// export function getMonthlyExpenses(expenses, year, month) {
//   return expenses.filter((e) => {
//     const d = new Date(e.Date);
//     return d.getFullYear() === year && d.getMonth() === month;
//   });
// }

export function getMonthlyExpenses(expenses, year, month) {
  return expenses.filter((e) => {
    const d = new Date(e.Date);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}


export function getTotalAmount(expenses) {
  return expenses.reduce((sum, e) => sum + e.Amount, 0);
}
    
export function getCategoryTotals(expenses) {
  return expenses.reduce((acc, e) => {
    acc[e.Category] = (acc[e.Category] || 0) + e.Amount;
    return acc;
  }, {});
}
