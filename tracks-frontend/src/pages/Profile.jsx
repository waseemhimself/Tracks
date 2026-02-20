import { useEffect, useState } from "react";
import { getData } from "../utils/storage";

function Profile() {
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    const data = getData();
    setStreak(data.Streak);
  }, []);

  if (!streak) return null;

  return (
    <div className="card">
      <h1>Profile</h1>
      <h2>🔥 Current Streak: {streak.Current} days</h2>
      <p>🏆 Longest Streak: {streak.Longest} days</p>
    </div>
  );
}

export default Profile;
