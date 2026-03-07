export function UsernameDisplay({ username }: { username: string }) {
  return (
    <box flexDirection="column" gap={1}>
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
