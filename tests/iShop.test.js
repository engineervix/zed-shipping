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
    const weight1 = 0.3;
    const source1 = "USA";
    const expectedCost1 = 13.86;

    const result1 = calculateShippingCost(weight1, source1);

    expect(result1).toEqual(expectedCost1);

    const weight2 = 0.7;
    const source2 = "USA";
    const expectedCost2 = 19.5;

    const result2 = calculateShippingCost(weight2, source2);

    expect(result2).toEqual(expectedCost2);

    const weight3 = 1.5;
    const source3 = "USA";
    const expectedCost3 = 25.14;

    const result3 = calculateShippingCost(weight3, source3);

    expect(result3).toEqual(expectedCost3);
  });

  it("should return the correct shipping cost for UK", () => {
    const weight1 = 0.1;
    const source1 = "UK";
    const expectedCost1 = 6.5;

    const result1 = calculateShippingCost(weight1, source1);

    expect(result1).toEqual(expectedCost1);

    const weight2 = 0.4;
    const source2 = "UK";
    const expectedCost2 = 8.48;

    const result2 = calculateShippingCost(weight2, source2);

    expect(result2).toEqual(expectedCost2);

    const weight3 = 0.9;
    const source3 = "UK";
    const expectedCost3 = 12.46;

    const result3 = calculateShippingCost(weight3, source3);

    expect(result3).toEqual(expectedCost3);

    const weight4 = 1.8;
    const source4 = "UK";
    const expectedCost4 = 20.42;

    const result4 = calculateShippingCost(weight4, source4);

    expect(result4).toEqual(expectedCost4);
  });

  it("should return null for an unknown source", () => {
    const weight = 0.5;
    const source = "Unknown";

    const result = calculateShippingCost(weight, source);

    expect(result).toBeNull();
  });
});
