import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const raiz = resolve(__dirname, "..");

function ignorado(ruta: string): boolean {
  try {
    execFileSync("git", ["check-ignore", "-q", ruta], { cwd: raiz });
    return true;
  } catch {
    return false;
  }
}

describe("higiene de secretos", () => {
  it.each([".env", ".env.local", ".env.production", "serviceAccount.json", "secrets/x.json"])(
    "%s está ignorado por git",
    (ruta) => {
      expect(ignorado(ruta)).toBe(true);
    },
  );

  it(".env.example no está ignorado", () => {
    expect(ignorado(".env.example")).toBe(false);
  });

  it(".env.example no contiene valores", () => {
    const lineas = readFileSync(resolve(raiz, ".env.example"), "utf8")
      .split("\n")
      .filter((l) => l.trim() && !l.trim().startsWith("#"));
    for (const l of lineas) {
      const valor = (l.split("=")[1] ?? "").split("#")[0]?.trim() ?? "";
      if (!l.startsWith("INTEGRATION_MODE")) expect(valor, l).toBe("");
    }
  });
});
