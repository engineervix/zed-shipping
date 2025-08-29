<template>
  <div
    :class="['min-h-screen transition-colors duration-300', isDark ? 'bg-gray-900' : 'bg-gray-50']"
  >
    <!-- Header -->
    <div class="bg-gradient-to-r from-pink-700 to-pink-800 text-white p-4 shadow-lg">
      <div class="max-w-md mx-auto">
        <div class="flex justify-between items-center mb-2">
          <h1 class="text-xl font-bold">Shipping Calculator</h1>
          <Button
            @click="toggleDarkMode"
            :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
            text
            rounded
            size="small"
            class="text-white hover:bg-pink-600"
            v-tooltip.bottom="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          />
        </div>
        <p class="text-center text-pink-100 text-sm">Calculate your shipping costs instantly</p>
      </div>
    </div>

    <div class="max-w-md mx-auto p-4 space-y-4">
      <!-- Service Type Selection -->
      <Card :class="['shadow-md', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white']">
        <template #content>
          <h3 :class="['font-semibold mb-3', isDark ? 'text-gray-200' : 'text-gray-700']">
            Select Service Type
          </h3>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center">
              <RadioButton v-model="serviceType" inputId="domestic" value="domestic" />
              <label
                for="domestic"
                :class="['ml-2 cursor-pointer', isDark ? 'text-gray-300' : 'text-gray-700']"
                >Domestic</label
              >
            </div>
            <div class="flex items-center">
              <RadioButton v-model="serviceType" inputId="international" value="international" />
              <label
                for="international"
                :class="['ml-2 cursor-pointer', isDark ? 'text-gray-300' : 'text-gray-700']"
                >International (UK)</label
              >
            </div>
          </div>
        </template>
      </Card>

      <!-- Package Details -->
      <Card :class="['shadow-md', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white']">
        <template #content>
          <h3 :class="['font-semibold mb-3', isDark ? 'text-gray-200' : 'text-gray-700']">
            Package Details
          </h3>

          <!-- Weight Input -->
          <div class="mb-4">
            <label
              :class="[
                'block text-sm font-medium mb-2',
                isDark ? 'text-gray-300' : 'text-gray-700',
              ]"
              >Actual Weight (kg)</label
            >
            <InputNumber
              v-model="weight"
              :min="0.1"
              :max="30"
              :step="0.1"
              :minFractionDigits="1"
              :maxFractionDigits="1"
              placeholder="Enter weight in kg"
              fluid
              :class="isDark ? 'dark-input' : ''"
            />
            <small :class="isDark ? 'text-gray-400' : 'text-gray-500'"
              >Maximum 30kg per package</small
            >
          </div>

          <!-- Dimensions -->
          <div class="mb-4">
            <label
              :class="[
                'block text-sm font-medium mb-2',
                isDark ? 'text-gray-300' : 'text-gray-700',
              ]"
              >Dimensions (cm) - Optional</label
            >
            <div class="grid grid-cols-3 gap-2">
              <div>
                <InputNumber
                  v-model="length"
                  :min="0.1"
                  :step="0.1"
                  :maxFractionDigits="1"
                  placeholder="L"
                  fluid
                  :class="isDark ? 'dark-input' : ''"
                />
                <small :class="['text-xs block mt-1', isDark ? 'text-gray-400' : 'text-gray-500']"
                  >Length</small
                >
              </div>
              <div>
                <InputNumber
                  v-model="width"
                  :min="0.1"
                  :step="0.1"
                  :maxFractionDigits="1"
                  placeholder="W"
                  fluid
                  :class="isDark ? 'dark-input' : ''"
                />
                <small :class="['text-xs block mt-1', isDark ? 'text-gray-400' : 'text-gray-500']"
                  >Width</small
                >
              </div>
              <div>
                <InputNumber
                  v-model="height"
                  :min="0.1"
                  :step="0.1"
                  :maxFractionDigits="1"
                  placeholder="H"
                  fluid
                  :class="isDark ? 'dark-input' : ''"
                />
                <small :class="['text-xs block mt-1', isDark ? 'text-gray-400' : 'text-gray-500']"
                  >Height</small
                >
              </div>
            </div>
            <small :class="['mt-2 block', isDark ? 'text-gray-400' : 'text-gray-500']"
              >For volumetric weight calculation</small
            >
          </div>

          <!-- Volumetric Weight Display -->
          <div
            v-if="volumetricWeight > 0"
            :class="[
              'mb-4 p-3 rounded-lg border',
              isDark ? 'bg-blue-900/50 border-blue-700' : 'bg-blue-50 border-blue-200',
            ]"
          >
            <div class="text-sm">
              <div :class="['font-medium mb-1', isDark ? 'text-blue-300' : 'text-blue-800']">
                Weight Calculation:
              </div>
              <div :class="['flex justify-between', isDark ? 'text-blue-400' : 'text-blue-700']">
                <span>Actual:</span>
                <span>{{ weight?.toFixed(1) || 0 }}kg</span>
              </div>
              <div :class="['flex justify-between', isDark ? 'text-blue-400' : 'text-blue-700']">
                <span>Volumetric:</span>
                <span>{{ volumetricWeight.toFixed(1) }}kg</span>
              </div>
              <div
                :class="[
                  'flex justify-between font-medium border-t mt-1 pt-1',
                  isDark ? 'text-blue-300 border-blue-700' : 'text-blue-800 border-blue-200',
                ]"
              >
                <span>Billable:</span>
                <span>{{ billableWeight.toFixed(1) }}kg</span>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- Destination Selection -->
      <Card
        v-if="serviceType === 'domestic'"
        :class="['shadow-md', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white']"
      >
        <template #content>
          <h3 :class="['font-semibold mb-3', isDark ? 'text-gray-200' : 'text-gray-700']">
            Destination
          </h3>
          <Select
            v-model="selectedLocation"
            :options="locations"
            optionLabel="label"
            optionValue="value"
            placeholder="Select destination in Zambia"
            filter
            fluid
            class="w-full"
          />
          <div v-if="selectedLocation" class="mt-2">
            <Tag :value="getLocationZoneDisplay(selectedLocation)" severity="info" />
          </div>
        </template>
      </Card>

      <!-- International Destination -->
      <Card
        v-if="serviceType === 'international'"
        :class="['shadow-md', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white']"
      >
        <template #content>
          <h3 :class="['font-semibold mb-3', isDark ? 'text-gray-200' : 'text-gray-700']">
            Delivery Location in Zambia
          </h3>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center">
              <RadioButton v-model="internationalDestination" inputId="lusaka" value="lusaka" />
              <label
                for="lusaka"
                :class="['ml-2 cursor-pointer', isDark ? 'text-gray-300' : 'text-gray-700']"
                >Lusaka</label
              >
            </div>
            <div class="flex items-center">
              <RadioButton v-model="internationalDestination" inputId="outside" value="outside" />
              <label
                for="outside"
                :class="['ml-2 cursor-pointer', isDark ? 'text-gray-300' : 'text-gray-700']"
                >Outside Lusaka</label
              >
            </div>
          </div>
        </template>
      </Card>

      <!-- Results -->
      <Card
        v-if="calculatedCost"
        :class="[
          'shadow-lg border-l-4 border-l-pink-700',
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white',
        ]"
      >
        <template #content>
          <h3
            :class="[
              'font-bold mb-3 flex items-center',
              isDark ? 'text-gray-200' : 'text-gray-800',
            ]"
          >
            <i class="pi pi-calculator mr-2 text-pink-700"></i>
            Shipping Cost
          </h3>

          <div class="space-y-3">
            <div class="text-3xl font-bold text-pink-700">
              {{ formatCurrency(calculatedCost.cost) }}
            </div>

            <div :class="['text-sm space-y-1', isDark ? 'text-gray-400' : 'text-gray-600']">
              <div>Service: {{ serviceTypeDisplay }}</div>
              <div v-if="serviceType === 'domestic'">
                Destination: {{ selectedLocation }} ({{ getZoneDisplayName(calculatedCost.zone) }})
              </div>
              <div v-if="serviceType === 'international'">
                Destination: {{ calculatedCost.destination }}
              </div>
              <div>Billable Weight: {{ calculatedCost.weight }}kg</div>
              <div v-if="calculatedCost.transitTime">
                Transit Time: {{ calculatedCost.transitTime }}
              </div>
            </div>

            <!-- Cost Breakdown for heavy items -->
            <div
              v-if="calculatedCost.breakdown"
              :class="['p-3 rounded text-sm', isDark ? 'bg-gray-700' : 'bg-gray-50']"
            >
              <div :class="['font-medium mb-1', isDark ? 'text-gray-300' : 'text-gray-700']">
                Cost Breakdown:
              </div>
              <div :class="['flex justify-between', isDark ? 'text-gray-400' : 'text-gray-600']">
                <span
                  >Base rate ({{
                    calculatedCost.weight <= 30 ? calculatedCost.weight : 30
                  }}kg):</span
                >
                <span>{{ formatCurrency(calculatedCost.breakdown.base) }}</span>
              </div>
              <div :class="['flex justify-between', isDark ? 'text-gray-400' : 'text-gray-600']">
                <span>Additional ({{ calculatedCost.breakdown.additionalWeight }}kg):</span>
                <span>{{ formatCurrency(calculatedCost.breakdown.additional) }}</span>
              </div>
            </div>

            <!-- Remote Area Surcharge Warning -->
            <div
              v-if="calculatedCost.isRemoteArea"
              :class="[
                'p-3 border-l-4 border-l-orange-400 rounded',
                isDark ? 'bg-orange-900/30' : 'bg-orange-50',
              ]"
            >
              <div class="flex items-start">
                <i class="pi pi-exclamation-triangle text-orange-500 mr-2 mt-1"></i>
                <div :class="['text-sm', isDark ? 'text-orange-300' : 'text-orange-700']">
                  <div class="font-medium">Remote Area Delivery</div>
                  <div>Additional surcharges may apply for this location.</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>

      <!-- UK Address for International -->
      <Card
        v-if="serviceType === 'international'"
        :class="['shadow-md', isDark ? 'bg-gray-800 border-gray-700' : 'bg-white']"
      >
        <template #content>
          <h3
            :class="[
              'font-semibold mb-3 flex items-center',
              isDark ? 'text-gray-200' : 'text-gray-700',
            ]"
          >
            <i class="pi pi-map-marker mr-2 text-pink-700"></i>
            UK Delivery Address
          </h3>
          <div
            :class="[
              'p-3 rounded text-sm font-mono space-y-1',
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-800',
            ]"
          >
            <div><strong>First Name:</strong> Your Full Name</div>
            <div><strong>Last Name:</strong> Your OneWorld Account Number</div>
            <div><strong>Address:</strong> Kirtland Farm, Oakley Road</div>
            <div class="ml-16">One World Logistics</div>
            <div><strong>City:</strong> Worminghall</div>
            <div><strong>County:</strong> Buckinghamshire</div>
            <div><strong>Postal Code:</strong> HP18 9UN</div>
            <div><strong>Tel:</strong> 0753 4454055</div>
          </div>
          <small :class="['mt-2 block', isDark ? 'text-gray-400' : 'text-gray-500']">
            Use this address when shopping online from UK stores
          </small>
        </template>
      </Card>

      <!-- Important Information Accordion -->
      <Accordion>
        <AccordionPanel value="0">
          <AccordionHeader>
            <span :class="['flex items-center', isDark ? 'text-gray-200' : 'text-gray-700']">
              <i class="pi pi-info-circle mr-2"></i>
              Important Information
            </span>
          </AccordionHeader>
          <AccordionContent>
            <div class="space-y-4 text-sm">
              <div>
                <h4 :class="['font-semibold text-red-500 mb-2 flex items-center']">
                  <i class="pi pi-times-circle mr-1"></i>
                  Prohibited Items
                </h4>
                <div :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                  Drugs, weapons, money, glass items, chemicals, aerosols, flammables, precious
                  metals
                </div>
              </div>

              <div>
                <h4 :class="['font-semibold text-orange-500 mb-2 flex items-center']">
                  <i class="pi pi-exclamation-triangle mr-1"></i>
                  Restricted Items (Require Approval)
                </h4>
                <div :class="isDark ? 'text-gray-400' : 'text-gray-600'">
                  Perfumes (UK only), liquids, medications, batteries, perishables
                </div>
              </div>

              <div>
                <h4 :class="['font-semibold text-green-500 mb-2 flex items-center']">
                  <i class="pi pi-phone mr-1"></i>
                  Contact Information
                </h4>
                <div :class="['space-y-1', isDark ? 'text-gray-400' : 'text-gray-600']">
                  <div class="flex items-center">
                    <i class="pi pi-phone mr-2 text-green-500"></i>
                    <a
                      href="tel:+260966333222"
                      :class="
                        isDark ? 'text-green-300 hover:underline' : 'text-green-700 hover:underline'
                      "
                      >+260 966 333222</a
                    >
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-envelope mr-2 text-green-500"></i>
                    <a
                      href="mailto:online@oneworld.co.zm"
                      :class="
                        isDark ? 'text-green-300 hover:underline' : 'text-green-700 hover:underline'
                      "
                      >online@oneworld.co.zm</a
                    >
                  </div>
                  <div class="flex items-center">
                    <i class="pi pi-globe mr-2 text-green-500"></i>
                    <a
                      href="https://www.oneworld.co.zm"
                      target="_blank"
                      rel="noopener noreferrer"
                      :class="
                        isDark ? 'text-green-300 hover:underline' : 'text-green-700 hover:underline'
                      "
                      >www.oneworld.co.zm</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>

    <!-- Footer -->
    <div
      :class="[
        'text-center p-4 text-xs border-t mt-8',
        isDark ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200',
      ]"
    >
      <div>Rates effective February 2024 • Subject to change</div>
      <div class="mt-1">
        Unofficial calculator based on data from One World • For reference only
      </div>
      <div class="mt-2">
        <a
          href="https://github.com/engineervix/zed-shipping"
          target="_blank"
          rel="noopener noreferrer"
          :class="[
            'inline-flex items-center transition-colors',
            isDark ? 'text-gray-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-700',
          ]"
        >
          <!-- GitHub SVG Icon -->
          <svg
            class="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
          View on GitHub
        </a>
      </div>
    </div>

    <Toast />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import {
  calculateVolumetricWeight,
  getBillableWeight,
  calculateDomesticCost,
  calculateInternationalCost,
  formatCurrency,
  validatePackage,
  getZoneForLocation,
} from '@/utils/shipping-utils.js'
import { LOCATIONS } from '@/assets/shipping-data.js'

