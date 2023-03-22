<template>
    <div>
<h1>Failed Images</h1>
{{ singleFailedImg }}
    </div>
</template>

<script lang="ts" setup>
  
import { ref, onMounted, computed } from "vue";
import { useAppStore } from '../store/app'


const store = useAppStore()
const failedImages = computed(() => {
  return store.failedImages;
});

const singleFailedImg = computed(() => {
  return store.singleFailedImg;
});


onMounted(() => {
  store.fetchFailedImages();
  store.fetchSingleFailedImages();
})


</script>

<style>

</style>