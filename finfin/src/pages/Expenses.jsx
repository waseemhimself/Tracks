import { useEffect, useState } from "react";

import { apiGet, apiDelete } from "../api/client";

function Expenses() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-based
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    apiGet(`/expenses/monthly?year=${year}&month=${month + 1}`)
      .then(setExpenses)
      .catch(() => setExpenses([]));
  }, [year, month]);


  async function handleDelete(id) {
    try {
      await apiDelete(`/expenses/${id}`);

      // refresh current month after delete
      apiGet(`/expenses/monthly?year=${year}&month=${month + 1}`)
        .then(setExpenses);
    } catch (err) {
      alert("Failed to delete expense");
    }
  }



  return (
    <div className="card">
      <h1>Expenses</h1>

      <div style={{ marginBottom: "16px", display: "flex", gap: "12px" }}>
        <div>
          <label>Month: </label>
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }).map((_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Year: </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            style={{ width: "90px" }}
          />
        </div>
      </div>

      {expenses.length === 0 ? (
        <p>No expenses for this period.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((e) => (
              <tr key={e.id}>
                <td>{e.amount}</td>
                <td>{e.category}</td>
                <td>{e.date}</td>
                <td>{e.note}</td>
                <td>
                  <button onClick={() => handleDelete(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      
    </div>
  );
}

export default Expenses;
