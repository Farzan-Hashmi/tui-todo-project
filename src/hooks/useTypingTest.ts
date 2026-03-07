import { useState, useRef, useEffect } from "react";
import { useKeyboard } from "@opentui/react";
import { LOWERCASE_LETTERS, COMMON_PUNCTUATION } from "../constants";

interface UseTypingTestOptions {
  targetText: string;
  enabled?: boolean;
  onComplete?: (wpm: number) => void;
}

export function useTypingTest({
  targetText,
  enabled = true,
  onComplete,
}: UseTypingTestOptions) {
  const [textUserTyped, setTextUserTyped] = useState("");
  const [wpm, setWpm] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const hasCompletedRef = useRef(false);
  const isUserDoneTyping = textUserTyped === targetText;

  useKeyboard((key) => {
    if (!enabled) return;
    let newText = textUserTyped;

    if (
      LOWERCASE_LETTERS.includes(key.name) ||
      COMMON_PUNCTUATION.includes(key.name)
    ) {
      const char = key.shift ? key.name.toUpperCase() : key.name;
      newText = textUserTyped + char;
    } else if (key.name === "backspace") {
      newText = textUserTyped.slice(0, -1);
    } else if (key.name === "space") {
      newText = textUserTyped + " ";
    }

    if (newText.length > targetText.length) {
      return;
    }
    setTextUserTyped(newText);

    if (newText === targetText && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete?.(wpm);
    }
  });

  useEffect(() => {
    if (!enabled) return;
    if (textUserTyped.length === 0) {
      startTimeRef.current = null;
      setWpm(0);
      return;
    }
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }

    const calculateWpm = () => {
      if (!startTimeRef.current) return;
      let correctChars = 0;
      for (let i = 0; i < textUserTyped.length; i++) {
        if (textUserTyped[i] === targetText[i]) {
          correctChars++;
        }
      }
      const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
      if (elapsedMinutes > 0) {
        setWpm(Math.round(correctChars / 5 / elapsedMinutes));
      }
    };

    calculateWpm();
    const id = setInterval(calculateWpm, 500);
    return () => clearInterval(id);
  }, [textUserTyped]);

  return { textUserTyped, wpm, isUserDoneTyping };
}
