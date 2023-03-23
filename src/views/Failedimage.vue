<template>
<v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-sheet class="">
            <h1>Failed Images</h1>
            <p>This page is {{ $route.params.vehId }}/{{ $route.params.imgName }}</p>
            <v-img
  :width="800"
  contain
  :src="`https://cm2p0vehiclemediadev.blob.core.windows.net/vehicle-media/${$route.params.vehId}/${$route.params.imgName}-Resized`"
></v-img>
          </v-sheet>
        </v-col>
        </v-row>
        </v-container>
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