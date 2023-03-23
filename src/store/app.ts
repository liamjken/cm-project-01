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
      ImgErCheck() {
        this.isImageValid = false
        return this.isImageValid
      },

    },

    
    

    //
  })