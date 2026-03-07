export function TypingTestDisplay({
  truthText,
  userTypedText,
  wpm,
}: {
  truthText: string;
  userTypedText: string;
  wpm: number;
}) {
  const displayText = truthText.split("").map((char, i) => {
    if (i < userTypedText.length) {
      const isCorrect = userTypedText[i] === char;
      if (!isCorrect && char === " ") {
        return (
          <span key={i} bg="#FF4444">
            {" "}
          </span>
        );
      }
      return (
        <span key={i} fg={isCorrect ? "#22CC22" : "#FF4444"}>
          {truthText[i]}
        </span>
      );
    }
    if (i === userTypedText.length) {
      return (
        <span key={i} fg="#FFFFFF">
          <u>{char}</u>
        </span>
      );
    }
    return (
      <span key={i} fg="#888888">
        {char}
      </span>
    );
  });

  return (
    <box flexDirection="column" gap={1}>
      <text>{displayText}</text>
      <text>{String(wpm)} WPM</text>
    </box>
  );
}
