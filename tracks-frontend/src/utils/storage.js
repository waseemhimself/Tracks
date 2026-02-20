const STORAGE_KEY = "finfin-data";

export function initStorage() {
  const existing = localStorage.getItem(STORAGE_KEY);

  if (!existing) {
    const initialData = {
      Expenses: [],
      Categories: [
        { Id: crypto.randomUUID(), Name: "Food" },
        { Id: crypto.randomUUID(), Name: "Transport" },
        { Id: crypto.randomUUID(), Name: "Shopping" },
        { Id: crypto.randomUUID(), Name: "Bills" },
        { Id: crypto.randomUUID(), Name: "Entertainment" },
        { Id: crypto.randomUUID(), Name: "Other" },
      ],
      Goals: [],
      Profile: {},
      Streak: {
        Current: 0,
        Longest: 0,
        LastLoggedDate: null,
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }

  return JSON.parse(existing);
}

export function getData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : initStorage();
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
