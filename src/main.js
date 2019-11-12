import Vue from 'vue'
import 'carbon-components/css/carbon-components.css'
import CarbonComponentsVue from '@carbon/vue'
import App from './App.vue'

Vue.use(CarbonComponentsVue)
new Vue({
    render: createElement => createElement(App),
}).$mount('#app')
