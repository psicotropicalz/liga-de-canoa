import { describe, expect, it } from "vitest";
import { LIMITES } from "@liga/shared";
import { limiteTotal } from "./index";

describe("cimientos", () => {
  it("las categorías suman el máximo total", () => {
    const suma =
      LIMITES.proezaPersonal + LIMITES.flotaDeCanoa + LIMITES.encargoSemanal + LIMITES.juicios;
    expect(suma).toBe(LIMITES.total);
    expect(limiteTotal()).toBe(100);
  });
});
