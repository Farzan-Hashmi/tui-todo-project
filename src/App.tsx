import { useState, useEffect } from "react";
import { PLACEHOLDER_TEXT } from "./constants";
import { useTypingTest } from "./hooks/useTypingTest";
import { TypingTestDisplay } from "./components/TypingTestDisplay";
import { UsernameDisplay } from "./components/UsernameDisplay";
import {
  getLeaderboard,
  getTodaySentence,
  submitResults,
} from "./services/api";
import { getUserDeviceKey } from "./services/userId";
import { useUsernameDisplay } from "./hooks/useUsernameDisplay";
import { Leaderboard } from "./components/Leaderboard";

interface LeaderboardEntry {
  username: string;
  userDeviceKey: string;
  wpm: number;
}

export function App() {
  const [userDeviceKey, setUserDeviceKey] = useState("");
  const [todaySentence, setTodaySentence] = useState("");
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  useEffect(() => {
    const key = getUserDeviceKey();
    setUserDeviceKey(key);
    getTodaySentence().then((data) => {
      const normalized = data.sentence
        .replace(/[\u00A0\u200B\u200C\u200D\uFEFF]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      setTodaySentence(normalized);
    });
    getLeaderboard().then((data: LeaderboardEntry[]) => {
      setAlreadySubmitted(data.some((entry) => entry.userDeviceKey === key));
    });
  }, []);

  const { username, finishedSettingUsername } = useUsernameDisplay();

  const { textUserTyped, wpm, isUserDoneTyping } = useTypingTest({
    targetText: todaySentence,
    enabled: finishedSettingUsername && !alreadySubmitted,
    onComplete: (wpm: number) => {
      submitResults(username, userDeviceKey, wpm).catch(console.error);
    },
  });

  const showLeaderboard = alreadySubmitted || isUserDoneTyping;
  const showUsernamePrompt = !showLeaderboard && !finishedSettingUsername;
  const showTypingTest = !showLeaderboard && finishedSettingUsername;

  return (
    <box flexDirection="column" gap={1} paddingX={2} paddingY={1}>
      {showLeaderboard && (
        <box flexDirection="column" gap={1}>
          <Leaderboard />
        </box>
      )}
      {showUsernamePrompt && <UsernameDisplay username={username} />}
      {showTypingTest && (
        <TypingTestDisplay
          truthText={todaySentence}
          userTypedText={textUserTyped}
          wpm={wpm}
        />
      )}
    </box>
  );
}
