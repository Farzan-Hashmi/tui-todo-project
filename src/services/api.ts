export async function submitResults(
  username: string,
  userDeviceKey: string,
  wpm: number,
) {
  await fetch(
    "https://tui-todo-backend-production.up.railway.app/submit-results",
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
  const response = await fetch(
    "https://tui-todo-backend-production.up.railway.app/today-sentence",
  );
  return response.json();
}

export async function getLeaderboard() {
  const response = await fetch(
    "https://tui-todo-backend-production.up.railway.app/leaderboard",
  );
  return response.json();
}
