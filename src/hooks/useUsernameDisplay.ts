import { useKeyboard } from "@opentui/react";
import { useState } from "react";
import { LOWERCASE_LETTERS } from "../constants";

export function useUsernameDisplay() {
  const [username, setUsername] = useState("");
  const [finishedSettingUsername, setFinishedSettingUsername] = useState(false);

  useKeyboard((key) => {
    if (finishedSettingUsername) return;
    if (key.name === "enter" || key.name === "return") {
      if (username.length > 0) {
        setFinishedSettingUsername(true);
      }
    }
    if (key.name === "backspace") {
      setUsername(username.slice(0, -1));
    }
    if (LOWERCASE_LETTERS.includes(key.name)) {
      const char = key.shift ? key.name.toUpperCase() : key.name;
      setUsername(username + char);
    }
  });

  return { username, finishedSettingUsername };
}