const toast = useToast()

// Dark mode state
const isDark = ref(false)

// Reactive data
const serviceType = ref('domestic')
const weight = ref(1)
const length = ref(null)
const width = ref(null)
const height = ref(null)
const selectedLocation = ref('')
const internationalDestination = ref('lusaka')

// Load dark mode preference on mount
onMounted(() => {
  const saved = localStorage.getItem('darkMode')
  if (saved !== null) {
    isDark.value = JSON.parse(saved)
  } else {
    // Check system preference
    isDark.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyDarkModeToDocument()
})

// Dark mode functions
function toggleDarkMode() {
  isDark.value = !isDark.value
  localStorage.setItem('darkMode', JSON.stringify(isDark.value))
  applyDarkModeToDocument()
}

function applyDarkModeToDocument() {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Computed properties
const locations = computed(() =>
  LOCATIONS.map((location) => ({ label: location, value: location })),
)

const volumetricWeight = computed(() => {
  if (!length.value || !width.value || !height.value) return 0
  return calculateVolumetricWeight(length.value, width.value, height.value)
})

const billableWeight = computed(() => {
  if (!weight.value) return 0
  return getBillableWeight(weight.value, length.value, width.value, height.value)
})

const serviceTypeDisplay = computed(() => {
  return serviceType.value === 'domestic' ? 'Domestic Delivery' : 'International (UK to Zambia)'
})

const calculatedCost = computed(() => {
  if (!weight.value || weight.value <= 0) return null

  const validation = validatePackage(weight.value, length.value, width.value, height.value)
  if (!validation.isValid) {
    return null
  }

  const finalWeight = billableWeight.value

  if (serviceType.value === 'domestic') {
    if (!selectedLocation.value) return null
    return calculateDomesticCost(finalWeight, selectedLocation.value)
  } else {
    const isLusaka = internationalDestination.value === 'lusaka'
    return calculateInternationalCost(finalWeight, isLusaka)
  }
})

// Helper functions
function getLocationZoneDisplay(location) {
  const zone = getZoneForLocation(location)
  return getZoneDisplayName(zone)
}

function getZoneDisplayName(zoneKey) {
  const zoneNames = {
    ZONE_1: 'Zone 1 - Lusaka',
    ZONE_2: 'Zone 2 - Line of Rail',
    ZONE_3: 'Zone 3 - Not Line of Rail',
    ZONE_4: 'Zone 4 - Remote Area',
  }
  return zoneNames[zoneKey] || zoneKey
}

// Watchers for validation
watch(
  [weight, length, width, height],
  () => {
    if (weight.value) {
      const validation = validatePackage(weight.value, length.value, width.value, height.value)
      if (!validation.isValid) {
        validation.errors.forEach((error) => {
          toast.add({
            severity: 'warn',
            summary: 'Validation Error',
            detail: error,
            life: 3000,
          })
        })
      }
    }
  },
  { immediate: false },
)

// Reset location when switching service types
watch(serviceType, () => {
  selectedLocation.value = ''
})
</script>

<style>
/* Global styles - PrimeVue v4 handles most styling internally */
body {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .p-inputnumber-input,
  .p-select {
    font-size: 16px !important; /* Prevents zoom on iOS */
  }
}

/* Custom theme overrides for darker pink branding */
:root {
  --p-primary-color: #be185d; /* Darker pink */
  --p-primary-contrast-color: #ffffff;
}

/* Dark mode styles for input components */
.dark .p-card {
  background: #1f2937;
  border: 1px solid #374151;
}

.dark .p-inputnumber-input,
.dark .p-select,
.dark .p-accordion-header {
  background: #374151 !important;
  border: 1px solid #4b5563 !important;
  color: #e5e7eb !important;
}

.dark .p-inputnumber-input:focus,
.dark .p-select:focus {
  border-color: #be185d !important;
  box-shadow: 0 0 0 1px #be185d !important;
}

.dark .p-accordion-content {
  background: #1f2937 !important;
  color: #e5e7eb !important;
}

.dark .p-radiobutton .p-radiobutton-box {
  background: #374151 !important;
  border: 1px solid #4b5563 !important;
}

.dark .p-radiobutton .p-radiobutton-box.p-checked {
  background: #be185d !important;
  border-color: #be185d !important;
}

.dark .p-tag {
  background: #1e40af !important;
  color: #dbeafe !important;
}

.dark .p-tooltip .p-tooltip-text {
  background: #374151 !important;
  color: #e5e7eb !important;
}
</style>
