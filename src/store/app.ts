// Utilities
import { defineStore } from 'pinia'
import axios from 'axios'
import Vue from 'vue'

let apiUrl = 'https://qualitycontrol-service.dev.carpix2p0.net/api/1.0'

export const useAppStore = defineStore('app', {
  state: () => ({

    failedImages: [],
    isImageValid: true,

  }),
  getters: {
    getfailedImages(state){
        return state.failedImages
      }
  },

  actions: {
    // Getting the API data
      async fetchFailedImages() {
        try {
          const data = await axios.get(`${apiUrl}/failed-images`)
            this.failedImages = data.data.results.items
          }
          catch (error) {
            alert(error)
            console.log(error)
        }
      },
      // This function is via @error request in Failedimage.vue works but not exactly how I expected.
      ImgErCheck() {
        this.isImageValid = false
        return this.isImageValid
      },

    },

    
    

    //
  })