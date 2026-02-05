import { useEffect, useState } from "react";
import { getData, saveData } from "../utils/storage";
import { createGoal } from "../utils/goals";
import { computeGoalProgress } from "../utils/goals";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [type, setType] = useState("monthly");
  const [limit, setLimit] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  useEffect(() => {
    const data = getData();
    setGoals(data.Goals);
    setExpenses(data.Expenses);
    setCategories(data.Categories);
  }, []);

  function addGoal(e) {
    e.preventDefault();

    if (!limit) return alert("Limit required");
    if (type === "category" && !category) return alert("Category required");

    const goal = createGoal({
      Type: type,
      Limit: Number(limit),
      Category: type === "category" ? category : null,
    });

    const data = getData();
    data.Goals.push(goal);
    saveData(data);

    setGoals(data.Goals);
    setLimit("");
    setCategory("");
  }

  return (
    <div className="card">
      <h1>Goals</h1>

      {/* Add Goal */}
      <form onSubmit={addGoal} style={{ maxWidth: 400 }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="monthly">Monthly Overall</option>
          <option value="category">Category Monthly</option>
        </select>

        {type === "category" && (
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.Id} value={c.Name}>
                {c.Name}
              </option>
            ))}
          </select>
        )}

        <input
          type="number"
          placeholder="Limit"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />

        <button type="submit">Add Goal</button>
      </form>

      {/* Goals List */}
      <h2 style={{ marginTop: 24 }}>Your Goals</h2>

      {goals.length === 0 && <p>No goals set</p>}

      {goals.map((g) => {
        const { spent, remaining, percent } = computeGoalProgress(
          g,
          expenses,
          year,
          month
        );

        return (
          <div key={g.Id} style={{ marginBottom: 16 }}>
            <strong>
              {g.Type === "monthly"
                ? "Monthly Limit"
                : `Category: ${g.Category}`}
            </strong>
            <div>Limit: ₹{g.Limit}</div>
            <div>Spent: ₹{spent}</div>
            <div>Remaining: ₹{remaining}</div>
            <div>Progress: {percent.toFixed(0)}%</div>
          </div>
        );
      })}
    </div>
  );
}

export default Goals;
