import { roundUp, calculateShippingCost } from "../src/js/iShop";

describe("roundUp", () => {
  it("should round up to the nearest 0.50", () => {
    const number1 = 3.25;
    const expected1 = 3.5;

    const result1 = roundUp(number1);

    expect(result1).toEqual(expected1);

    const number2 = 7.8;
    const expected2 = 8.0;

    const result2 = roundUp(number2);

    expect(result2).toEqual(expected2);

    const number3 = 4.0;
    const expected3 = 4.0;

    const result3 = roundUp(number3);

    expect(result3).toEqual(expected3);
  });
});

describe("calculateShippingCost", () => {
  it("should return the correct shipping cost for USA", () => {
    const weight = 0.3;
    const source = "USA";
    const expectedCost = 9.73;

    const result = calculateShippingCost(weight, source);

    expect(result).toEqual(expectedCost);
  });

  it("should return the correct shipping cost for UK", () => {
    const weight = 0.7;
    const source = "UK";
    const expectedCost = 10.62;

    const result = calculateShippingCost(weight, source);

    expect(result).toEqual(expectedCost);
  });

  it("should return null for an unknown source", () => {
    const weight = 0.5;
    const source = "Unknown";

    const result = calculateShippingCost(weight, source);

    expect(result).toBeNull();
  });
});
