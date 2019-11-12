<template>
    <div class="container">
        {{ api }}
        <cv-button>{{ bundler}}</cv-button>
    </div>
</template>

<script>
import Vue from "vue";
import api from './api'

export default Vue.extend({
  data() {
    return {
      bundler: "Parcel"
    };
  }
});
</script>

<style scoped>
.container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>