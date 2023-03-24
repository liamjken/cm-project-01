<template>
<v-container class="align-items-center">
    <v-row>
        <v-col
              cols="12"
              sm="1"
            >
            </v-col>
        <v-col cols="12"
        sm="10">
        <v-btn 
                @click="$router.go(-1)"
                class="mt-3 mb-3"
                prepend-icon="mdi-arrow-left"
                color="primary">Back
            </v-btn>
        </v-col>
        <v-col
              cols="12"
              sm="1"
            >
            </v-col>
    </v-row>
    <v-row no-gutters>
        <v-col
              cols="12"
              sm="1"
            >
            </v-col>
        <v-col cols="12"
        sm="10">


            <!-- Image displayed from Two route Params values. 
                 If image src is not found it runs ImgErCheck
                function which updates isImageValid value.
            This works for what I want it to do but 
            has contradictory true & false v-ifs
            
            -->
                    <img 
                    :src="`https://cm2p0vehiclemediadev.blob.core.windows.net/vehicle-media/${$route.params.vehId}/${$route.params.imgName}-Resized`" 
                    @error="store.ImgErCheck"
                    v-if="store.isImageValid === true"
                    />
                    <h1 v-if="store.isImageValid === false"> 404 Page Not Found</h1>

        </v-col>
        <v-col
              cols="12"
              sm="1"
            >
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