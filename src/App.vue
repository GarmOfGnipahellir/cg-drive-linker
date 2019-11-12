<template>
    <div class="container">
        <div v-if="state.gapiLoaded">
            <cv-button :icon="ChevronRight16">
                Get 'em links
            </cv-button>
        </div>
        <div v-else>
            <cv-loading />
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

import { CvButton, CvLoading } from '@carbon/vue'

import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16'

export default Vue.extend({
    name: 'App',
    components: {
        CvButton,
        CvLoading,
    },
    data() {
        return {
            ChevronRight16,
            state: this.$root.$data.state,
        }
    }
})
</script>

<style scoped>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
