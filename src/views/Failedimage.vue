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
                class="mt-3 mb-3 float-left"
                prepend-icon="mdi-arrow-left"
                color="primary">Back
            </v-btn>

            <div v-for="img in failedImages" :key="img.name">
                <div v-if="img.name === $route.params.imgName && img.status === 'Editing'">
                    <v-btn 
                @click.once="PostEditImg(img.vehicleId, img.name, 5), $router.push('/')"
                class="mt-3 mb-3 float-right"
                prepend-icon=""
                color="primary">Completed
            </v-btn>

                </div>
            </div>

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
                    @error="ImgErCheck"
                    v-if="isImageValid === true"
                    />
                    <h1 v-if="isImageValid === false">Page Not Found</h1>

        </v-col>
        <v-col
              cols="12"
              sm="1"
            >
            </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue'
import { useAppStore } from '../store/app'




export default defineComponent({

  data: () => ({}),
  created() {
    this.fetchFailedImages();
  },
  mounted() {
  },
  computed: {
   ...mapState(useAppStore, 
   ['failedImages', 'completed', 'isImageValid'])
  },
  methods: {
    ...mapActions(useAppStore,[
    'fetchFailedImages',
    'PostEditImg',
    'ImgErCheck'
    ]),

    
  }




})
</script>

<style scoped>

img {
    max-width: 900px;
    object-fit: cover;
}

</style>