import { useEffect, useState } from "react";
import { apiGet } from "../api/client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#6894F9", "#34C38F", "#F1B44C", "#F46A6A", "#556EE6", "#50A5F1"];

function Insights() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const [total, setTotal] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState([]);

  useEffect(() => {
    apiGet(`/expenses/insights?year=${year}&month=${month + 1}`)
      .then((data) => {
        setTotal(data.totalSpent);
        setCategoryTotals(data.byCategory);
      })
      .catch(() => {
        setTotal(0);
        setCategoryTotals([]);
      });
  }, [year, month]);

  const pieData = categoryTotals.map((c) => ({
    name: c.category,
    value: Number(c.total),
  }));

  return (
    <div className="card">
      <h1>Insights</h1>

      <div>
        <label>Month: </label>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <label style={{ marginLeft: "12px" }}>Year: </label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>

      <h2>Total Spent: ₹{total}</h2>

      {pieData.length > 0 ? (
        <div style={{ display: "flex", gap: "24px", marginTop: "24px" }}>
          <div style={{ width: "50%", height: 300 }}>
            <h3>Category Distribution</h3>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ width: "50%", height: 300 }}>
            <h3>Category Spend</h3>
            <ResponsiveContainer>
              <BarChart data={pieData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6894F9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p>No data for this month.</p>
      )}
    </div>
  );
}

export default Insights;
