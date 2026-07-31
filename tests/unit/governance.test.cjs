const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "../..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

describe("UACS validation governance", () => {
  test("package scripts are fail-closed", () => {
    const pkg = JSON.parse(read("package.json"));
    const scripts = Object.values(pkg.scripts).join("\n");

    expect(scripts).not.toMatch(/\|\|\s*true/);
    expect(pkg.scripts.typecheck).toBe("tsc --noEmit");
    expect(pkg.scripts["test:e2e"]).toContain("playwright test");
    expect(pkg.scripts["test:visual"]).toContain("playwright test");
    expect(pkg.scripts["test:security"]).toContain("audit-level=high");
  });

  test("CI does not suppress validation failures", () => {
    const workflow = read(".github/workflows/faang-qa-gate.yml");

    expect(workflow).not.toMatch(/\|\|\s*true/);
    expect(workflow).not.toMatch(/continue-on-error:\s*true/);
    expect(workflow).toContain("npm run typecheck");
    expect(workflow).toContain("npm run test:e2e");
    expect(workflow).toContain("npm run test:visual");
  });

  test("browser evidence is retained when validation fails", () => {
    const config = read("playwright.config.ts");

    expect(config).toContain('trace: "retain-on-failure"');
    expect(config).toContain('screenshot: "only-on-failure"');
    expect(config).toContain('video: "retain-on-failure"');
    expect(config).toContain('name: "desktop-chromium"');
    expect(config).toContain('name: "tablet-chromium"');
    expect(config).toContain('name: "mobile-chromium"');
  });
});
