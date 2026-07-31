import { expect, test } from "@playwright/test";

test("command center produces reviewable visual evidence", async ({ page }, testInfo) => {
  await page.goto("/dashboard", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Command Center" })).toBeVisible();

  const screenshot = await page.screenshot({ fullPage: true });
  await testInfo.attach(`command-center-${testInfo.project.name}.png`, {
    body: screenshot,
    contentType: "image/png",
  });

  const visualContract = await page.evaluate(() => {
    const root = document.documentElement;
    const bodyText = document.body.innerText;
    const interactiveElements = Array.from(
      document.querySelectorAll<HTMLElement>("a, button, input, textarea, select")
    );

    return {
      horizontalOverflow: root.scrollWidth - root.clientWidth,
      emptyInteractiveLabels: interactiveElements.filter((element) => {
        const label =
          element.getAttribute("aria-label") ??
          element.getAttribute("title") ??
          element.innerText ??
          "";
        return label.trim().length === 0;
      }).length,
      containsFatalText: /Unhandled Runtime Error|Application error|Internal Server Error/i.test(bodyText),
    };
  });

  expect(visualContract.horizontalOverflow).toBeLessThanOrEqual(1);
  expect(visualContract.emptyInteractiveLabels).toBe(0);
  expect(visualContract.containsFatalText).toBe(false);
});
