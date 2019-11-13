<template>
    <div class="container">
        <cv-tile>
            <div v-if="state.gapiLoaded">
                <div v-if="state.signedIn">
                    <div v-if="state.pickerLoaded">
                        <div v-if="hasPicked" id="links">
                            <File
                                v-for="doc in picked.files"
                                :key="doc.key"
                                :doc="doc"
                            />
                        </div>
                        <div class="buttons">
                            <cv-icon-button
                                v-if="hasPicked"
                                v-on:click="copyLinks"
                                :icon="Copy16"
                            ></cv-icon-button>
                            <cv-button v-on:click="createPicker" :icon="Link16">
                                Get 'em links
                            </cv-button>
                            <cv-button
                                v-on:click="signOut"
                                :icon="ChevronLeft16"
                            >
                                Sign out
                            </cv-button>
                        </div>
                    </div>
                    <div v-else>
                        <cv-loading />
                    </div>
                </div>
                <div v-else>
                    <cv-button v-on:click="signIn" :icon="ChevronRight16">
                        Sign in
                    </cv-button>
                </div>
            </div>
            <div v-else>
                <cv-loading />
            </div>
        </cv-tile>
    </div>
</template>

<script>
import Vue from 'vue'
import copy from 'copy-to-clipboard'
import File from './File.vue'
import api from './api'

import { CvButton, CvIconButton, CvLoading, CvTile } from '@carbon/vue'

import ChevronRight16 from '@carbon/icons-vue/es/chevron--right/16'
import ChevronLeft16 from '@carbon/icons-vue/es/chevron--left/16'
import Link16 from '@carbon/icons-vue/es/link/16'
import Copy16 from '@carbon/icons-vue/es/copy/16'

export default Vue.extend({
    name: 'App',
    components: {
        CvButton,
        CvIconButton,
        CvLoading,
        CvTile,
        File,
    },
    data: function() {
        return {
            ChevronRight16,
            ChevronLeft16,
            Link16,
            Copy16,
            state: this.$root.$data.state,
            picked: {
                files: undefined,
            },
        }
    },
    computed: {
        hasPicked: function() {
            return !!this.picked.files
        },
    },
    methods: {
        signIn: function() {
            api.signIn()
        },

        signOut: function() {
            api.signOut()
        },

        createPicker: function() {
            api.createPicker(data => {
                if (data.action === 'picked') {
                    this.picked.files = data.docs.map((doc, i) => {
                        return { ...doc, key: i }
                    })
                }
            })
        },

        copyLinks: function() {
            copy(document.getElementById('links').innerText)
        },
    },
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

.buttons {
    margin: 16px;
    width: 400px;
    max-width: 100%;

    display: flex;
    justify-content: space-between;
}
</style>
