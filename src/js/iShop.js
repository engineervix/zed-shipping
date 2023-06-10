/**
 * Rounds up a number to the nearest 0.50.
 *
 * @param {number} n - The number to round up.
 * @returns {number} - The rounded up number.
 */
export function roundUp(n) {
  return Math.ceil(n * 2) / 2;
}

/**
 * Calculates the shipping cost based on the weight and source.
 *
 * @param {number} weight - The weight of the package.
 * @param {string} source - The source of the package ("USA" or "UK").
 * @returns {number|null} - The calculated shipping cost or null if the source is not recognized.
 */
export function calculateShippingCost(weight, source) {
  if (source === "USA") {
    const oneKgPrice = 19.5;
    const halfKgPrice = 13.86;
    const pricePerExtraHalfKg = 5.64;

    if (weight <= 0.5) {
      return halfKgPrice;
    }
    if (weight < 1.0) {
      return oneKgPrice;
    }

    const billableWeight = roundUp(weight);
    const fixedCost = oneKgPrice;
    const extraHalfKgCount = (billableWeight - 1) / 0.5;
    const totalCost = fixedCost + pricePerExtraHalfKg * extraHalfKgCount;

    return totalCost;
  } else if (source === "UK") {
    const oneKgPrice = 12.46;
    const halfKgPrice = 8.48;
    const quarterKgPrice = 6.5;
    const pricePerExtraHalfKg = 3.98;

    if (weight <= 0.25) {
      return quarterKgPrice;
    }
    if (weight < 0.5) {
      return halfKgPrice;
    }
    if (weight < 1.0) {
      return oneKgPrice;
    }

    const billableWeight = roundUp(weight);
    const fixedCost = oneKgPrice;
    const extraHalfKgCount = (billableWeight - 1) / 0.5;
    const totalCost = fixedCost + pricePerExtraHalfKg * extraHalfKgCount;

    return totalCost;
  } else {
    return null;
  }
}
