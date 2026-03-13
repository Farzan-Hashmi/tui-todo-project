export function UsernameDisplay({ username }: { username: string }) {
  return (
    <box flexDirection="column" gap={1}>
      <text fg="#FFD700">⌨ TUI Typing Race</text>
      <box flexDirection="column" paddingX={1}>
        <text fg="#AAAAAA">
          • A new sentence appears every day — type it as fast as you can
        </text>
        <text fg="#AAAAAA">
          • Your WPM (words per minute) is recorded on a shared leaderboard
        </text>
        <text fg="#AAAAAA">
          • You only get one attempt per day, so make it count!
        </text>
      </box>
      <text>{""}</text>
      <text>Please enter your username:</text>
      <box
        border
        borderStyle="rounded"
        borderColor="#AAAAAA"
        paddingX={1}
        width={30}
      >
        <text>{username || " "}</text>
      </box>
      <text fg="#888888">Press Enter to confirm</text>
    </box>
  );
}
