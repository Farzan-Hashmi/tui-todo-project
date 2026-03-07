const API_BASE = "https://tui-todo-backend-production.up.railway.app";

export async function registerAttempt(
  username: string,
  userDeviceKey: string,
) {
  const response = await fetch(`${API_BASE}/register-attempt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, userDeviceKey }),
  });
  return response;
}

export async function submitResults(
  username: string,
  userDeviceKey: string,
  wpm: number,
) {
  await fetch(
    `${API_BASE}/submit-results`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        userDeviceKey,
        wpm,
        clientDate: new Date().toISOString(),
      }),
    },
  );
}

export async function getTodaySentence() {
  const response = await fetch(`${API_BASE}/today-sentence`);
  return response.json();
}

export async function getLeaderboard() {
  const response = await fetch(`${API_BASE}/leaderboard`);
  return response.json();
}
