import Vue from 'vue'
import api from './api'

import 'carbon-components/css/carbon-components.css'
import App from './App.vue'

let store = {
    state: {
        gapiLoaded: false,
        signedIn: false,
        pickerLoaded: false,
    },
    onGapiLoaded(signedIn) {
        this.state.gapiLoaded = true
        this.state.signedIn = signedIn
    },
    onPickerLoaded() {
        this.state.pickerLoaded = true
    },
}

window.handleClientLoad = function() {
    api.onGapiLoad(
        signedIn => store.onGapiLoaded(signedIn),
        store.onPickerLoaded()
    )
}

new Vue({
    render: h => h(App),
    data: {
        state: store.state,
    },
}).$mount('#app')
