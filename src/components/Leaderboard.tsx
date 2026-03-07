import { useState, useEffect } from "react";
import { getLeaderboard } from "../services/api";

interface LeaderboardEntry {
  username: string;
  wpm: number;
}

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = () =>
      getLeaderboard()
        .then((data: LeaderboardEntry[]) => setEntries(data))
        .catch(console.error)
        .finally(() => setLoading(false));

    fetchLeaderboard();
    const id = setInterval(fetchLeaderboard, 750);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return <text fg="#888888">Loading leaderboard...</text>;
  }

  if (entries.length === 0) {
    return <text fg="#888888">No entries yet. Be the first!</text>;
  }

  const maxNameLen = Math.max(...entries.map((e) => e.username.length), 4);

  return (
    <box flexDirection="column" gap={0}>
      <text fg="#888888">
        {"#  "}
        {"Name".padEnd(maxNameLen + 2)}
        {"WPM"}
      </text>
      <text fg="#444444">{"─".repeat(maxNameLen + 12)}</text>
      {entries.map((entry, i) => {
        const rank = String(i + 1).padStart(2);
        const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "  ";
        const nameColor =
          i === 0
            ? "#FFD700"
            : i === 1
              ? "#C0C0C0"
              : i === 2
                ? "#CD7F32"
                : "#FFFFFF";
        return (
          <text key={entry.username + i}>
            <span fg="#888888">{rank} </span>
            <span>{medal} </span>
            <span fg={nameColor}>{entry.username.padEnd(maxNameLen + 2)}</span>
            <span fg="#00FF88">{String(entry.wpm)}</span>
          </text>
        );
      })}
    </box>
  );
}
