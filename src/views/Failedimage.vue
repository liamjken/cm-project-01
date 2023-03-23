<template>
<v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-sheet class="">
            <h1>Failed Images</h1>
            <p>This page is {{ $route.params.vehId }}/{{ $route.params.imgName }}</p>
<img :src="`https://cm2p0vehiclemediadev.blob.core.windows.net/vehicle-media/${$route.params.vehId}/${$route.params.imgName}-Resized`" 
:width="800"
@error="store.ImgErCheck"
/>
          </v-sheet>
        </v-col>
        </v-row>
        </v-container>
</template>

<script lang="ts" setup>


  
import { ref, onMounted, computed, onUpdated } from "vue";
import { useAppStore } from '../store/app'


const store = useAppStore()
const failedImages = computed(() => {
  return store.failedImages;
});



onMounted(() => {
  store.fetchFailedImages();
  console.log(store.isImageValid)
})


</script>

<style>

</style>