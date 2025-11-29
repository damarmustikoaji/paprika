import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

export default defineConfig({
  testDir: "./tests",
  timeout: Number(process.env.TIMEOUT) || 5000,
  retries: Number(process.env.RETRIES) || 0,
  workers: Number(process.env.WORKERS) || 4,

  outputDir: "test-results/",

  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }]
  ],

  use: {
    headless: process.env.HEADLESS === "true" || true,
    viewport: { width: 1280, height: 720 },
    video: "on",
    screenshot: "on",
    trace: "on"
  },

  projects: getProjects()
});

function getProjects() {
  const browser = process.env.BROWSER?.toLowerCase() || "cross";

  const map: any = {
    chromium: [{ name: "chromium", use: { browserName: "chromium" } }],
    firefox: [{ name: "firefox", use: { browserName: "firefox" } }],
    cross: [
      { name: "chromium", use: { browserName: "chromium" } },
      { name: "firefox", use: { browserName: "firefox" } }
    ]
  };

  return map[browser] || map["cross"];
}
