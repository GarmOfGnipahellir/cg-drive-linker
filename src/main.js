import Vue from 'vue'
import api from './api'

import 'carbon-components/css/carbon-components.css'
import App from './App.vue'

let store = {
    state: {
        gapiLoaded: false,
    },
    onGapiLoaded() {
        this.state.gapiLoaded = true
    },
}

window.handleClientLoad = function() {
    store.onGapiLoaded()
}

let vm = new Vue({
    render: h => h(App),
    data: {
        state: store.state,
    },
}).$mount('#app')
