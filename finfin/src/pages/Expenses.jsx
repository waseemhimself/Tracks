import { useEffect, useState } from "react";
import { apiGet, apiDelete, apiPut } from "../api/client";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Other"];

function Expenses() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-based

  const [expenses, setExpenses] = useState([]);
  const [editedExpenses, setEditedExpenses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    apiGet(`/expenses/monthly?year=${year}&month=${month + 1}`)
      .then(data => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setExpenses(sorted);
      })
      .catch(() => setExpenses([]));
  }, [year, month]);

  async function handleDelete(id) {
    try {
      await apiDelete(`/expenses/${id}`);
      apiGet(`/expenses/monthly?year=${year}&month=${month + 1}`)
        .then(setExpenses);
    } catch {
      alert("Failed to delete expense");
    }
  }

  function startEdit() {
    setEditedExpenses(JSON.parse(JSON.stringify(expenses)));
    setIsEditing(true);
  }

  function cancelEdit() {
    setEditedExpenses([]);
    setIsEditing(false);
  }

  async function confirmEdit() {
    try {
      setSaving(true);

      for (const expense of editedExpenses) {
        await apiPut(`/expenses/${expense.id}`, expense);
      }

      const refreshed = await apiGet(
        `/expenses/monthly?year=${year}&month=${month + 1}`
      );

      setExpenses(refreshed);
      setIsEditing(false);

    } catch {
      alert("Failed to update expenses");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card">
      {/* Header with Edit / Confirm / Cancel */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Expenses</h1>

        {!isEditing ? (
          <button onClick={startEdit}>Edit</button>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <button disabled={saving} onClick={confirmEdit}>Confirm</button>
            <button disabled={saving} onClick={cancelEdit}>Cancel</button>  
          </div>
        )}
      </div>

      {/* Filters */}
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
        <>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Note</th>
              </tr>
            </thead>

            <tbody>
              {(isEditing ? editedExpenses : expenses).map((e, index) => (
                <tr key={e.id} onClick={() => !isEditing && setSelectedId(e.id)}
                style={{
                  backgroundColor: selectedId === e.id ? "#e6f0ff" : "transparent",
                  cursor: "pointer"
                }}>
                  <td>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedExpenses[index].amount}
                        onChange={(ev) => {
                          const copy = [...editedExpenses];
                          copy[index].amount = Number(ev.target.value);
                          setEditedExpenses(copy);
                        }}
                      />
                    ) : (
                      e.amount
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <select
                        value={editedExpenses[index].category}
                        onChange={(ev) => {
                          const copy = [...editedExpenses];
                          copy[index].category = ev.target.value;
                          setEditedExpenses(copy);
                        }}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    ) : (
                      e.category
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedExpenses[index].date}
                        onChange={(ev) => {
                          const copy = [...editedExpenses];
                          copy[index].date = ev.target.value;
                          setEditedExpenses(copy);
                        }}
                      />
                    ) : (
                      e.date
                    )}
                  </td>

                  <td>
                    {isEditing ? (
                      <input
                        value={editedExpenses[index].note || ""}
                        onChange={(ev) => {
                          const copy = [...editedExpenses];
                          copy[index].note = ev.target.value;
                          setEditedExpenses(copy);
                        }}
                      />
                    ) : (
                      e.note
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete button stays outside */}
          <div style={{ marginTop: "12px" }}>
            <button
              disabled={!selectedId || isEditing}
              onClick={() => handleDelete(selectedId)}
            >
              Delete Selected Expense
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Expenses;
