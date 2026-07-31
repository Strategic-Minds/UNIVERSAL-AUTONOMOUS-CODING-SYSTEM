import { expect, test } from "@playwright/test";

const allowedConsolePatterns = [
  /Download the React DevTools/i,
  /Fast Refresh/i,
];

function shouldIgnoreConsoleMessage(message: string) {
  return allowedConsolePatterns.some((pattern) => pattern.test(message));
}

test("root redirects to the command center without browser failures", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const serverErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error" && !shouldIgnoreConsoleMessage(message.text())) {
      consoleErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => pageErrors.push(error.message));

  page.on("response", (response) => {
    if (response.status() >= 500) {
      serverErrors.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page).toHaveURL(/\/dashboard\/?$/);
  await expect(page.getByRole("heading", { name: "Command Center" })).toBeVisible();
  await expect(page.getByText("Universal Autonomous Coding System", { exact: false })).toBeVisible();

  expect(consoleErrors, `Console errors:\n${consoleErrors.join("\n")}`).toEqual([]);
  expect(pageErrors, `Page errors:\n${pageErrors.join("\n")}`).toEqual([]);
  expect(serverErrors, `Server errors:\n${serverErrors.join("\n")}`).toEqual([]);
});

test("dashboard has no horizontal overflow at the active viewport", async ({ page }) => {
  await page.goto("/dashboard", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Command Center" })).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    documentWidth: document.documentElement.scrollWidth,
  }));

  expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
});
