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
      const isIncorrectSpace = !isCorrect && char === " ";
      return (
        <span
          key={i}
          fg={isIncorrectSpace ? "#FFFFFF" : isCorrect ? "#22CC22" : "#FF4444"}
          bg={isIncorrectSpace ? "#FF4444" : undefined}
        >
          {char}
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
