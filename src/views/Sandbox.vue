<template>    
  <v-container>
   <v-main>
    <v-card class="px-5 py-5">
      <h1>Fake Mileage Calculator</h1>
      <v-btn class="mt-2 mx-3"  @click="mileageCalc(quebec, ontario, 1)">2022</v-btn>
      <v-btn class="mt-2 mx-3" @click="mileageCalc(quebec, ontario, 2)" >2021</v-btn>
      <v-btn class="mt-2 mx-3"  @click="mileageCalc(quebec, ontario, 3)" >2020</v-btn>
      <v-btn class="mt-2 mx-3"  @click="mileageCalc(quebec, ontario, 4)" >2019</v-btn>
      <v-btn class="mt-2 mx-3" @click="mileageCalc(quebec, ontario, 5)" >2018</v-btn>
      <v-btn class="mt-2 mx-3" @click="mileageCalc(quebec, ontario, 7)" >2015</v-btn>
    </v-card>
    <v-card class="px-5 py-5">
   <h2>Random mileage - {{ result }}</h2>
   </v-card>
   <v-card class="px-4 py-4">
    <v-text-field
      variant="outlined"
      v-model="domain"
      label="Website"
      type="text"></v-text-field>

      <v-btn
      flat
      color="primary"
      size="large"
      block
      @click="runIframe()"
      >Submit</v-btn>
   </v-card>
   <div>
    {{ showIframe }}
    <iframe
    v-if="showIframe == true"
    :src="iframeSrc"
    width="100%"
    height="1024px" >
  </iframe>
   </div>
  </v-main>
  </v-container>
  
  
  </template>

<script lang="ts">
import { defineComponent, computed } from "vue"

export default defineComponent({

  data: () => ({ 
      quebec: 14300,
      ontario: 16000,
      twentyTwo: 2022,
      result: 0,
      domain: '',
      showIframe: false

   }),


  methods: {

    mileageCalc(quebec:number, ontario:number, noOfYears:number) {
        this.result = Math.floor(quebec + Math.random()*(ontario - quebec + 1))* noOfYears
    },

    runIframe(){
     this.showIframe = !this.showIframe
    }
    
    


  },
  computed: {
    iframeSrc() {
      if (this.domain) {
        return `https://${this.domain}`
      } else {
        return ''
      }
    }
  }
})
</script>

<style scoped>


</style>