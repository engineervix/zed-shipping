import { DOMESTIC_RATES, INTERNATIONAL_RATES, LOCATION_ZONES } from '@/assets/shipping-data.js'

/**
 * Calculate volumetric weight using One World formula: L×W×H÷6000
 */
export function calculateVolumetricWeight(length, width, height) {
  if (!length || !width || !height) return 0
  return (length * width * height) / 6000
}

/**
 * Get the billable weight (higher of actual or volumetric)
 */
export function getBillableWeight(actualWeight, length, width, height) {
  const volumetricWeight = calculateVolumetricWeight(length, width, height)
  return Math.max(actualWeight, volumetricWeight)
}

/**
 * Round weight to nearest 0.5kg increment for pricing
 */
export function roundToNearestHalf(weight) {
  return Math.ceil(weight * 2) / 2
}

/**
 * Get zone for a location
 */
export function getZoneForLocation(location) {
  return LOCATION_ZONES[location] || 'ZONE_4'
}

/**
 * Calculate domestic shipping cost
 */
export function calculateDomesticCost(weight, location) {
  const zone = getZoneForLocation(location)
  const roundedWeight = roundToNearestHalf(weight)

  // Zone 4 uses Zone 3 rates
  const rates = zone === 'ZONE_4' ? DOMESTIC_RATES.ZONE_3 : DOMESTIC_RATES[zone]

  if (!rates) return { cost: 0, error: 'Invalid zone' }

  // Check if weight is in rate table
  if (roundedWeight <= 30 && rates[roundedWeight]) {
    return {
      cost: rates[roundedWeight],
      zone,
      isRemoteArea: zone === 'ZONE_4',
      weight: roundedWeight,
    }
  }

  // Calculate for weights over 30kg
  if (roundedWeight > 30) {
    const baseRate = rates[30]
    const additionalWeight = roundedWeight - 30
    const additionalCost = additionalWeight * rates.additionalKg

    return {
      cost: baseRate + additionalCost,
      zone,
      isRemoteArea: zone === 'ZONE_4',
      weight: roundedWeight,
      breakdown: {
        base: baseRate,
        additional: additionalCost,
        additionalWeight,
      },
    }
  }

  return { cost: 0, error: 'Unable to calculate cost' }
}

/**
 * Calculate international shipping cost (UK to Zambia)
 */
export function calculateInternationalCost(weight, isLusaka = true) {
  const roundedWeight = roundToNearestHalf(weight)
  const rates = isLusaka ? INTERNATIONAL_RATES.LUSAKA : INTERNATIONAL_RATES.OUTSIDE_LUSAKA

  // Check if weight is in rate table (up to 10kg)
  if (roundedWeight <= 10 && rates[roundedWeight]) {
    return {
      cost: rates[roundedWeight],
      weight: roundedWeight,
      transitTime: rates.transitDays,
      destination: isLusaka ? 'Lusaka' : 'Outside Lusaka',
    }
  }

  // Calculate for weights over 10kg
  if (roundedWeight > 10) {
    const baseRate = rates[10]
    const additionalWeight = roundedWeight - 10
    const additionalCost = Math.ceil(additionalWeight * 2) * rates.additionalHalfKg // Per half kg

    return {
      cost: baseRate + additionalCost,
      weight: roundedWeight,
      transitTime: rates.transitDays,
      destination: isLusaka ? 'Lusaka' : 'Outside Lusaka',
      breakdown: {
        base: baseRate,
        additional: additionalCost,
        additionalWeight,
      },
    }
  }

  return { cost: 0, error: 'Unable to calculate cost' }
}

/**
 * Format currency to ZMW
 */
export function formatCurrency(amount) {
  return `ZMW ${amount.toLocaleString()}`
}

/**
 * Validate package dimensions and weight
 */
export function validatePackage(weight, length, width, height) {
  const errors = []

  if (weight <= 0 || weight > 30) {
    errors.push('Weight must be between 0.1kg and 30kg')
  }

  if (length && width && height) {
    if (length <= 0 || width <= 0 || height <= 0) {
      errors.push('All dimensions must be positive numbers')
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
