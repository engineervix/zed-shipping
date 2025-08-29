import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import './style.css'

// PrimeVue components
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Tag from 'primevue/tag'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import RadioButton from 'primevue/radiobutton'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import Tooltip from 'primevue/tooltip'

// Import PrimeIcons
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
})

app.use(ToastService)

// Register components globally
app.component('InputNumber', InputNumber)
app.component('Select', Select)
app.component('Card', Card)
app.component('Button', Button)
app.component('Divider', Divider)
app.component('Tag', Tag)
app.component('Toast', Toast)
app.component('RadioButton', RadioButton)
app.component('Accordion', Accordion)
app.component('AccordionPanel', AccordionPanel)
app.component('AccordionHeader', AccordionHeader)
app.component('AccordionContent', AccordionContent)

// Register directives
app.directive('tooltip', Tooltip)

app.mount('#app')
