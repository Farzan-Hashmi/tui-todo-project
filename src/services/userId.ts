import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import { randomUUID } from "crypto";

const CONFIG_DIR = join(homedir(), ".tui-typing-test");
const DEVICE_KEY_FILE = join(CONFIG_DIR, "user-device-key");

export function getUserDeviceKey(): string {
  try {
    return readFileSync(DEVICE_KEY_FILE, "utf-8").trim();
  } catch {
    const deviceKey = randomUUID();
    mkdirSync(CONFIG_DIR, { recursive: true });
    writeFileSync(DEVICE_KEY_FILE, deviceKey);
    return deviceKey;
  }
}
