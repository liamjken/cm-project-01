<template>
<v-container class="align-items-center">
      <v-row no-gutters>
        <v-col cols="12">

            <v-btn @click="$router.go(-1)"
    class="mt-3 mb-3"
    prepend-icon="mdi-arrow-left"
    color="primary">Back</v-btn>
 <div><img 
    :src="`https://cm2p0vehiclemediadev.blob.core.windows.net/vehicle-media/${$route.params.vehId}/${$route.params.imgName}-Resized`" 
@error="store.ImgErCheck"
v-if="store.isImageValid === true"
/></div>
<h1 v-if="store.isImageValid === false"> 404 Page Not Found</h1>

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
})


</script>

<style scoped>

img {
    max-width: 900px;
    object-fit: cover;
}

</style>