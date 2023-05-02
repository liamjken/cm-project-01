<template>
<v-container class="align-items-center">
    <v-row>
<!-- Small col at the side of the image  -->
<v-col cols="12" sm="1"></v-col>
      <v-col cols="12" sm="10">
<!-- Button returns to previous page  -->
        <v-btn 
        @click="$router.go(-1)"
        class="mt-3 mb-3 float-left"
        prepend-icon="mdi-arrow-left"
        color="primary">Back
        </v-btn>
<!-- Looping through array   -->
          <div v-for="img in failedImages" :key="img.name">
            <!-- Finding image within array and checking status   -->
            <div v-if="img.name === $route.params.imgName && img.status === 'Editing'">
            <!-- Updating the Status & goes back to previous page    -->  
              <v-btn 
              @click.once="PostEditImg(img.vehicleId, img.name, 1), $router.go(-1)"
              class="mt-3 mb-3 float-right"
              prepend-icon=""
              color="primary">
              Completed
             </v-btn>
            </div>
          </div>

      </v-col>
<!-- Small col at the side of the image  -->
<v-col cols="12" sm="1"></v-col>
   </v-row>


<v-row no-gutters>
<!-- Small col at the side of the image  -->
<v-col cols="12" sm="1"></v-col>
   <!-- Display the Image  -->
    <v-col cols="12" sm="10">
<!-- Grabs the two Route Param values and dispays an image URL -->
         <img 
         :src="`https://cm2p0vehiclemediadev.blob.core.windows.net/vehicle-media/${$route.params.vehId}/${$route.params.imgName}-Resized`" 
         @error="ImgErCheck"
         v-if="isImageValid === true"
         />
        <h1 v-if="isImageValid === false">Page Not Found</h1>
    </v-col>
<!-- Small col at the side of the image  -->
<v-col cols="12" sm="1"></v-col>
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