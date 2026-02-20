import { useState } from "react";
import { useEffect } from "react";
import { createExpense } from "../utils/models";
import { updateStreak } from "../utils/streak";

import { apiPost } from "../api/client";

const CATEGORIES = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Other",
  ];

function AddExpense() {
  const [Amount, setAmount] = useState("");
  const [Category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [Note, setNote] = useState("");
  const[categories,setCategories]=useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      amount: Number(Amount),
      category: Category,
      date: date,       // YYYY-MM-DD
      note: Note,
    };

    try {
      await apiPost("/expenses", payload);
      alert("Expense added");
    } catch (err) {
      alert("Failed to add expense");
    }
  }


  // function handleSubmit(e) {
  //   e.preventDefault();

  //   if (!Amount || !Category || !Date) {
  //     alert("Amount, Category and Date are required");
  //     return;
  //   }

  //   const expense = createExpense({
  //     Amount: Number(Amount),
  //     Category,
  //     Date: date,
  //     Note,
  //   });


  //   const data = getData();
  //   data.Expenses.push(expense);
  //   data.Streak = updateStreak(data.Streak);
  //   console.log("Saving data:", data);
  //   saveData(data);

  //   setAmount("");
  //   setCategory("");
  //   setDate("");
  //   setNote("");

  //   alert("Expense added");
  // }

  return (
    <div className="card">
      <h1>Add Expense</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input
          type="number"
          placeholder="Amount"
          value={Amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={Category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <textarea
          placeholder="Note (optional)"
          value={Note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddExpense;
