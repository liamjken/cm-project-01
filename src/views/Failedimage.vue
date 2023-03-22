<template>
    <div>
<h1>Failed Images</h1>
{{ failedImages[0] }}
    </div>
</template>

<script lang="ts" setup>
  
import { ref, onMounted, computed } from "vue";
import { useAppStore } from '../store/app'


const store = useAppStore()
const failedImages = computed(() => {
  return store.failedImages;
});



onMounted(() => {
  store.fetchFailedImages();
})


</script>

<style>

</style>