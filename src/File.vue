<template>
    <div class="container">
        <div v-if="hasFixedLink">
            <a :href="state.fixedLink">{{ state.fixedLink }}</a>
        </div>
        <div style="width: 100%" v-else>
            <cv-skeleton-text />
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import api from './api'

import { CvSkeletonText } from '@carbon/vue'

export default Vue.extend({
    name: 'File',
    components: {
        CvSkeletonText,
    },
    data: function() {
        return {
            state: {
                fixedLink: undefined,
            },
        }
    },
    computed: {
        hasFixedLink: function() {
            return this.state.fixedLink
        },
    },
    props: ['doc'],
    created: function() {
        api.getFixedLink(this.doc.id, fileId => {
            this.state.fixedLink = `https://drive.google.com/uc?export=download&id=${fileId}`
        })
    },
})
</script>

<style scoped>
.container {
    width: 400px;
    max-width: 100%;
}
</style>
